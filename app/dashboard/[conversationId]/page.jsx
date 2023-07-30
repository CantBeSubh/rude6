"use client";

import { Amplify, Auth } from 'aws-amplify';
import awsExports from '@/src/aws-exports';
import { useEffect, useState } from 'react';
import Aside from '@/components/aside';
import Chat from '@/components/chat';

import { getConversation } from '@/src/graphql/queries'
import { API } from 'aws-amplify';

import { GRAPHQL_AUTH_MODE } from '@aws-amplify/api';

Amplify.configure({ ...awsExports, ssr: true });



export default function ConversationPage({ params }) {

    const [loading, setLoading] = useState(true)
    const [initialMessages, setInitialMessages] = useState([]);

    useEffect(() => {
        const checkUser = async () => {
            try {
                await Auth.currentAuthenticatedUser()
                setLoading(false)
            } catch (err) {
                console.log(err)
                window.location.href = "/sign-in"
            }
        }

        const getConvo = async () => {
            try {

                const { data } = await API.graphql({
                    query: getConversation,
                    variables: { id: params.conversationId },
                    authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
                });
                // console.log(data)
                setInitialMessages(JSON.parse(data.getConversation.messages))
            } catch (err) {
                console.log(err)
            } finally {
                setLoading(false)
            }
        }

        checkUser()
        getConvo()
    }, [])

    if (loading) return <div>Loading...</div>
    return (
        <div className='flex bg-gray-800'>
            <Aside />
            <Chat id={params.conversationId} initialMessages={initialMessages} />
        </div>
    )

}

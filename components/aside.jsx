'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

import { Amplify, Auth } from 'aws-amplify';
import awsExports from '@/src/aws-exports';
import { listConversations } from '@/src/graphql/queries'
import { deleteConversation } from '@/src/graphql/mutations'
import { GRAPHQL_AUTH_MODE } from '@aws-amplify/api';
import { API } from 'aws-amplify';
import { Trash } from "lucide-react";
Amplify.configure({ ...awsExports, ssr: true });


export default function Aside() {
    const pathname = usePathname();
    const [conversations, setConversations] = useState([]);

    const getConversations = async () => {
        const { data } = await API.graphql({
            query: listConversations,
            authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
        });
        // console.log(data)
        setConversations(data.listConversations.items)
    }

    useEffect(() => {
        getConversations();
    }, [])
    return (
        <aside className="fixed left-0 flex flex-col justify-between w-1/5 h-screen bg-gray-100">
            <div>

                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    <Link href="/dashboard">
                        <h1 className="text-xl font-bold">Conversations</h1>
                    </Link>
                </div>
                <div className="flex-col p-4 space-y-2 overflow-y-auto felx">
                    {conversations && conversations.map((conversation) => (
                        <div className="flex justify-between">
                            <Link
                                key={conversation.id}
                                href={`/dashboard/${conversation.id}`}
                                className="flex-1 block p-2 mr-4 text-gray-700 rounded hover:bg-gray-200"
                                style={pathname === `/dashboard/${conversation.id}` ? { backgroundColor: "#e2e8f0" } : {}}
                            >
                                {conversation.name}
                            </Link>
                            <Button
                                variant="secondary"
                                className="p-2 text-gray-700 transition-all rounded opacity-10 hover:opacity-100 hover:bg-gray-200"
                                onClick={async () => {
                                    await API.graphql({
                                        query: deleteConversation,
                                        variables: { input: { id: conversation.id } },
                                        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
                                    })
                                    getConversations();
                                }}
                            >
                                <Trash className="w-4 h-4" />
                            </Button>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex items-center justify-between p-4 border-t border-gray-200">
                <div className="flex flex-col w-full space-y-4 ">
                    <Button
                        onClick={async () => {
                            try {
                                await Auth.signOut();
                                window.location.href = '/sign-in';
                            } catch (err) {
                                console.log(err);
                            }
                        }}
                    > Sign Out</Button>
                </div>
            </div>
        </aside >
    )
}

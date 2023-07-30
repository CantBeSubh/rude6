'use client'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"


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
        <aside className="sticky top-0 left-0 flex flex-col justify-between w-1/5 h-screen col-span-4 text-white bg-gray-900">
            <div>

                <div className="flex items-center justify-between p-4 border-b border-gray-200/20">
                    <Link href="/dashboard">
                        <h1 className="text-xl font-bold">DASDBOARD</h1>
                    </Link>
                </div>
                <div className="flex-col p-4 space-y-2 overflow-y-auto felx">
                    {conversations && conversations.map((conversation) => (
                        <div className="flex justify-between">
                            <Link
                                key={conversation.id}
                                href={`/dashboard/${conversation.id}`}
                                className="flex-1 block p-2 mr-4 rounded hover:bg-gray-200/20 line-clamp-1"
                                style={pathname === `/dashboard/${conversation.id}` ? { backgroundColor: "#e2e8f020" } : {}}
                            >
                                {conversation.name}
                            </Link>
                            {
                                pathname == `/dashboard/${conversation.id}` && (
                                    <>
                                        <Dialog>
                                            <DialogTrigger
                                                className="p-2 text-gray-700 transition-all rounded hover:bg-gray-200"
                                            >
                                                <Trash className="w-4 h-4" />
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>Are you sure absolutely sure?</DialogTitle>
                                                    <DialogDescription >
                                                        This action cannot be undone. This will permanently delete your account
                                                        and remove your data from our servers.
                                                    </DialogDescription>
                                                    <div className="flex justify-end space-x-4">
                                                        {/* <Button
                                                            variant="outline"
                                                            className="p-4 text-gray-700 transition-all rounded "
                                                            onClick={() => { }}
                                                        >
                                                            Cancel
                                                        </Button> */}
                                                        <Button
                                                            variant="destructive"
                                                            className="p-4 transition-all rounded"
                                                            onClick={async () => {
                                                                await API.graphql({
                                                                    query: deleteConversation,
                                                                    variables: { input: { id: conversation.id } },
                                                                    authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
                                                                })
                                                                window.location.href = '/dashboard';
                                                                getConversations();
                                                            }}
                                                        >
                                                            Delete
                                                        </Button>
                                                    </div>

                                                </DialogHeader>
                                            </DialogContent>
                                        </Dialog>


                                    </>
                                )
                            }

                        </div>
                    ))}
                </div>
            </div>

            <div className="flex items-center justify-between p-4 border-t border-gray-200/20">
                <div className="flex flex-col w-full space-y-4 ">
                    <Button
                        variant="outline"
                        className="text-black"
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

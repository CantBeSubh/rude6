'use client'
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import Link from "next/link";
import { Auth } from 'aws-amplify'
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Amplify } from 'aws-amplify';
import awsExports from '@/src/aws-exports';
import { useEffect } from "react";


Amplify.configure({ ...awsExports, ssr: true });

const formSchema = z.object({
    email: z.string().email({ message: "Invalid Email" }).nonempty({ message: "E-Mail is required" }),
    code: z.string().nonempty({ message: "Code is required" }).length(6, { message: "Code should be 6 charecters" }),
})


const ConfirmForm = () => {
    useEffect(() => {
        const checkUser = async () => {
            try {
                await Auth.currentAuthenticatedUser()
                window.location.href = "/dashboard"

            } catch (err) {
                console.log(err)
            }
        }
        checkUser()
    }, [])
    const form = useForm({ resolver: zodResolver(formSchema) })

    const onConfirm = async (values) => {
        const { email, code } = values

        try {
            await Auth.confirmSignUp(email, code);
            toast.success('User Confirmed! Please sign in')
            window.location.href = '/sign-in'
        } catch (error) {
            toast.error("There was an error confirming the user: " + error.message);
        }
    }

    const resendCode = async (email) => {
        try {
            await Auth.resendSignUp(email)
            toast.success('Code Resent')
        } catch (err) {
            toast.error('Error resending code: ' + err.message)
        }
    }

    return (
        <Form {...form} >
            <form onSubmit={form.handleSubmit(onConfirm)} className="flex flex-col">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem className="mb-8">
                            <FormLabel className="text-white">EMAIL</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="your@email.com"
                                    type="email"
                                    autoComplete="email"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="code"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-white">PASSWORD</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="000 000"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="m-2 text-xs text-white" >
                    <span
                        className="underline cursor-pointer"
                        onClick={() => resendCode(form.getValues().email)}
                    >
                        Resend Code
                    </span>
                    {" "}OR{" "}
                    <Link href="/sign-in" className="underline cursor-pointer">
                        Sign In
                    </Link>
                </div>
                <Button type="submit" className="mx-auto" variant="secondary">Submit</Button>
            </form>
        </Form>

    )
}

const ConfirmPage = () => {
    return (
        <div className="flex items-center justify-center h-screen"
            style={{
                backgroundImage: "url('https://picsum.photos/id/98/1920/1080/')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >
            <div className=" w-[450px] bg-gray-100/10 p-4 rounded-xl border-2 border-white"
                style={{
                    backdropFilter: "blur(10px)",
                    boxShadow: "0 0 100px 10px rgba(255, 255, 255, 0.5) ",
                }}
            >
                <ConfirmForm />
            </div>
        </div>
    );
}

export default ConfirmPage;
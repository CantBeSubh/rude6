'use client'
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";

import { Auth, DataStore } from 'aws-amplify'
import { toast } from "react-hot-toast";
import Link from "next/link";
import { Amplify } from 'aws-amplify';
import awsExports from '@/src/aws-exports';

Amplify.configure({ ...awsExports, ssr: true });


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

const formSchema = z.object({
    email: z.string().email({ message: "Invalid Email" }).nonempty({ message: "E-Mail is required" }),
    password: z.string().nonempty({ message: "Password is required" }).min(8, { message: "Password should be minimum 8 charecters" }),
});


const SignInForm = () => {
    const form = useForm({ resolver: zodResolver(formSchema) })

    const onSubmit = async (values) => {
        const { email, password } = values
        try {
            const { user } = await Auth.signIn({
                'username': email,
                password,
            });
            toast.success(`Welcome!`)
            window.location.href = "/dashboard"
        }
        catch (err) {
            toast.error("There was an error signing in: " + err.message)
            if (err.name === "UserNotConfirmedException") {
                window.location.href = "/confirm"
            }
        }
    }

    return (
        <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem className="mb-8">
                            <FormLabel className="text-gray-400">EMAIL</FormLabel>
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
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-gray-400">PASSWORD</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="*********"
                                    type="password"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="m-2 text-xs text-white"> or <Link href="/sign-up" className="underline">Create a new Account</Link></div>
                <Button type="submit" className="mx-auto" variant="secondary">Submit</Button>
            </form>
        </Form>
    )
}


const SignInPage = () => {
    return (
        <div className="flex items-center justify-center h-screen"
            style={{
                backgroundImage: "url('https://picsum.photos/id/83/1920/1080/')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >
            <div className=" w-[350px] bg-gray-100/10 p-4 rounded-xl border-2 border-white"
                style={{
                    backdropFilter: "blur(10px)",
                    boxShadow: "0 0 100px 10px rgba(0,0,0, 0.2) ",
                }}
            >
                <SignInForm />
            </div>
        </div>
    );
}

export default SignInPage;
'use client'
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import Link from "next/link";
import { Auth } from 'aws-amplify'
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

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


Amplify.configure({ ...awsExports, ssr: true });

const formSchema = z
    .object({
        password: z.string().nonempty({ message: "Password is required" }).min(8, { message: "Password should be minimum 8 charecters" }),
        email: z.string().email({ message: "Invalid Email" }).nonempty({ message: "E-Mail is required" }),
        repeatPassword: z.string().optional()

    })
    .refine(data => data.password === data.repeatPassword, {
        message: "Passwords don't match",
        path: ["repeatPassword"],
    });


const SignUpForm = () => {

    const form = useForm({
        resolver: zodResolver(formSchema),
    })

    const onSubmit = async (values) => {
        delete values.repeatPassword
        const { password, email } = values
        try {
            const { user } = await Auth.signUp({
                'username': email,
                password,
            });
            toast.success('User Created! Please confirm your email')
            window.location.href = "/confirm"
        }
        catch (err) {
            toast.error("There was an error creating the user: " + err.message);
            if (err.name === "UsernameExistsException") {
                window.location.href = "/sign-in"
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
                        <FormItem className="mb-4">
                            <FormLabel className="text-gray-800">EMAIL</FormLabel>
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
                        <FormItem className="mb-4">
                            <FormLabel className="text-gray-800">PASSWORD</FormLabel>
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
                <FormField
                    control={form.control}
                    name="repeatPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-gray-800">REPEAT PASSWORD</FormLabel>
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
                <div className="m-2 text-xs text-gray-800">
                    Alrady have an account? <Link href="/sign-in" className="underline">Sign In</Link>
                </div>

                <Button type="submit" className="mx-auto">SIGN UP</Button>
            </form>
        </Form>
    )
}


const SignUpPage = () => {
    return (
        <div className="flex items-center justify-center h-screen"
            style={{
                backgroundImage: "url('https://picsum.photos/id/100/1920/1080/')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >
            <div className="w-[450px] bg-gray-100/10 p-4 rounded-xl border-2 border-white"
                style={{
                    backdropFilter: "blur(10px)",
                    boxShadow: "0 0 100px 10px rgba(255, 255, 255, 0.5) ",
                }}
            >
                <SignUpForm />
            </div>
        </div>
    );
}

export default SignUpPage;
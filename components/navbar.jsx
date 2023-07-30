import Link from "next/link";
import MainNav from "./main-nav";
import { Button } from "./ui/button";
import { ArrowUpRight } from "lucide-react";

export default function Navbar() {
    return (
        <div className="border-b border-gray-400/20">
            <div className="mx-auto max-w-8xl">
                <div className="relative flex items-center h-16 px-4 sm:px-6 lg:px-8">
                    <Link href="/" className="flex ml-4 mr-6 lg:ml-0 gap-x-2">
                        <p className="text-4xl font-bold text-white">RUDE<span className="text-pink-500">GPT</span></p>
                    </Link>
                    <div className="flex items-center ml-auto space-x-4">
                        <Link href="/sign-in" className="flex justify-between px-2 text-pink-500 hover:underline underline-offset-2" >
                            LOGIN <ArrowUpRight size={16} className="inline-block ml-1" />
                        </Link>
                        <Link href="/sign-up"
                            className="flex justify-between px-2 py-1 text-pink-500 border-2 border-pink-500 rounded-sm hover:bg-pink-500 hover:text-black" >
                            SIGN UP <ArrowUpRight size={16} className="inline-block ml-1" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

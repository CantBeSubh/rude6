"use client";
import { Amplify } from "aws-amplify";
import awsExports from "../src/aws-exports";
import Image from "next/image";
import Navbar from "@/components/navbar";

Amplify.configure({ ...awsExports, ssr: true });
export default function Home() {
  return (
    <div
      style={{
        background: "rgb(20 83 45)",
      }}
    >
      <Navbar />
      <div className="flex justify-between w-full h-screen py-8 ">
        <div
          className="flex flex-col items-center justify-between w-1/2 p-16 "
        >
          <span
            className="font-bold text-center text-white text-8xl"
            style={{
              background: "-webkit-linear-gradient(#FFA69E , #A83879)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            USE CHATGPT FOR FREE
            <sup
              style={{
                background: "#ff0000",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >*</sup>


          </span>
          <span className="text-sm text-gray-500">
            <sup
              style={{
                background: "#ff0000",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >*</sup>
            Don't overuse him, he might get angry

          </span>

        </div>
        <div className="flex items-center justify-center w-1/2 ">
          <Image
            src="/chatgpt.webp"
            alt="Next.js Logo"
            objectFit="contain"
            width={650}
            height={650}
          />
        </div>
      </div>
      <footer>
        <div className="flex items-center justify-center w-full h-16 text-white border-t-2 border-gray-400/20">
          <span className="text-sm ">
            Made with ❤️ by{" "}
            <a
              href="https://github.com/CantBeSubh"
              className="font-bold text-blue-500"
              target="_blank"
              rel="noopener noreferrer"
            >
              @CantBeSubh
            </a>
          </span>
        </div>
      </footer>
    </div>

  )
}

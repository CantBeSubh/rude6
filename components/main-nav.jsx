"use client"

import Link from "next/link"

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { ArrowUpRight } from "lucide-react"


const NavMenuItem = ({ route }) => {
    return (<NavigationMenuItem>
        <NavigationMenuTrigger>
            <a href={route.href} className={route.active ? "text-black dark:text-white border-b" : "text-gray-500 border-b border-transparent"}>
                {route.label}
            </a>
        </NavigationMenuTrigger>
        <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                    <NavigationMenuLink asChild>
                        <a
                            className="flex flex-col items-center justify-end w-full h-full p-6 no-underline rounded-md outline-none select-none bg-gradient-to-b from-muted/50 to-muted focus:shadow-md"
                            href={route.href}
                            style={{
                                backgroundImage: `url(${route.billboard?.imageUrl})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                            }}
                        >
                            <div
                                className="mt-4 mb-2 text-xl font-bold"
                                style={{
                                    // backgroundColor: avgColor,
                                    backgroundImage: `linear-gradient(45deg,white,white )`,
                                    // backdropFilter: "blur(2px)",
                                    backgroundSize: "100%",
                                    WebkitBackgroundClip: "text",
                                    MozBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    WebkitTextStrokeWidth: "0.5px",
                                    WebkitTextStrokeColor: "black",
                                }}
                            >
                                {route.label.toUpperCase()}
                            </div>
                        </a>
                    </NavigationMenuLink>
                </li>
                {
                    route.sizes.map((size) => (
                        <ListItem href={`${route.href}?sizeId=${size.id}`} title={size.name} key={size.id}>
                            <TooltipProvider delayDuration={0.5} disableHoverableContent>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <div className="text-left line-clamp-2">
                                            {decription[size.name] || size.name}
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <div className="flex flex-col items-center justify-center">
                                            <div className="text-sm font-medium leading-none">{size.name}</div>
                                            <div className="max-w-sm">{decription[size.name] || size.name}</div>
                                        </div>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </ListItem>
                    ))
                }
            </ul>
        </NavigationMenuContent>
    </NavigationMenuItem>
    )
}

const MainNav = () => {
    return (
        <NavigationMenu className="hidden lg:block">
            <NavigationMenuList>
                <NavigationMenuItem>
                    <Link href="https://overwatch.blizzard.com/" legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            Play Overwatch 2 <ArrowUpRight size={16} className="inline-block ml-1" />
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}



export default MainNav;
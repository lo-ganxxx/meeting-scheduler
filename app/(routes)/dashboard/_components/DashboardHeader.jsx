"use client"
import { LogoutLink, useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  

function DashboardHeader() {
    const {user}=useKindeBrowserClient();

  return user&&( //only if user set (logged in)
    <div className='p-4 px-10'>
        <div>
            {/* shadcn.ui dropdown menu component */}
            <DropdownMenu>
                <DropdownMenuTrigger className='flex items-center float-right'>
                <Image src={user?.picture} className='rounded-full' alt='user picture'
                width={40}
                height={40}
                />
                <ChevronDown/>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuItem>
                        <LogoutLink>Logout</LogoutLink>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

        </div>
    </div>
  )
}

export default DashboardHeader
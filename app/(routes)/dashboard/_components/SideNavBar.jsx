"use client" //as using useState
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Briefcase, Calendar, Clock, Plus, Settings } from 'lucide-react' //icon library
import Link from 'next/link'
import { usePathname } from 'next/navigation'

function SideNavBar() {
    const menu=[
        {
        id:1,
        name:'Meeting Type',
        path:'/dashboard/meeting-type',
        icon:Briefcase
        },
        {
        id:2,
        name:'Scheduled Meeting',
        path:'/dashboard/scheduled-meeting',
        icon:Calendar
        },
        {
        id:3,
        name:'Availability',
        path:'/dashboard/availability',
        icon:Clock
        },
        {
        id:4,
        name:'Settings',
        path:'/dashboard/settings',
        icon:Settings
        }
    ]

    const path=usePathname() //gives the path after the default domain e.g. /dashboard/meeting-type
    const [activePath, setActivePath]=useState(path)

    useEffect(()=>{
        path&&setActivePath(path) //update when the path is changed
    }, [path])
  return (
    <div className='p-5 py-14'>
        <div className='flex justify-center'>
            <Image src='/logo.svg' width={150} height={150} alt='logo' />
         </div>

        <Button className="flex gap-2 w-full rounded-full 
        mt-7 rounded-7"><Plus />Create</Button>
        
        <div className='mt-5 flex flex-col gap-5'>
            {menu.map((item,index)=>( //map out each item in the menu list
                <Link href={item.path} key={index}> {/* button is wrapped in a link to its corresponding page */}
                    <Button
                    variant="ghost"
                    className={`w-full flex gap-2 justify-start
                    hover:bg-blue-100
                    ${activePath==item.path&&'text-primary bg-blue-100'}
                    `}> {/* template literal (template strings) - if the active path is the same as the path of this button, change its visuals */}
                    <item.icon/> {item.name}
                    </Button>
                </Link>
            ))}
        </div>
    </div>
  )
}

export default SideNavBar
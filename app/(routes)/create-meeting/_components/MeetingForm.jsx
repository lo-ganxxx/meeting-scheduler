"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ChevronLeft } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import LocationOption from '@/app/_utils/LocationOption'
import Image from 'next/image'
import Link from 'next/link'
import ThemeOptions from '@/app/_utils/ThemeOptions'
  

function MeetingForm({setFormValue}) { //passes form value back to parent component (page.jsx)

    const [themeColour, setThemeColour]=useState()
    const [eventName, setEventName]=useState()
    const [duration, setDuration]=useState(30)
    const [locationType, setLocationType]=useState()
    const [locationUrl, setLocationUrl]=useState()

    useEffect(()=>{
        setFormValue({ //calls the parent components passed down function of "setFormValue" with the form values as the argument
            eventName:eventName,
            duration:duration,
            locationType:locationType,
            locationUrl:locationUrl,
            themeColour:themeColour
        })
    }, [eventName, duration, locationType, locationUrl, themeColour])

  return (
    <div className='p-8'>
        <Link href={'/dashboard'}>
            <h2 className='flex gap-2'><ChevronLeft/>Cancel</h2>
        </Link>
        <div className='mt-4'>
            <h2 className='font-bold text-2xl my-4'>Create New Event</h2>
            <hr></hr>
        </div>
        <div className='flex flex-col gap-3 my-4'>
            <h2 className='font-bold'>Event Name*</h2>
            <Input placeholder="The name of your meeting"
            onChange={(event)=>setEventName(event.target.value)} //when event name input is changed update the event name state -> note: onChange is similar to onClick but for input fields
            />

            <h2 className='font-bold'>Duration*</h2>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant='outline' className='mx-w-40'>{duration} Min</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem onClick={()=>setDuration(15)}>15 Min</DropdownMenuItem>
                    <DropdownMenuItem onClick={()=>setDuration(30)}>30 Min</DropdownMenuItem>
                    <DropdownMenuItem onClick={()=>setDuration(45)}>45 Min</DropdownMenuItem>
                    <DropdownMenuItem onClick={()=>setDuration(60)}>60 Min</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <h2 className='font-bold'>Location*</h2>
            <div className='grid grid-cols-4 gap-3'>
                {LocationOption.map((option, index)=>( //map out and render in chosen manner each option from the imported LocationOption list
                    <div key={index} className={`border flex flex-col justify-center
                    items-center p-3 rounded-lg cursor-pointer
                    hover:bg-blue-50 hover:border-primary
                    ${locationType==option.name&&'bg-blue-100 border-primary'}`} //render this way if current location selected is this components location
                    onClick={()=>setLocationType(option.name)}>
                        <Image src={option.icon} width={30} height={30} alt={option.name}/>
                        <h2>{option.name}</h2>
                    </div>
                ))}
            </div>
            {/* Only display Add Url input if a location of meeting is set */}
            {locationType&&<>
                <h2 className='font-bold'>Add {locationType} Url*</h2>
                <Input placeholder="The link to your meeting"
                onChange={(event)=>setLocationUrl(event.target.value)} //note: event.target.value is the text typed into the input box by user
                />
            </>}
            <h2 className='font-bold'>Select Theme Colour</h2>
            <div className='flex justify-evenly'>
                {ThemeOptions.map((colour, index)=>(
                    <div key={index} className={`h-8 w-8 rounded-full
                    ${themeColour==colour&&'border-4 border-black'}`}
                    style={{backgroundColor:colour}}
                    onClick={()=>setThemeColour(colour)}> {/* the ()=> makes the setState as a function so it only triggers on the click (onClick is supposed to trigger a function) https://stackoverflow.com/questions/74266096/why-cant-we-directly-use-setstate-on-onclick */}
                    </div>
                ))}
            </div>
        </div>

        <Button className='w-full mt-3'
        //create button is disabled if any of the required fields have not been filled -> note: || is an or operator
        disabled={!eventName||!duration||!locationType||!locationUrl}>
            Create
        </Button>
    </div>
  )
}

export default MeetingForm
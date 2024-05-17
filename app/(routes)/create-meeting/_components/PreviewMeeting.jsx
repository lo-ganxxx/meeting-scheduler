import { Clock, MapPin } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Calendar } from "@/components/ui/calendar"
import { Button } from '@/components/ui/button'

function PreviewMeeting({formValue}) {

    const [date,setDate]=useState(new Date())
    const [timeSlots, setTimeSlots]=useState()

    useEffect(()=>{
        formValue?.duration&&createTimeSlot(formValue?.duration) //returns available time slots for given duration
    }, [formValue])

    const createTimeSlot=(interval)=>{
        const startTime = 8 * 60 //8AM in minutes
        const endTime = 22 * 60 //10PM in minutes
        const totalSlots = (endTime - startTime) / interval //dividing available time into chosen size time slots
        const slots = Array.from({ length: totalSlots }, (_, i) => {
            const totalMinutes = startTime + i * interval
            const hours = Math.floor(totalMinutes / 60) //hours rounded down to whole value
            const minutes = totalMinutes % 60
            const formattedHours = hours > 12 ? hours - 12 : hours //Convert to 12-hour format
            const period = hours >= 12 ? 'PM' : 'AM' //If at or after 12:00 it is afternoon, so PM, otherwise AM
            return `${String(formattedHours).padStart(2, '0')}:${String(minutes).padStart(2, '0')} ${period}` //padstart will pad the beginning of a string until it is at target length, in this case it will add 0s to the front until the length is 2. I.e. 7 will be shown as 07
        })

        console.log(slots)
        setTimeSlots(slots)
    }

  return (
    <div className='p-5 py-10 shadow-lg m-5 border-t-8'
    style={{borderTopColor:formValue?.themeColour}}
    >
        <Image src='/logo.svg' alt='logo' width={150} height={150} />
        <div className='grid grid-col-3 md:grid-cols-3 mt-5'>
            {/* Meeting Info */}
            <div className='p-4 border-r'>
                <h2>Business Name</h2>
                <h2
                className='font-bold text-2xl'
                >{formValue?.eventName?formValue?.eventName:'Meeting Name'}</h2> {/* if event name is set, display that, otherwise just display the default text */}
                <div className='mt-5 flex flex-col gap-4'>
                    <h2 className='flex gap-2'><Clock/>{formValue?.duration} Min</h2>
                    <h2 className='flex gap-2'><MapPin/>Via {formValue?.locationType}</h2>
                    <Link href={formValue?.locationUrl?formValue?.locationUrl:'#'}
                    className='text-primary'
                    >{formValue?.locationUrl}</Link>
                </div>
            </div>
            {/* Time & Date Selection */}
            <div className='md:col-span-2 flex px-4'>
                <div className='flex flex-col'>
                    <h2 className='font-bold text-lg'>Select Date & Time</h2>
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        className="rounded-md border mt-4"
                        disabled={(date)=>date<=new Date()}
                    />
                </div>
                <div className='flex flex-col w-full overflow-auto gap-4 p-5'
                style={{maxHeight:'400px'}}
                >
                    {timeSlots?.map((time, index)=>(
                        <Button key={index} className='border-primary text-primary'
                        variant='outline'>{time}</Button>
                    ))}
                </div>
            </div>
        </div>
    </div>
  )
}

export default PreviewMeeting
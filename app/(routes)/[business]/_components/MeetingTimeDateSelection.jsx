import { CalendarCheck, Clock, MapPin, Timer } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { format } from 'date-fns'
import TimeDateSelection from './TimeDateSelection'
import UserFormInfo from './UserFormInfo'

function MeetingTimeDateSelection({meetingEventInfo, businessInfo}) {

  //possibly store this code somewhere so that it can be used on actual page + preview page without repeating? there are only small differences.

  const [date,setDate]=useState(new Date())
  const [timeSlots, setTimeSlots]=useState()
  const [enabledTimeSlot, setEnabledTimeSlot]=useState(false)
  const [selectedTime, setSelectedTime]=useState()
  const [step, setStep]=useState(1)

  useEffect(()=>{
    meetingEventInfo?.duration&&createTimeSlot(meetingEventInfo?.duration) //returns available time slots for given duration
  }, [meetingEventInfo])

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

  const handleDateChange=(date)=>{
    setDate(date)
    const day=format(date, 'EEEE') //using date-fns to format the date to just day in Monday, Tuesday, etc. formatting
    if(businessInfo?.daysAvailable?.[day]) //returns true or false
    {
        setEnabledTimeSlot(true)
    }
    else {
        setEnabledTimeSlot(false)
    }
  }

  return (
    <div className='p-5 py-10 shadow-lg m-5 border-t-8
    mx-10
    md:mx-26
    lg:mx-56
    my-10'
    style={{borderTopColor:meetingEventInfo?.themeColour}}
    >
        <Image src='/logo.svg' alt='logo' width={150} height={150} />
        <div className='grid grid-col-3 md:grid-cols-3 mt-5'>
            {/* Meeting Info */}
            <div className='p-4 border-r'>
                <h2>{businessInfo?.businessName}</h2>
                <h2
                className='font-bold text-2xl'
                >{meetingEventInfo?.eventName?meetingEventInfo?.eventName:'Meeting Name'}</h2> {/* if event name is set, display that, otherwise just display the default text */}
                <div className='mt-5 flex flex-col gap-4'>
                    <h2 className='flex gap-2'><Clock/>{meetingEventInfo?.duration} Min</h2>
                    <h2 className='flex gap-2'><MapPin/>Via {meetingEventInfo?.locationType}</h2>
                    <h2 className='flex gap-2'><CalendarCheck/>{format(date, 'PPP')}</h2> {/* display selected date in formatted form */}
                    {selectedTime&&<h2 className='flex gap-2'><Timer/>{selectedTime}</h2>}
                    <Link href={meetingEventInfo?.locationUrl?meetingEventInfo?.locationUrl:'#'}
                    className='text-primary'
                    >{meetingEventInfo?.locationUrl}</Link>
                </div>
            </div>
            {/* Time & Date Selection */}
            {step==1?<TimeDateSelection
            date={date}
            enabledTimeSlot={enabledTimeSlot}
            handleDateChange={handleDateChange}
            setSelectedTime={setSelectedTime}
            timeSlots={timeSlots}
            />:<UserFormInfo/>}
        </div>
        <div className='mb-16'>
            <Button className='mt-10 float-right'
            disabled={!selectedTime||!date}
            onClick={()=>setStep(step+1)}
            >
            {step==1?'Next':'Schedule Now'}</Button>
        </div>
    </div>
  )
}

export default MeetingTimeDateSelection
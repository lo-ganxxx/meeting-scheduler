import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import React from 'react'

function TimeDateSelection({date, handleDateChange, timeSlots, setSelectedTime, enabledTimeSlot, selectedTime, prevEventBooking}) {
  
    // checks the availability of the chosen time slot, by looking at other booked meetings for the day
    const checkTimeSlot=(time)=>{
        return (prevEventBooking.filter(item=>item.selectedTime==time)).length>0 //returns true or false -> true if time is already booked; unavailable
    }
  
    return (
    <div className='md:col-span-2 flex px-4'>
                <div className='flex flex-col'>
                    <h2 className='font-bold text-lg'>Select Date & Time</h2>
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={(d)=>handleDateChange(d)}
                        className="rounded-md border mt-4"
                        disabled={(date)=>date<=new Date()}
                    />
                </div>
                <div className='flex flex-col w-full overflow-auto gap-4 p-5'
                style={{maxHeight:'400px'}}
                >
                    {timeSlots?.map((time, index)=>(
                        <Button
                        disabled={!enabledTimeSlot||checkTimeSlot(time)} //this disables the option on the frontend.. have to make it so it ALSO rejects these on backend
                        onClick={()=>setSelectedTime(time)}
                        key={index}
                        className={`border-primary text-primary
                        ${time==selectedTime&&'bg-primary text-white'}
                        `}
                        variant='outline'>{time}</Button>
                    ))}
                </div>
            </div>
  )
}

export default TimeDateSelection
"use client"
import DaysList from '@/app/_utils/DaysList'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { app } from '@/config/FirebaseConfig'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { doc, getDoc, getFirestore, updateDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

function Availability() {

    const db=getFirestore(app)
    const {user}=useKindeBrowserClient()

    const [daysAvailable, setDaysAvailable]=useState(
        {
            Monday:false
        },
        {
            Tuesday:false
        },
        {
            Wednesday:false
        },
        {
            Thursday:false
        },
        {
            Friday:false
        },
        {
            Saturday:false
        },
        {
            Sunday:false
        }
    )
    const [startTime, setStartTime] = useState()
    const [endTime, setEndTime] = useState()

    useEffect(()=>{
        user&&getBusinessInfo()
    }, [user])

    const getBusinessInfo=async()=>{
        const docRef=doc(db, "Business", user?.email)
        const docSnap=await getDoc(docRef) //get business info from database
        const result=docSnap.data()
        //update to the data that is on the database
        setDaysAvailable(result.daysAvailable)
        setStartTime(result.startTime)
        setEndTime(result.endTime)
    }

    const onHandleChange=(day, checked)=>{ //Called when a day available checkbox is checked/unchecked
        setDaysAvailable({
            ...daysAvailable, //the current items in the dictionary (in seperated form)
            [day]:checked //appending the newly checked/unchecked day to the dictionary
        })
        console.log(daysAvailable)
    }

    const handleSave=async()=>{ //Save availability data to database
        const docRef = doc(db, "Business", user?.email)

        //Set the specified fields in the Business subcollection under the name of the user's email (in database)
        await updateDoc(docRef, {
            daysAvailable:daysAvailable,
            startTime:startTime,
            endTime:endTime
        }).then(resp=>{
            toast("Changes saved!")
        })
    }

  return (
    <div className='p-5'>
        <h2 className='font-bold text-2xl'>Availability</h2>
        <hr className='my-7'></hr>
        <div>
            <h2 className='font-bold'>Select the days you are available:</h2>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-5 my-3'>
                {DaysList.map((item, index)=>(
                    <div key={index}>
                        <h2><Checkbox id={item.day}
                        checked={daysAvailable[item.day]?daysAvailable[item.day]:false} //update to what is currently set in the database if there is a value for that day in the database
                        onCheckedChange={(checked)=>onHandleChange(item.day, checked)}
                        />
                        <label htmlFor={item.day} className='ml-1.5 cursor-pointer'>{item.day}</label>
                        {/* when the text label is clicked, it will set the value of the associated checkbox */}
                        </h2>
                    </div>
                ))}
            </div>
        </div>
        <div>
            <h2 className='font-bold mt-10'>Select the hours you are available:</h2>
            <div className='flex gap-10'>
                <div className='mt-3'>
                    <h2>Start time</h2>
                    <Input type="time"
                    defaultValue={startTime}
                    onChange={(e)=>setStartTime(e.target.value)} />
                </div>
                <div className='mt-3'>
                    <h2>End time</h2>
                    <Input type="time"
                    defaultValue={endTime}
                    onChange={(e)=>setEndTime(e.target.value)} />
                </div>
            </div>
        </div>
        <div>
            <Button className='mt-10'
            onClick={handleSave}
            >Save</Button>
        </div>
    </div>
  )
}

export default Availability
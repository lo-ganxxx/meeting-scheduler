'use client'
import React, { useEffect, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ScheduledMeetingList from './_components/ScheduledMeetingList'
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { app } from '@/config/FirebaseConfig'
import { format } from 'date-fns'

function ScheduledMeeting() {

    const db=getFirestore(app)
    const {user}=useKindeBrowserClient()
    const [meetingList, setMeetingList] = useState([])

    useEffect(()=>{ //used to get businesses scheduled meetings
        user&&getScheduledMeetings()
    },[user])

    const getScheduledMeetings=async()=>{
        setMeetingList([])
        const q=query(collection(db, "ScheduledMeeting"),
        where("businessEmail", "==", user?.email))
 
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach((doc)=>{
            console.log(doc.data())
            setMeetingList((prev)=>[...prev, doc.data()])
        })
    }

    const filterMeetingList=(type)=>{
        if(type=="upcoming")
            {
                return meetingList.filter((item)=>item.formattedTimeStamp>=format(new Date(), 't'))
            }
        else if(type=="previous")
            {
                return meetingList.filter((item)=>item.formattedTimeStamp<format(new Date(), 't'))
            }
        else //invalid meeting list type to filter
            {
                console.error("Invalid meeting list type to filter");
            }
    }

  return (
    <div className='p-10'>
        <h2 className='font-bold text-2xl'>Scheduled Meetings</h2>
        <hr className='my-5'></hr>
        <Tabs defaultValue="upcoming" className="w-[400px]">
            <TabsList>
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="previous">Previous</TabsTrigger>
            </TabsList>
            <TabsContent value="upcoming">
                <ScheduledMeetingList
                meetingList={filterMeetingList("upcoming")}
                />
            </TabsContent>
            <TabsContent value="previous">
                previous
                <ScheduledMeetingList
                meetingList={filterMeetingList("previous")}
                />
            </TabsContent>
        </Tabs>

    </div>
  )
}

export default ScheduledMeeting
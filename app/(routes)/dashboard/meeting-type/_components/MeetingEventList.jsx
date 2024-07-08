"use client"
import React, { useEffect, useState } from 'react'
import { app } from '@/config/FirebaseConfig'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { collection, deleteDoc, doc, getDoc, getDocs, getFirestore, orderBy, query, where } from 'firebase/firestore'
import { Clock, Copy, MapPin, Pen, Settings, Trash } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  
function MeetingEventList() {
  
    const db=getFirestore(app)
    const {user}=useKindeBrowserClient()

    const [businessInfo, setBusinessInfo] = useState()
    const [eventList, setEventList]=useState([])

    useEffect(()=>{
        user&&getEventList() //once user object is retrieved, get the meeting events list from db
        user&&getBusinessInfo()
    }, [user])

    const getBusinessInfo=async()=>{
        const docRef=doc(db, "Business", user.email)
        const docSnap=await getDoc(docRef)
        setBusinessInfo(docSnap.data())
    }

    const getEventList=async()=>{ //get list of users meeting events from database
        setEventList([])
        const q = query(collection(db, "MeetingEvent"), //stored under the MeetingEvent collection
        where("createdBy", "==", user?.email), //find those created by the logged in user
        orderBy('id', 'desc')) //ordered by id, descending (most recent at top)

        const querySnapshot = await getDocs(q)
        querySnapshot.forEach((doc)=>{
            console.log(doc.id, " => ", doc.data())
            setEventList(prevEvent=>[...prevEvent,doc.data()]) //appends to end of list one by one
        })
    }

    const onDeleteMeetingEvent=async(event)=>{ //when delete button is pressed on a meeting events settings
        await deleteDoc(doc(db, "MeetingEvent", event.id)).then(resp=>{ //delete the doc from database using id
            toast('Meeting event deleted')
            getEventList() //update the list of meeting events
        })
    }

    const onCopyClick=(event)=>{
        const meetingEventUrl=process.env.NEXT_PUBLIC_BASE_URL+businessInfo.businessName+'/'+event.id
        navigator.clipboard.writeText(meetingEventUrl) //Copies to the users clipboard
        toast('Link copied to clipboard')
    }

    return (
    <div className='mt-10 grid grid-cols-1 md:grid-cols-2
    lg:grid-cols-3 gap-7'>
        {eventList.length>0?eventList?.map((event, index)=>( //if there are events in the list
            <div className='border shadow-md border-t-8 rounded-lg p-5 flex
            flex-col gap-3' style={{borderTopColor:event?.themeColour}}>
                <div className='flex justify-between'>
                    <h2 className='font-bold text-xl'>
                        {event?.eventName}
                    </h2>

                   <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Settings className='cursor-pointer'/>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem className='flex gap-2'><Pen/> Edit</DropdownMenuItem>
                            <DropdownMenuItem className='flex gap-2'
                            onClick={()=>onDeleteMeetingEvent(event)}><Trash/> Delete</DropdownMenuItem>
                            {/* add confirm delete button to avoid accidental deletes? improves user experience */}
                        </DropdownMenuContent>
                    </DropdownMenu>

                </div>
                <div className='flex justify-between'>
                    <h2 className='flex gap-2 text-gray-500'><Clock/> {event.duration} Min</h2>
                    <h2 className='flex gap-2 text-gray-500'><MapPin/> {event.locationType}</h2>
                </div>
                <hr></hr>
                <div className='flex justify-between'>
                    <h2 className='flex gap-2 text-primary text-sm items-center cursor-pointer'
                    onClick={()=>{
                        onCopyClick(event)
                    }}
                    >
                        <Copy className='h-4 w-4'/>Copy Link</h2>
                        <Button variant='outline' className='border-primary rounded-full text-primary'>Share</Button>
                </div>
            </div>
        ))
            :<h2>Loading... (Event list empty)</h2>
    }
    </div>
  )
}

export default MeetingEventList
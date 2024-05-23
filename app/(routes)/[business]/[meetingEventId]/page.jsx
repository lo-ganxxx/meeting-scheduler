//square brackets [] indicate a dynamic route
"use client"
import React, { useEffect, useState } from 'react'
import MeetingTimeDateSelection from '../_components/MeetingTimeDateSelection'
import { collection, doc, getDoc, getDocs, getFirestore, query, where } from 'firebase/firestore'
import { app } from '@/config/FirebaseConfig'

function ShareMeetingEvent({params}) { //takes in the params set in the dynamic route - [business] param and the [meetingEventId] param

    const db=getFirestore(app)
    const [businessInfo, setBusinessInfo]=useState()
    const [meetingEventInfo, setMeetingEventInfo]=useState()
    const [loading, setLoading]=useState(false)

    useEffect(()=>{
        params&&getMeetingBusinessandEventDetails()
    }, [params])

    const getMeetingBusinessandEventDetails=async()=>{ //fetch the business and event details related to the meeting from the db
        setLoading(true)

        const q=query(collection(db, "Business"), where("businessName", "==", params.business))
        const docSnap=await getDocs(q)
        docSnap.forEach((doc)=>{
            setBusinessInfo(doc.data())
        })

        const docRef=doc(db, "MeetingEvent", params?.meetingEventId)
        const result=await getDoc(docRef)
        setMeetingEventInfo(result.data())

        setLoading(false)
    }
    
  return (
    <div>
        <MeetingTimeDateSelection meetingEventInfo={meetingEventInfo}
        businessInfo={businessInfo}/>
    </div>
  )
}

export default ShareMeetingEvent
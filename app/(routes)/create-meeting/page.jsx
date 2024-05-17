"use client"
import React, { useState } from 'react'
import MeetingForm from './_components/MeetingForm'
import PreviewMeeting from './_components/PreviewMeeting'

function CreateMeeting() {
  const [formValue, setFormValue]=useState()
  return (
    <div className='grid grid-cols-1 md:grid-cols-3'>
        {/* Meeting Form */}
        <div className='shadow-md border h-screen'>
            <MeetingForm setFormValue={(v)=>setFormValue(v)} /> {/* defines the function "setFormValue" to setState with the passed value */}
        </div>
        {/* Preview */}
        <div className='md:col-span-2'>
            <PreviewMeeting formValue={formValue} /> {/* passes down the form values for the preview to use */}
        </div>
    </div>
  )
}

export default CreateMeeting
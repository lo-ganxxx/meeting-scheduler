import React from 'react'
import MeetingForm from './_components/MeetingForm'

function CreateMeeting() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-3'>
        {/* Meeting Form */}
        <div className='shadow-md border h-screen'>
            <MeetingForm/>
        </div>
        {/* Preview */}
        <div className='md:col-span-2'>

        </div>
    </div>
  )
}

export default CreateMeeting
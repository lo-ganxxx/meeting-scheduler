import { Input } from '@/components/ui/input'
import React from 'react'
import MeetingEventList from './_components/MeetingEventList'

//this is a nested route inside the dashboard route.. i.e. dashboard/meeting-type leads here

function MeetingType() {

  return (
    <div className='p-5'>
      <div className='flex flex-col gap-5'>
        <h2 className='font-bold text-2xl'>Meeting Event Type</h2>
        <Input placeholder="Search" className='max-w-xs' />
        <hr></hr>
      </div>
      <MeetingEventList />
    </div>
  )
}

export default MeetingType
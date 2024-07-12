import React from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { CalendarCheck, Clock, MapPin, Timer } from 'lucide-react'
import Link from 'next/link'
import { format } from 'date-fns'
import { Button } from '@/components/ui/button'


function ScheduledMeetingList({meetingList}) {
  return (
    <div>
      {meetingList&&meetingList.map((meeting, index)=>( //NEED TO ADD: order meetings from closest time to furtherest
        <Accordion type="single" collapsible key={index}>
          <AccordionItem value="item-1">
            <AccordionTrigger>{meeting?.formattedDate}</AccordionTrigger>
            <AccordionContent>
              <div>
                  <div className='mt-5 flex flex-col gap-4'>
                      <h2 className='flex gap-2'><Clock/>{meeting?.duration} Min</h2>
                      {/* <h2 className='flex gap-2'><MapPin/>Via {meeting?.locationType}</h2> */}
                      <h2 className='flex gap-2'><CalendarCheck/>{meeting?.formattedDate}</h2> {/* display selected date in formatted form */}
                      <h2 className='flex gap-2'><Timer/>{meeting?.selectedTime}</h2>
                      <Link href={meeting?.locationUrl?meeting?.locationUrl:'#'}
                      className='text-primary'
                      >{meeting?.locationUrl}</Link> {/*links can cause errors if not properly defined e.g. not in https://www.website.com form */}
                  </div>
                    <Link href={meeting?.locationUrl}>
                      <Button className="mt-5">Join now</Button>
                    </Link>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
      </div>
  )
}

export default ScheduledMeetingList
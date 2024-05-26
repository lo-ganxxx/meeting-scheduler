import { Button } from '@/components/ui/button'
import { CheckCircle } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function Confirmation() {
  return (
    <div className='flex flex-col items-center justify-center gap-6 p-20'>
        <CheckCircle className='h-9 w-9 text-green-500'/>
        <h2 className='font-bold text-3xl'>Your meeting has been scheduled successfully!</h2>
        <h2 className='text-lg text-gray-500'>Confirmation has been sent to your email address</h2>
        <Link href={'/'}><Button>Thank you</Button></Link>
    </div>
  )
}

export default Confirmation
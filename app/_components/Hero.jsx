import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'

function Hero() {
  return (
    <div className='flex flex-col justify-center items-center my-20'>
        <div className='text-center mx-w-3xl'>
            <h2 className='font-bold text-[60px] text-slate-700'>Easy scheduling ahead</h2>
            <h2 className='text-xl mt-5 text-slate-500 p-3'>Using this Next.js full stack meeting scheduler app you can skip the boring back-and-forth emails to find the perfect time by directly booking an available time here! Placeholder.</h2>
            <div className='flex gap-4 flex-col mt-5'>
                <h3 className='text-sm'>Login instantly with Google or Facebook</h3>
                <div className='flex justify-center gap-8'>
                    <Button variant='outline' className='p-7 flex gap-4'>
                        <Image src='/google.png' alt='google' width={30} height={30}/>
                        Login with Google</Button>
                    <Button variant='outline' className='p-7 flex gap-4'>
                        <Image src='/facebook.png' alt='facebook' width={30} height={30}/>
                        Login with Facebook</Button>
                </div>
                <hr></hr>
                <h2><Link href='' className='text-primary '>Sign up for free with Email</Link></h2>
            </div>
        </div>
    </div>
  )
}

export default Hero
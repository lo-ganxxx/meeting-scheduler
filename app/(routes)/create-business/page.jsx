"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { getFirestore, doc, setDoc } from 'firebase/firestore'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { app } from '@/config/FirebaseConfig'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

function CreateBusiness() {
    const [businessName, setBusinessName]=useState();
    const db = getFirestore(app);
    const {user} = useKindeBrowserClient();
    const router = useRouter();
    const onCreateBusiness=async()=>{
        console.log("Button clicked, business name:", businessName)
        // Add a new document in collection "cities"
        await setDoc(doc(db, "Business", user.email), { //creating a new document under the business collection -> only one business per email (if creating new business it will update within pre-existing document)
        businessName: businessName, //business name that was entered in the input box
        email: user.email,
        userName: user.given_name + " " + user.family_name
        }).then(resp=>{
            console.log("Document saved");
            toast('New business created!');
            router.replace('/dashboard') //replace -> when press back button it wont take you back to this page
        })
    }

  return (
    <div className='p-14 items-center flex flex-col gap-20 my-10'>
        <Image src='/logo.svg' alt='logo' width={200} height={200}/>
        <div className='flex flex-col items-center gap-4 max-w-3xl'>
            <h2 className='text-4xl font-bold'>What should we call your business?</h2>
            <p className='text-slate-500'>You can always change this later from settings</p>
            <div className='w-full'>
                <label className='text-slate-400'>Team Name</label>
                <Input placeholder="Ex. Lucrative Management"
                className="mt-2"
                onChange={(event)=>setBusinessName(event.target.value)}
                />
            </div>
            <Button className="w-full"
                disabled={!businessName} //if no business name has been typed in, disable the button (cant enter empty value)
                onClick={onCreateBusiness} //trigger the corresponding function when button clicked
                >Create Business</Button>
        </div>
    </div>
  )
}

export default CreateBusiness
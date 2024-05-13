"use client"
import { LogoutLink, useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import React, { useEffect, useState } from 'react'
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { app } from '@/config/FirebaseConfig';
import { useRouter } from 'next/navigation';

function Dashboard() {

  const db = getFirestore(app); //initialize firebase database
  const {user}=useKindeBrowserClient() //getting the user data from client components
  const [loading, setLoading] = useState(true)
  const router=useRouter();

  useEffect(()=>{
    user&&isBusinessRegistered(); //only when user is available (hook will take time to get data) then the useEffect will get executed
  }, [user])

  const isBusinessRegistered=async()=>{ //function must be async if using await
    const docRef = doc(db, "Business", user.email); //business documents named by user email
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setLoading(false)
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
      setLoading(false)
      router.replace('/create-business') //redirect to create business page
    }
  }

  if(loading) //while waiting for document data to be retrieved
    {
      return <h2>Loading...</h2>
    }

  return (
    <div>
        Dashboard
        <LogoutLink>Logout</LogoutLink>
        </div>
  )
}

export default Dashboard
import Hero from '@/components/Hero'
import Herosections from '@/components/Herosections'
import Herotab from '@/components/Herotab'
import Navbar from '@/components/Navbar'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import React from 'react'
import Footer from '@/components/Footer' 

const Page = async () => {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (user) {
    redirect('/dashboard')
  }

  return (
    <div className='relative bg-slate-50 min-h-screen flex flex-col'>
      <div className='absolute z-10 flex w-full'>
        <Navbar/>
      </div>
      <div className="flex-1 flex flex-col">
        <Hero/>
        <Herotab/>
        <Herosections/>
      </div>
      <Footer />
    </div>
  )
}

export default Page
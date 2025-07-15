import Hero from '@/components/Hero'
import Herosections from '@/components/Herosections'
import Herotab from '@/components/Herotab'
import Navbar from '@/components/Navbar'
import React from 'react'

const page = () => {
  return (
    <div className='relative bg-slate-50'>
      <div className='absolute z-10 flex w-full'>
      <Navbar/>
      </div>
      <Hero/>
      <Herotab/>
      {/* <Herosections/> */}
    </div>
  )
}

export default page
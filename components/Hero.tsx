import React from 'react'

const Hero = () => {
  return (
    <div className='flex w-full justify-center items-center pt-36 bg-gradient-to-t from-slate-50 to-orange-200'>
    <div className='max-w-5xl items-center flex flex-col text-center gap-8'>
      <div className='flex flex-col gap-5 items-center'>
      <h1 className='text-7xl font-bold font-mont'>Automated Cold Outreach, Supercharged by AI</h1>
      <h1 className='text-xl font-mont'>Instantly craft and send personalized cold emails from your Gmail powered by AI, triggered with one click.
      Save time, boost replies, and never miss a follow-up again.</h1>
      </div>
      <div>
        <div
        className='bg-orange-400 [background-image:radial-gradient(88%_100%_at_bottom,rgba(255,255,255,0.5),rgba(255,255,255,0))] p-2 px-4 rounded-xl'
        >
          <h1 className='font-medium font-mont'>Learn More</h1>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Hero
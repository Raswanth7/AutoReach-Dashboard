import Image from 'next/image'
import React from 'react'

const Herosections = () => {
  return (
    <div className='px-10 py-4 pb-18'>
      <div className='flex flex-col gap-18'>
        <div className='w-full justify-center items-center flex flex-row'>
          <div className='flex flex-col gap-y-6'>
            <h1 className='text-6xl bg-gradient-to-r from-orange-400 to-orange-500 text-transparent bg-clip-text font-semibold font-mont'>Smarter Workflows</h1>
            <p className='text-2xl font-mont'>Smarter workflows powered by automation and AI streamline your outreach in one click.
                Personalized emails are generated instantly using your custom prompts.
                Each message is context-aware, tailored to your target’s profile and goals.
                Let the system draft high-impact emails while you focus on real connections.</p>
        </div>
        <div className='min-w-xl justify-center items-center flex'>
          <Image
          src={'/assets/automateicon.png'}
          alt='automate logo'
          width={1920}
          height={1080}
          className='w-56 h-56'
          />
        </div>
        </div>

        <div className='w-full justify-center items-center flex flex-row'>
        <div className='min-w-xl justify-center items-center flex'>
          <Image
          src={'/assets/followupicon.png'}
          alt='automate logo'
          width={1920}
          height={1080}
          className='w-56 h-56'
          />
        </div>
          <div className='flex flex-col gap-y-6'>
            <h1 className='text-6xl bg-gradient-to-r from-orange-400 to-orange-500 text-transparent bg-clip-text font-semibold font-mont text-end'>Effortless Follow-Ups</h1>
                <p className='text-2xl font-mont text-end'>Automated follow-ups keep your outreach active without lifting a finger.
The system tracks replies and drafts follow-ups.
Each follow-up is thoughtfully drafted to feel personal, not robotic.
With one click, ensure no opportunity slips through the cracks.</p>
        </div>
        </div>
        </div>
    </div>
  )
}

export default Herosections
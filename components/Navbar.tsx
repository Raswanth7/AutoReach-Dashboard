import SignInWithGoogleButton from '@/app/auth/(auth)/login/components/SigninWithGoogleButton'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <div className='px-4 py-3 flex flex-row w-full justify-between'>
        <div className='flex flex-row gap-2 items-center'>
            <Image
            src={'/logo.png'}
            alt='logo'
            width={1920}
            height={1080}
            className='w-8 h-8'
            />
            <h1 className="font-mont font-bold text-lg tracking-tight">AutoReach</h1>
        </div>
        <div className='flex flex-row items-center gap-6'>
            <div className='flex flex-row items-center gap-9'>
            <h1 className='hover:text-orange-500 cursor-pointer transition-all duration-300 font-mont font-semibold'>Home</h1>
            <Link href={'/about'} target='_blank'><h1 className='hover:text-orange-500 cursor-pointer transition-all duration-300 font-mont font-semibold'>About</h1></Link>
            <h1 className='hover:text-orange-500 cursor-pointer transition-all duration-300 font-mont font-semibold'>Contact</h1>
            </div>
            <SignInWithGoogleButton/>
        </div>
    </div>
  )
}

export default Navbar
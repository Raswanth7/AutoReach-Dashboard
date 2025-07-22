import { Github, Globe, Instagram, Linkedin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Footer = () => (
  <footer className="w-full bg-black text-white py-6 mt-12">
    <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className='flex justify-center items-center'>
            <Image
            src={'/logo.png'}
            alt='logo'
            width={1920}
            height={1080}
            className='w-8 h-8'
            />
        </div>
        <div>
        <h1 className='font-mont font-light'>Designed and Developed by Raswanth</h1>
        </div>
        <div className='flex flex-row justify-center items-center gap-x-4'>
            <Link href='#'><Linkedin /></Link>
            <Link href='#'><Globe /></Link>
            <Link href='#'><Github /></Link>
            <Link href='#'><Instagram /></Link>
        </div>
      </div>
  </footer>
);

export default Footer;
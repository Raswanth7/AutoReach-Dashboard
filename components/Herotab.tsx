import React from 'react'
import { ContainerScroll } from './ui/container-scroll-animation'
import Image from 'next/image'

const Herotab = () => {
  return (
<div className="flex flex-col overflow-hidden pb-18">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold opacity-90 font-mont text-black dark:text-white">
            Your Cold Emails Just Got Smarter<br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
              Automated by AI.
              </span>
            </h1>
          </>
        }
      >
        <Image
          src={`/assets/Dashboardtab.png`}
          alt="hero"
          height={1080}
          width={1920}
          className="w-full h-full"
          draggable={false}
        />
      </ContainerScroll>
    </div>
  )
}

export default Herotab
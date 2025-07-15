import React from 'react'
import { ContainerScroll } from './ui/container-scroll-animation'

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
        <img
          src={`/linear.webp`}
          alt="hero"
          height={720}
          width={1400}
          className="mx-auto rounded-2xl object-cover h-full object-left-top"
          draggable={false}
        />
      </ContainerScroll>
    </div>
  )
}

export default Herotab
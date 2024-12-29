import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Home() {
  return (
    <section className='max-w-screen-2xl mx-auto font-sans overflow-hidden'>
      {/* main div */}
      <div className='bg-[#141624]'>

        <div className='max-w-screen-xl mx-auto h-[664px] rounded-[12px] opacity-100  '>

          <div className='max-w-screen-xl mx-auto h-[600px] bg-[#141624] relative'>

            {/* content */}
            <div className='max-w-[598px] h-[304px] px-[40px] py-[1 0px] absolute md:left-[64px] lg:top-[160px] bottom-24 md:bottom-0 text-[#FFFFFF] rounded-[12px] shadow-xl bg-[#141624] opacity-90'>

              {/* text  */}
              <div className='max-w-[518px] h-[164px]'>

                <div>
                 <Link href={"/blogs"}>
                 <button className='text-[#FFFFFF] text-[14px] font-semibold bg-[#4B6BFB] rounded-[6px] py-[10px] mt-5 px-[8px]'>Technology</button>
                 </Link>
                  <br />
                  <br />

                  <h1 className='font-semibold md:text-4xl text-2xl'>The Impact of Technology on the Workplace: How Technology is Changing</h1>
                </div>

                <br />

                <div className='max-w-[421px] h-[30px] flex items-center justify-around  '>

                  <div className='max-w-[175px] h-[36px] flex justify-around items-center gap-5'>
                    {/* img */}
                    <div className='max-w-[36px] h-[36px] rounded-[28px]'>
                      <Image src={"/author.png"} width={36} height={36} alt='author'></Image>
                    </div>
                    {/* txt */}
                    <div>
                      <p className='text-[16px] text-[#97989F]'>Jason Francisco</p>
                    </div>


                  </div>

                  <div>
                    <p className='text-[16px] text-[#97989F]' >August 20, 2022</p>
                  </div>


                </div>

              </div>

            </div>

            {/* button */}
            <div className='absolute left-[64px] lg:top-[500px] bottom-2'>
              <Link href={"/blogs"}>
              <button className='flex items-center text-[#FFFFFF] text-[18px] font-semibold border rounded-[6px] py-[10px] px-[12px] group hover:bg-slate-500'>
                Explore Blogs
                <span className='ml-2 transition-transform duration-300 group-hover:translate-x-2'>
                  ➔
                </span>
              </button>
              </Link>
            </div>

            {/* hero img */}
            <div >
              {/* image */}
              <Image src={"/hero.png"} height={600} width={1280} alt='hero'></Image>
            </div>

          </div>


        </div>



      </div>

    </section>
  )
}

export default Home 
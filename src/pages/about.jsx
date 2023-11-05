import React from 'react'
import PageLayout from '../components/PageLayout'
import Container from '../components/Container'

export default function About() {
  return (
    <PageLayout>
      <Container className='text-white space-y-4 text-base lg:text-lg'>
        <h1 className='text-2xl font-bold my-4 text-white'>About Us</h1>
        <p className='text-white drop-shadow-lg'>
          Welcome to our innovative maritime technology venture, where we've
          brought together our passion for the seas and cutting-edge technology
          to revolutionize the way we navigate and understand the oceans. We
          provide real-time weather updates, navigation instructions, and news
          about alerts and accidents in a given latitude and longitude.
        </p>
        <h2 className='text-xl font-semibold'>Meet the Team</h2>
        <div className='flex flex-wrap gap-4 items-start mb-4'>
          <p className='bg-black/50 backdrop-blur-md p-4 rounded-md w-[400px] h-[200px]'>
            <b>Dibas Dauliya</b> - Our Visionary Leader: He is the driving force
            behind our mission. He's the tech wizard who leads the charge in
            developing and integrating the technology and understands how to use
            AWS location services to make our platform work.
          </p>
          <p className='bg-black/50 backdrop-blur-md p-4 rounded-md w-[400px] h-[200px]'>
            <b>Ishaq Ansari</b> - Our AI Guru: He reads the casualties and
            safety to make AI reliable, creating lifelike environments that help
            sailors prepare for their journeys.
          </p>
          <p className='bg-black/50 backdrop-blur-md p-4 rounded-md w-[400px] h-[200px]'>
            <b> Narayan Khanal</b> - Our Weather Expert: He is the go-to guy for
            weather updates. He's always keeping an eye on the weather and other
            general information, most accurate information to keep them safe on
            their voyages.
          </p>
          <p className='bg-black/50 backdrop-blur-md p-4 rounded-md w-[400px] h-[200px]'>
            <b> Suman Sah</b> - Our Navigation Whiz: He is responsible for
            turning complicated data into easy-to-understand instructions for
            sailors. He's the one who makes sure our platform gives reliable and
            up-to-date guidance for s afe sailing.
          </p>
        </div>
        <p className='drop-shadow-lg'>
          We are united by our shared commitment to advancing maritime
          technology and making our oceans safer for everyone who sets sail.
        </p>
      </Container>
    </PageLayout>
  )
}

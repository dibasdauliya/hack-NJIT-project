import React from 'react'
import PageLayout from '../components/PageLayout'
import Container from '../components/Container'

export default function Contact() {
  return (
    <PageLayout>
      <Container className='text-white space-y-4 text-lg'>
        <h1 className='text-2xl font-bold my-4 text-white'>About Us</h1>
        <p className='text-white drop-shadow-lg'>
          If you have any questions, suggestions, or would like to get in touch
          with our team, please feel free to reach out to us via email:
        </p>

        <p>
          Email:{' '}
          <a className='underline' href='mailto:ddauliya@caldwell.edu'>
            ddauliya@caldwell.edu
          </a>
        </p>
        <p>
          We're here to listen, assist, and collaborate, so don't hesitate to
          contact us. Together, we can make the seas a safer and more navigable
          place for all.
        </p>
      </Container>
    </PageLayout>
  )
}

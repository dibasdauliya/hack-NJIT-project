import React from 'react'
import Container from './Container'
import { Link } from 'react-router-dom'
import LeftArrow from '../icons/LeftArrow'

export default function PageLayout({ children }) {
  return (
    <div className='bg-hero-pattern bg-fixed min-h-screen'>
      <header className='text-white'>
        <Container>
          <Link
            to={'/'}
            className='flex items-center gap-3 bg-black w-fit p-2 rounded-md hover:brightness-150'>
            <LeftArrow /> Go to Home
          </Link>
        </Container>
      </header>

      {children}
    </div>
  )
}

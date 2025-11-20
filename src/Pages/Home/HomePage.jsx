
import React from 'react'
import { Hero } from './Components/Hero'
import { Testimonials } from './Components/Testimonials'
import { Faq } from './Components/Faq'
import { FeaturedProducts } from './Components/FeaturedProduct'
// import { useTitle } from '../../Hooks/useTitle'

export const HomePage = () => {
    // useTitle("Access Latest Computer Science eBooks")

  return (
    <main className=''>
        
        <Hero/>
        <FeaturedProducts/>
        <Testimonials/>
        <Faq/>
    </main>
  )
}

import React from 'react'
import { BiCart } from 'react-icons/bi'
import { Link } from 'react-router-dom'


const CartEmpty = () => {
  return (
    <section className='text-xl h-screen text-center max-w-4xl m-auto my-10 py-5 dark:text-slate-100 border dark:border-slate-700'>
        <div className='my-5'>
                <p className='text-green-600 text-7xl mb-5'>
                    <BiCart/>
                </p>
        
                <p>
                    Oops! Your Cart Look Empty!
                </p>
                <p>
                    Add eBook to your Cart from our store collection
                </p>
                
              </div>

              <Link
            to="/products"
            type='button'
            className='text-white bg-blue-700 hover:bg-blue-800 rounded-lg text-lg px-5 py-2.5 mb-2 dark:hover:bg-blue-700 dark:bg-blue-600 focus:outline-none inline-flex items-center gap-2'
      >
        Continue Shopping 
        <BiCart/>
      </Link>
    </section>
  )
}

export default CartEmpty

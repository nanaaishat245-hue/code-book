import React from 'react'
import { BiAlarmExclamation, BiCart } from 'react-icons/bi'
import { Link } from 'react-router-dom'



const OrderFail = ({ message = "Payment failed, please try again!" }) => {
  return (
    <section className='text-xl text-center max-w-4xl m-auto my-10 py-5 dark:text-slate-100 border dark:border-slate-700'>
      <div className='my-5'>
        <p className='text-red-500 text-7xl mb-5'>
            <BiAlarmExclamation/>
        </p>

        <p>{message}</p>
        
      </div>

      <div className='my-5'>
        <p>Your order is not confirmed</p>

        <p>
            Contact <span>DLTBook@gmail.com</span> for support
        </p>
        
      </div>

      <Link
            to="/cart"
            type='button'
            className='text-white bg-blue-700 hover:bg-blue-800 rounded-lg text-lg px-5 py-2.5 mb-2 dark:hover:bg-blue-700 dark:bg-blue-600 focus:outline-none inline-flex items-center gap-2'
      >
        Check Cart Again
        <BiCart/>
      </Link>
    </section>
  )
}

export default OrderFail
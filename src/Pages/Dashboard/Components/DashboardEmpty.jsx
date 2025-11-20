import React from 'react';
import { BiCart } from 'react-icons/bi';
import { Link } from 'react-router-dom';

const DashboardEmpty = () => {
  return (
    <section className='text-xl text-center max-w-4xl mx-auto my-10 py-5 dark:text-slate-100 border dark:border-slate-700 rounded'>
        <div className='my-5'>
            <p className='text-green-600 text-7xl mb-5'>
                <BiCart/>
            </p>

            <p>
                Oops! your order dashboard looks empty!
            </p>
            <p>
                Add eBook to your cart from our store
            </p>
        </div>
        <Link to="/products" className='text-white bg-blue-700 hover:bg-blue-800 rounded-lg text-lg px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none inline-flex items-center gap-2'>
        Continue Shopping 
        <BiCart/>
        </Link>

    </section>
  );
};

export default DashboardEmpty;
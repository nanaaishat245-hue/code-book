
import  React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { CiSearch } from "react-icons/ci";

export const Search = ({setSearchSection}) => {

    const navigate = useNavigate()

    const searchRef = useRef()

    const handleSearch = (event) => {
        event.preventDefault();
        setSearchSection(false)
        navigate(`/products?q=${searchRef.current.value}`)
    }
  return (
    <div className='mx-auto max-w-7xl p-2 my-5'>

        <form onSubmit={handleSearch} className='flex items center'>
            <div className='relative w-full' >
                <span className='flex absolute inset-y-0 items-center pl-3 pointer-events-none'>
                <CiSearch />
                </span>

                <input ref={searchRef} name='search' id='simple search' type="text" className='border-gray-300 bg-gray-30 text-gray-900 text-sm rounded-lg focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' placeholder='Search' autoComplete='off' required />

            </div>
            <button type='submit' className='py-2 px-3 ml-2 text-xm font-medium text-white bg-blue-700 
            rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
            <CiSearch />
            </button>
        </form>
      
    </div>
  )
}

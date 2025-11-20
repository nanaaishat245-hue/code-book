import React, { useRef, useState } from 'react'
import { IoMdEye, IoMdEyeOff } from 'react-icons/io'
import { Link, useNavigate, } from 'react-router-dom'
import { useTitle } from '../Hooks/useTitle'
import { useCart } from '../context'
import { login } from '../Services'
import { toast } from 'react-toastify'

export const Login = () => {
    useTitle("Login")
    const navigate = useNavigate()
    const email = useRef()
    const password = useRef()
    const {loadCart} = useCart()

    const handleLogin = async(event) =>{
      event.preventDefault()
      try{
        const authDetail = {
          email: email.current.value,
          password: password.current.value
        }
        const data = await login(authDetail)

        await loadCart()

        if(data.isAdmin) {
          navigate("/admin")
        } else {
        navigate("/products")
        }
      }catch (error) {
        toast.error(error.message, {closeButton: true, position: "bottom-center"} )
      }
    }

    const handleLoginGuest = () => {
      setTimeout(() => {
        navigate("/products")
      }, 1000)
    }

    const [showPassword, setShowPasswoed] = useState(false)

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center py-12 px-4">
      <section className="w-full max-w-5xl grid gap-10 lg:grid-cols-[1.2fr_1fr]">
        <div className="hidden lg:flex flex-col justify-center rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-gray-800/60 p-10 shadow-xl backdrop-blur">
          <p className="text-sm uppercase tracking-[0.35em] text-gray-500 dark:text-gray-400 mb-4">
            Welcome back
          </p>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white leading-tight mb-4">
            Sign in to continue exploring curated eBooks for developers and designers.
          </h1>
          <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed">
            Access your personal dashboard, manage your library, and sync your cart across sessions.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 sm:p-10 border border-gray-100 dark:border-gray-700">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Log in to your account
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              Enter your credentials or{" "}
              <span onClick={handleLoginGuest} className="text-blue-700 dark:text-blue-500 cursor-pointer font-medium">
                continue as guest
              </span>
              
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email address
              </label>
              <input
                ref={email}
                type="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="shubham@example.com"
                required
                autoComplete="off"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Password
              </label>
             <div className='relative'>
                 <input
                ref={password}
                type={showPassword ? "text" : "password"}
                id="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                placeholder='........'
              />

              <button
                type='button'
                onClick={() => setShowPasswoed((prev) => !prev)}
                className='absolute inset-y-0 right-3 flex items-center text-gray-500 cursor-pointer dark:text-gray-300'
              >
                {showPassword ? <IoMdEyeOff /> : <IoMdEye />}
              
                </button>
             </div>
            </div>

            <button
              type="submit"
              className="w-full text-white cursor-pointer bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 transition-colors"
            >
              Log In
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-gray-600 dark:text-gray-300">
            Need an account?{" "}
            <Link to="/register" className="font-semibold text-blue-700 dark:text-blue-500 hover:underline">
              Create one now
            </Link>
          </div>

          <button
             onClick={handleLoginGuest}
            type="button"
            className="mt-6 w-full cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 transition-colors"
          >
            Login As Guest
          </button>
        </div>
      </section>
    </main>
  )
}

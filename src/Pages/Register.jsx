
import React, { useState } from 'react';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import { Link, useNavigate } from 'react-router-dom';
import { useTitle } from '../Hooks/useTitle';
import { register } from '../Services';
import { toast } from 'react-toastify';


export const Register = () => {
     useTitle("Register");
     const navigate = useNavigate();

     const handleRegister = async (event) => {
        event.preventDefault();

     try{
        const authDetail = {
            name: event.target.name.value,
            email: event.target.email.value,
            password: event.target.password.value
        };
        await register(authDetail);

        navigate("/products");
     } catch (error) {
        toast.error(error.message, {
            closeButton: true,
            position: "bottom-center",
        })
     }
     
     }

    const [showPassword, setShowPasswoed] = useState(false)

    return (
        <main className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center py-12 px-4">
            <section className="w-full max-w-5xl grid gap-10 lg:grid-cols-[1.2fr_1fr]">
                <div className="hidden lg:flex flex-col justify-center rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-gray-800/60 p-10 shadow-xl backdrop-blur">
                    <p className="text-sm uppercase tracking-[0.35em] text-gray-500 dark:text-gray-400 mb-4">
                        Join the community
                    </p>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white leading-tight mb-4">
                        Create a free account to save your cart, follow curated tracks, and access exclusive releases.
                    </h1>
                    <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                        Registration is quick. You’ll unlock a personalized dashboard with smarter recommendations tailored to the topics you care about.
                    </p>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 sm:p-10 border border-gray-100 dark:border-gray-700">
                    <div className="mb-8 text-center">
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                            Create your account
                        </h2>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                            Already have an account?{" "}
                            <Link to="/login" className="font-semibold text-blue-700 dark:text-blue-500 hover:underline">
                                Log in instead
                            </Link>
                        </p>
                    </div>

                    <form onSubmit={handleRegister} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Full name
                            </label>
                            <input
                                type="name"
                                id="name"
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                placeholder="Shubham Sarda"
                                required
                                autoComplete="off"
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Email address
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
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
                                type={showPassword ? "text" : "password"}
                                id="password"
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                required
                                placeholder='........'
                                minLength="7"
                            />

                            <button
                            type='button'
                            onClick={() => setShowPasswoed((prev) => !prev)}
                            className='absolute inset-y-0 right-3 flex items-center text-gray-500 cursor-pointer dark:text-gray-300'
                            >
                                {showPassword ? <IoMdEyeOff /> : <IoMdEye />}

                            </button>

                            </div>
                            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                                Use 7 or more characters with a mix of letters, numbers & symbols.
                            </p>
                        </div>

                        <button
                            type="submit"
                            className="w-full text-white cursor-pointer bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 transition-colors"
                        >
                            Register
                        </button>
                    </form>

                    <div className="mt-8 bg-gray-50 dark:bg-gray-700/60 border border-gray-100 dark:border-gray-600 rounded-xl p-4">
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                            By creating an account you agree to our <span className="font-medium text-blue-700 dark:text-blue-500">Terms of Service</span> and{" "}
                            <span className="font-medium text-blue-700 dark:text-blue-500">Privacy Policy</span>. We respect your inbox—no spam, ever.
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
};

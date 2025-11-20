import { FaGithub, FaInstagram, FaXTwitter, } from "react-icons/fa6";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-white shadow dark:bg-gray-800">
        <div className="p-4 mx-auto max-w-7xl md:flex md:items-center md:justify-between md:p-6">            
            <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© {new Date().getFullYear()} <Link to="/" className="hover:underline">CodeBook</Link>. All Rights Reserved.</span>
            <div className="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
                <Link to="/" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                    <FaInstagram />
                    <span className="sr-only">Instagram page</span>
                </Link>
                <Link to="/" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                <FaXTwitter />
                    <span className="sr-only">Twitter page</span>
                </Link>
                <Link to="/" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                    <FaGithub />
                    <span className="sr-only">GitHub account</span>
                </Link>
            </div>
        </div>
    </footer>
  )
}


import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useTitle } from "../Hooks/useTitle";
import { toast } from "react-toastify";
import { Rating } from "../Components";
import { useCart } from "../context";
import { IoMdAdd, IoMdArrowRoundBack } from "react-icons/io";
import { FaTrashAlt } from "react-icons/fa";
import { getProduct } from "../Services";


const ProductDetails = () => {

    const {cartList, addToCart, removeFromCart} = useCart()
    const [inCart, setInCart] = useState(false)
    const [product, setProduct] = useState({})
    const [error, setError] = useState("")
    const {id} = useParams()
    useTitle(product.name)
    const navigate = useNavigate()

    useEffect(() => {
        async function fetchProducts() {
            try {
                const data = await getProduct(id);
                setProduct(data);
                setError("");
            } catch (error) {
                setError(error.message);
                toast.error(error.message, {closeButton: true, position: "bottom-center"})
            }
        }
        fetchProducts()
    }, [id])

    useEffect(() => {
        const productInCart = cartList.find(item => item.id === product.id)

        if(productInCart){
            setInCart(true)
        }else{
            setInCart(false)
        }
    }, [cartList, product.id])

  return (
    <main>
        <section>
        {error ? (
            <p className="text-center text-red-600 dark:text-red-400 mt-10">{error}</p>
        ) : (
            <>

            <button className="cursor-pointer dark:text-gray-50 relative top-10 left-10">
                <IoMdArrowRoundBack onClick={() => navigate(-1)} size={28} />
            </button>
                <h1 className="mt-10 mb-5 text-4xl text-center font-bold text-gray-900 dark:text-slate-200">{product.name}</h1>

                <p className="mb-5 text-lg text-center text-gray-900 dark:text-slate-200">{product.overview}</p>

                <div className="flex flex-wrap justify-around">
                    <div className="max-w-xl my-3">
                        <img src={product.poster} className="rounded" alt={product.name} />
                    </div>

                    <div className="max-w-xl my-3">
                        <p className="text-3xl font-bold text-gray-900 dark:text-slate-200">
                            <span className="mr-1">$</span>
                            <span>{product.price}</span>
                        </p>

                        <p className="my-3">
                            <span>
                                <Rating rating={product.rating}/>
                            </span>
                        </p>

                        <p className="my-4 select-none">
                            {product.best_seller && 
                            <span className="font-semibold text-amber-500 border bg-amber-50 rounded-lg px-3 py-1 mr-2">
                                BEST_SELLER
                            </span>}

                            {product.in_stock && 
                            <span className="font-semibold text-emerald-500 border bg-slate-100 rounded-lg px-3 py-1 mr-2">
                                INSTOCK
                            </span>
                            }

                            {
                                !product.in_stock && 
                                <span className="font-semibold text-rose-700 border bg-slate-100 rounded-lg px-3 py-1 mr-2">
                                    OUT OF STOCK
                                </span>
                            }
                            <span className="font-semibold text-blue-500 border bg-slate-100 rounded-lg px-3 py-1 mr-2">
                                {product.size}
                            </span>

                        </p>

                        <p className="my-3">
                            {!inCart && 
                                <button onClick={() => addToCart(product)} className={`inline-flex items-center py-2 cursor-pointer px-5 text-lg font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 ${product.in_stock ? "" : "cursor-not-allowed"}`}
                                disabled={!product.in_stock}>
                                    Add To Cart
                                    <i className="ml-1">
                                        <IoMdAdd />
                                    </i>
                                </button>
                            }

                            {inCart && 
                                <button onClick={() => removeFromCart(product)} className={`inline-flex items-center py-2 cursor-pointer px-5 text-lg font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-800 ${product.in_stock ? "" : "cursor-not-allowed"}`}
                                disabled={!product.in_stock}>
                                    Remove Item 
                                    <i className="ml-1">
                                        <FaTrashAlt />
                                    </i>
                                </button>
                            }
                        </p>

                        <p className="text-lg text-gray-900 dark:text-slate-200">
                            {product.long_description}
                        </p>
                    </div>
                </div>
            </>
        )}
        </section>
    </main>
  )
}

export default ProductDetails

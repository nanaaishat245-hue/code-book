
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useTitle } from "../../Hooks/useTitle";
import { ProductCard } from "../../Components/Elements/ProductCard";
import { FilterBar } from "./Components/FilterBar";
import { toast } from "react-toastify";
import { useCart, useFilter } from "../../context";
import { getProductList } from "../../Services/productServices";
import { MdMenu } from "react-icons/md";

export const ProductList = () => {
    const {products, initialProductList} = useFilter()
    const [show, setShow] = useState(false)
    const [loading, setLoading] = useState(true)
    const search = useLocation().search
    const searchTerm = new URLSearchParams(search).get("q");
    useTitle("Explore eBook Collection")
    const { cartList, addToCart, removeFromCart } = useCart();

    useEffect(() => {
        async function fetchProducts() {
            try {
                setLoading(true);
                const data = await getProductList(searchTerm);
                initialProductList(data);
            } catch (error) {
                toast.error(error.message, {closeButton: true, position: "bottom-center"});
            } finally {
                setLoading(false);
            }
        }
        fetchProducts();
    }, [searchTerm]);

    return (
        <main>
            <section className="my-5">
                <div className="my-5 flex justify-between">
                    <span className="text-2xl font-semibold dark:text-slate-100 mb-5 pl-[60px]">
                        All eBooks ({products?.length || 0})
                    </span>
                    <span>
                        <button 
                            onClick={() => setShow(!show)} 
                            className="inline-flex items-center cursor-pointer rounded-md p-1 text-sm font-medium text-center text-gray-900 bg-gray-100 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700"
                        >
                            <MdMenu size={24} />
                        </button>
                    </span>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center min-h-[200px]">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                ) : (
                    <>
                        <div className="flex flex-wrap justify-center lg:flex-row">
                            {products?.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    cartList={cartList}
                                    addToCart={addToCart}
                                    removeFromCart={removeFromCart}
                                />
                            ))}
                        </div>
                        {!products?.length && (
                            <p className="text-center text-gray-500 dark:text-slate-300 mt-6">
                                No products match your search yet. Try a different keyword.
                            </p>
                        )}
                    </>
                )}
            </section>

            {show && <FilterBar setShow={setShow}/>}
        </main>
    );
};

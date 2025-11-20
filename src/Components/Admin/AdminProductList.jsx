import React, { useEffect, useState } from 'react'
import { getProductList } from '../../Services'
import AdminProductForm from './AdminProductForm'

const AdminProductList = () => {
     const [products, setProducts] = useState([])
     const [loading, setLoading] = useState(true)
     const [error, setError] = useState("")
     const [editingProduct, setEditingProduct] = useState(null)
     const [showForm, setShowForm] = useState(false)
     const [searchTerm, setSearchTerm] = useState("")
      
    
     const fetchProducts = async () => {
        try{
            setLoading(true);
            const data = await getProductList(searchTerm);
            setProducts(data)
        } catch(err) {
            setError(err.message) 
        } finally {
            setLoading(false)
        }
    }
        useEffect(() => {
            fetchProducts()
          }, [searchTerm])
  


     const handleEditProduct = (pr) => {
        setEditingProduct(null);
        setShowForm(true)
     }
             
        const handleAddProduct = () =>{
            setEditingProduct(null);
            setShowForm(true)
        }

        const handleFormSuccess = () => {
            setShowForm(false);
            setEditingProduct(null)
            fetchProducts()
        }

        const handleFormCancel = () => {
            setShowForm(false);
            setEditingProduct(null);
        }

        const handleSearch = (e) => {
            setSearchTerm(e.target.value)
        }

        if(showForm) {
            return(
                <AdminProductForm
                product={editingProduct}
                onSuccess={handleFormSuccess}
                onCancel={handleFormCancel}/>
            )
        }
    

  return (
   <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Manage Products</h2>
                <button
                    onClick={handleAddProduct}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                    Add New Product
                </button>
            </div>

            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="w-full max-w-md px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {error && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                    {error}
                </div>
            )}

            {loading ? (
                <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading products...</p>
                </div>
            ) : (
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Product
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Price
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Rating
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {products.map((product) => (
                                    <tr key={product.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <img
                                                    className="h-10 w-10 rounded-lg object-cover"
                                                    src={product.poster}
                                                    alt={product.name}
                                                    onError={(e) => {
                                                        e.target.src = 'https://via.placeholder.com/80x80.png?text=eBook';
                                                    }}
                                                />
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {product.name}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        {product.size} MB
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            ${product.price}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            ⭐ {product.rating}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex flex-col space-y-1">
                                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${product.in_stock
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-red-100 text-red-800'
                                                    }`}>
                                                    {product.in_stock ? 'In Stock' : 'Out of Stock'}
                                                </span>
                                                {product.best_seller && (
                                                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                                        Best Seller
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <button
                                                onClick={() => handleEditProduct(product)}
                                                className="text-blue-600 hover:text-blue-900 mr-3"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => window.open(`/products/${product.id}`, '_blank')}
                                                className="text-green-600 hover:text-green-900"
                                            >
                                                View
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {products.length === 0 && !loading && (
                        <div className="text-center py-8 text-gray-500">
                            No products found.
                        </div>
                    )}
                </div>
            )}
        </div>
  )
}

export default AdminProductList

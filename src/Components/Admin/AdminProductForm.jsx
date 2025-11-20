import React, { useState, useEffect } from 'react';
import adminService from '../../Services/adminService';

const AdminProductForm = ({ product = null, onSuccess, onCancel }) => {
    const [formData, setFormData] = useState({
        name: '',
        overview: '',
        long_description: '',
        price: '',
        rating: '',
        poster: '',
        size: '',
        inStock: true,
        bestSeller: false
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Initialize form with product data if editing
    useEffect(() => {
        if (product) {
            setFormData({
                name: product.name || '',
                overview: product.overview || '',
                long_description: product.long_description || '',
                price: product.price || '',
                rating: product.rating || '',
                poster: product.poster || '',
                size: product.size || '',
                inStock: product.in_stock ?? true,
                bestSeller: product.best_seller ?? false
            });
        }
    }, [product]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // Validate required fields
            const required = ['name', 'overview', 'long_description', 'price', 'rating', 'poster', 'size'];
            const missing = required.filter(field => !formData[field]);
            
            if (missing.length > 0) {
                throw new Error(`Missing required fields: ${missing.join(', ')}`);
            }

            // Validate rating
            const rating = parseFloat(formData.rating);
            if (rating < 0 || rating > 5) {
                throw new Error('Rating must be between 0 and 5');
            }

            const dataToSubmit = {
                ...formData,
                price: parseFloat(formData.price),
                rating: rating,
                size: parseFloat(formData.size)
            };

            if (product) {
                // Update existing product
                await adminService.updateEbook(product.id, dataToSubmit);
            } else {
                // Create new product
                await adminService.createEbook(dataToSubmit);
            }

            onSuccess();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
                {product ? 'Edit Product' : 'Add New Product'}
            </h2>
            
            {error && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Product Name *
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label htmlFor="overview" className="block text-sm font-medium text-gray-700 mb-1">
                        Overview *
                    </label>
                    <textarea
                        id="overview"
                        name="overview"
                        value={formData.overview}
                        onChange={handleInputChange}
                        required
                        rows="3"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label htmlFor="long_description" className="block text-sm font-medium text-gray-700 mb-1">
                        Long Description *
                    </label>
                    <textarea
                        id="long_description"
                        name="long_description"
                        value={formData.long_description}
                        onChange={handleInputChange}
                        required
                        rows="5"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                            Price ($) *
                        </label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={formData.price}
                            onChange={handleInputChange}
                            required
                            min="0"
                            step="0.01"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-1">
                            Rating (0-5) *
                        </label>
                        <input
                            type="number"
                            id="rating"
                            name="rating"
                            value={formData.rating}
                            onChange={handleInputChange}
                            required
                            min="0"
                            max="5"
                            step="0.1"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="poster" className="block text-sm font-medium text-gray-700 mb-1">
                            Poster URL *
                        </label>
                        <input
                            type="url"
                            id="poster"
                            name="poster"
                            value={formData.poster}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="size" className="block text-sm font-medium text-gray-700 mb-1">
                            Size (MB) *
                        </label>
                        <input
                            type="number"
                            id="size"
                            name="size"
                            value={formData.size}
                            onChange={handleInputChange}
                            required
                            min="0"
                            step="0.1"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                <div className="flex items-center space-x-6">
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            name="inStock"
                            checked={formData.inStock}
                            onChange={handleInputChange}
                            className="mr-2"
                        />
                        <span className="text-sm text-gray-700">In Stock</span>
                    </label>

                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            name="bestSeller"
                            checked={formData.bestSeller}
                            onChange={handleInputChange}
                            className="mr-2"
                        />
                        <span className="text-sm text-gray-700">Best Seller</span>
                    </label>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                    >
                        {loading ? 'Saving...' : (product ? 'Update Product' : 'Create Product')}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AdminProductForm;
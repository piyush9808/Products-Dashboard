import React, { useState, useEffect } from 'react';
import { fetchData } from './utils/api';
import SearchBar from './components/SearchBar';
import PriceFilter from './components/PriceFilter';
import PopularityFilter from './components/PopularityFilter';
import SortingOptions from './components/SortingOptions';
import ProductDetailModal from './components/ProductDetailModal';

const App = () => {
    const [allProducts, setAllProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedPriceRange, setSelectedPriceRange] = useState(null);
    const [selectedPopularityRange, setSelectedPopularityRange] = useState(null);
    const [sortBy, setSortBy] = useState('');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const products = await fetchData();
                setAllProducts(products);
                setFilteredProducts(products);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        loadProducts();
    }, []);

    useEffect(() => {
        let results = allProducts;

        if (searchQuery) {
            results = results.filter(product =>
                product.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (selectedPriceRange) {
            results = results.filter(product =>
                product.price >= selectedPriceRange.min && product.price <= selectedPriceRange.max
            );
        }

        if (selectedPopularityRange) {
            results = results.filter(product =>
                product.popularity >= selectedPopularityRange.min && product.popularity <= selectedPopularityRange.max
            );
        }

        if (sortBy) {
            const [key, order] = sortBy.split('-');
            results = results.sort((a, b) => {
                const aValue = key === 'price' ? a.price : a.popularity;
                const bValue = key === 'price' ? b.price : b.popularity;
                return order === 'asc' ? aValue - bValue : bValue - aValue;
            });
        }

        setFilteredProducts(results);
        setCurrentPage(1); // Reset to the first page when filters or sorting change
    }, [searchQuery, selectedPriceRange, selectedPopularityRange, sortBy, allProducts]);

    const handleProductClick = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedProduct(null);
    };

    if (loading) return <div className="text-center py-4">Loading...</div>;
    if (error) return <div className="text-center py-4 text-red-500">Error: {error.message}</div>;

    const indexOfLastProduct = currentPage * itemsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);


    const maxButtons = 10;
    let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
    let endPage = Math.min(totalPages, startPage + maxButtons - 1);

    if (endPage - startPage + 1 < maxButtons) {
        startPage = Math.max(1, endPage - maxButtons + 1);
    }


    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="container mx-auto px-4 py-6">
            <ProductDetailModal 
                isOpen={isModalOpen} 
                onRequestClose={closeModal} 
                product={selectedProduct} 
            />
            <h1 className="text-2xl font-bold mb-4">Products</h1>
            <SearchBar onSearch={setSearchQuery} />
            <div className="flex space-x-4 mb-6">
                <PriceFilter 
                    selectedPriceRange={selectedPriceRange} 
                    onPriceChange={setSelectedPriceRange} 
                />
                <PopularityFilter 
                    selectedPopularityRange={selectedPopularityRange} 
                    onPopularityChange={setSelectedPopularityRange} 
                />
                <SortingOptions 
                    sortBy={sortBy} 
                    onSortChange={setSortBy} 
                />
            </div>
            {Array.isArray(filteredProducts) && filteredProducts.length > 0 ? (
                <>
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                        <thead className="bg-gray-100 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-3 text-left text-gray-600 font-medium">Title</th>
                                <th className="px-6 py-3 text-left text-gray-600 font-medium">Price</th>
                                <th className="px-6 py-3 text-left text-gray-600 font-medium">Popularity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentProducts.map((product, index) => (
                                <tr 
                                    key={index} 
                                    className="border-b border-gray-200 cursor-pointer"
                                    onClick={() => handleProductClick(product)}
                                >
                                    <td className="px-6 py-4">{product.title}</td>
                                    <td className="px-6 py-4">{product.price}</td>
                                    <td className="px-6 py-4">{product.popularity}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="flex justify-between items-center mt-4">
                        <button 
                            onClick={() => handlePageChange(currentPage - 1)} 
                            disabled={currentPage === 1}
                            className={`px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
                        >
                            Previous
                        </button>
                        <div className="flex space-x-2">
                            {startPage > 1 && (
                                <>
                                    <button 
                                        onClick={() => handlePageChange(1)}
                                        className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300"
                                    >
                                        1
                                    </button>
                                    {startPage > 2 && <span className="px-4 py-2 text-gray-500">...</span>}
                                </>
                            )}
                            {Array.from({ length: endPage - startPage + 1 }, (_, i) => (
                                <button 
                                    key={startPage + i} 
                                    onClick={() => handlePageChange(startPage + i)}
                                    className={`px-4 py-2 rounded-lg ${currentPage === startPage + i ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-blue-400`}
                                >
                                    {startPage + i}
                                </button>
                            ))}
                            {endPage < totalPages && (
                                <>
                                    {endPage < totalPages - 1 && <span className="px-4 py-2 text-gray-500">...</span>}
                                    <button 
                                        onClick={() => handlePageChange(totalPages)}
                                        className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300"
                                    >
                                        {totalPages}
                                    </button>
                                </>
                            )}
                        </div>
                        <button 
                            onClick={() => handlePageChange(currentPage + 1)} 
                            disabled={currentPage === totalPages}
                            className={`px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
                        >
                            Next
                        </button>
                    </div>
                </>
            ) : (
                <div className="text-center py-4">No products available</div>
            )}
        </div>
    );
};

export default App;

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductsPage = () => {
    // State for storing products, pagination, and form inputs
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({ name: '', price: '' });
    const [editProduct, setEditProduct] = useState({ id: '', name: '', price: '' });
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState({ id: '', name: '', price: '', description: '' });
    const [searchedProducts, setSearchedProducts] = useState([]);

    // Fetch products with pagination and optional search filters
    const fetchProducts = async (page = 1, searchParams = {}) => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:3003/api/products`, {
                params: {
                    page,
                    ...searchParams
                },
                headers: { "Authorization" : `Bearer ${sessionStorage.getItem('token')}` }
            });
            setProducts(response.data.products);
            setTotalPages(response.data.totalPages);
            setCurrentPage(page);
        } catch (error) {
            console.error('Error fetching products', error);
        } finally {
            setLoading(false);
        }
    };

    // Handle the create product
    const handleCreateProduct = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3003/api/products', newProduct, { headers: {"Authorization" : `Bearer ${sessionStorage.getItem('token')}`} });
            setNewProduct({ name: '', price: '' });
            fetchProducts(currentPage); // Refresh the product list
        } catch (error) {
            console.error('Error creating product', error);
        }
    };

    // Handle the update product
    const handleUpdateProduct = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:3003/api/products/${editProduct.id}`, {
                name: editProduct.name,
                price: editProduct.price,
            }, { headers: {"Authorization" : `Bearer ${sessionStorage.getItem('token')}`} });
            setEditProduct({ id: '', name: '', price: '' });
            fetchProducts(currentPage); // Refresh the product list
        } catch (error) {
            console.error('Error updating product', error);
        }
    };

    // Handle delete product
    const handleDeleteProduct = async (id) => {
        try {
            console.log(id);
            const response = await axios.delete(`http://localhost:3003/api/products/${id}`, { headers: {"Authorization" : `Bearer ${sessionStorage.getItem('token')}`} });
            fetchProducts(currentPage); // Refresh the product list
        } catch (error) {
            console.error('Error deleting product', error);
        }
    };

    // Handle input change for create and update forms
    const handleInputChange = (e, type) => {
        const { name, value } = e.target;
        if (type === 'create') {
            setNewProduct({ ...newProduct, [name]: value });
        } else if (type === 'edit') {
            setEditProduct({ ...editProduct, [name]: value });
        } else if (type === 'search') {
            setSearch({ ...search, [name]: value });
        }
    };

    // Handle page change for pagination
    const handlePageChange = (page) => {
        fetchProducts(page, search);
    };

    // Handle search submit
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        handleSearchProduct(search)
        // fetchProducts(1, search); // Reset to page 1 with search filters
    };

    // Handle Search product
    const handleSearchProduct = async (search) => {
        try {
            console.log("sending search: " + search);
            const response = await axios.get(`http://localhost:3003/api/products/search`, {
                params: {
                    id: search.id,
                    name: search.name,
                    price: search.price,
                    description: search.description
                },
                headers: { "Authorization" : `Bearer ${sessionStorage.getItem('token')}` }
            });

            console.log(response);

            if (response.status >= 200 && response.status < 300) {
                console.log("Search found");
                console.log(response);
                setSearchedProducts(response.data.products);
            } else {
                console.log("Search failed");
            }
        } catch (error) {
            console.error('Error deleting product', error);
        }
    };

    useEffect(() => {
        fetchProducts(currentPage, search);
    }, [currentPage]);

    return (
        <div className="container">
            <h1>Products Management</h1>

            {/* Search Form */}
            <div className="form-container">
                <h2>Search Products</h2>
                <form onSubmit={handleSearchSubmit}>
                    <div className="form-group">
                        <label htmlFor="search-id">Product ID</label>
                        <input
                            type="text"
                            id="search-id"
                            name="id"
                            value={search.id}
                            onChange={(e) => handleInputChange(e, 'search')}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="search-name">Product Name</label>
                        <input
                            type="text"
                            id="search-name"
                            name="name"
                            value={search.name}
                            onChange={(e) => handleInputChange(e, 'search')}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="search-price">Price</label>
                        <input
                            type="number"
                            id="search-price"
                            name="price"
                            value={search.price}
                            onChange={(e) => handleInputChange(e, 'search')}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="search-description">Description</label>
                        <input
                            type="text"
                            id="search-description"
                            name="description"
                            value={search.description}
                            onChange={(e) => handleInputChange(e, 'search')}
                        />
                    </div>
                    <button type="submit" className="cta-button primary">Search</button>
                </form>
            </div>

            {/* Create Product Form */}
            <div className="form-container">
                <h2>Create New Product</h2>
                <form onSubmit={handleCreateProduct}>
                    <div className="form-group">
                        <label htmlFor="name">Product Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={newProduct.name}
                            onChange={(e) => handleInputChange(e, 'create')}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="price">Price</label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={newProduct.price}
                            onChange={(e) => handleInputChange(e, 'create')}
                            required
                        />
                    </div>
                    <button type="submit" className="cta-button primary">Create Product</button>
                </form>
            </div>

            {/* Edit Product Form */}
            {editProduct.id && (
                <div className="form-container">
                    <h2>Edit Product</h2>
                    <form onSubmit={handleUpdateProduct}>
                        <div className="form-group">
                            <label htmlFor="edit-name">Product Name</label>
                            <input
                                type="text"
                                id="edit-name"
                                name="name"
                                value={editProduct.name}
                                onChange={(e) => handleInputChange(e, 'edit')}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="edit-price">Price</label>
                            <input
                                type="number"
                                id="edit-price"
                                name="price"
                                value={editProduct.price}
                                onChange={(e) => handleInputChange(e, 'edit')}
                                required
                            />
                        </div>
                        <button type="submit" className="cta-button primary">Update Product</button>
                    </form>
                </div>
            )}
            {/* Searched Products Table */}
            <div className="products-table">
                <h2>Searched Product List</h2>
                {loading ? (
                    <p>Loading products...</p>
                ) : (
                    <table>
                        <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {searchedProducts.map((product) => (
                            <tr key={product._id}>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>
                                    <button onClick={() => setEditProduct(product)} className="cta-button secondary">Edit</button>
                                    <button onClick={() => handleDeleteProduct(product.id)} className="cta-button delete">Delete</button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Products Table */}
            <div className="products-table">
                <h2>Product List</h2>
                {loading ? (
                    <p>Loading products...</p>
                ) : (
                    <table>
                        <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {products.map((product) => (
                            <tr key={product._id}>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>
                                    <button onClick={() => setEditProduct(product)} className="cta-button secondary">Edit</button>
                                    <button onClick={() => handleDeleteProduct(product.id)} className="cta-button delete">Delete</button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Pagination */}
            <div className="pagination">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default ProductsPage;

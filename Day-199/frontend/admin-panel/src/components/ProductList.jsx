import React, { useEffect, useState } from 'react';
import { getProducts, deleteProduct } from '../services/api';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [limit, setLimit] = useState('');
  const [sort, setSort] = useState('');

  const fetchProducts = async () => {
    try {
      const params = {};
      if (limit) params.limit = limit;
      if (sort) params.sort = sort;
      const response = await getProducts(params);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [limit, sort]);

  return (
    <div>
      <h2>Product List</h2>
      <div>
        <label>
          Limit:
          <input
            type="number"
            value={limit}
            onChange={(e) => setLimit(e.target.value)}
            placeholder="Optional"
          />
        </label>
        <label>
          Sort by price:
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="">None</option>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </label>
        <button onClick={fetchProducts}>Refresh</button>
      </div>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <strong>{product.name}</strong> - {product.category} - ${product.price} - Stock: {product.stock}
            <button onClick={() => handleDelete(product.id)}>Delete</button>
            {/* For updating, you could implement an update form or modal */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;

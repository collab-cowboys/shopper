import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadAllProducts } from '../store/allProducts';
import { Link } from 'react-router-dom';
import AddToCart from './AddToCart';

const AllProducts = () => {
  const allProducts = useSelector((state) => state.allProducts);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadAllProducts());
  }, []);

  return (
    <div>
      <p className="subtitle">Check out our range of Grandroid® models:</p>
      <ul>
        {allProducts.map((product) => {
          return (
            <li key={product.id}>
              <Link to={`/products/${product.id}`}>
                <img src={product.imageUrl} />
                <p>The {product.name}</p>
              </Link>
              <p>${product.cost}</p>
              <AddToCart product={product} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default AllProducts;

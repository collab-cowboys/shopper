import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadAllProducts } from '../store/allProducts';

const AllProducts = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadAllProducts());
  }, []);

  return <div>ALL PRODUCTS PLACEHOLDER</div>;
};

export default AllProducts;

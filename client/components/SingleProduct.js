import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getSingleProduct } from '../store/singleProduct';

const SingleProduct = (props) => {
  let { name, age, gender, skills, cost, imageUrl, inStock } = useSelector(
    (state) => state.singleProduct
  );
  skills = skills || [];
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSingleProduct(props.match.params.id));
  }, []);

  return (
    <div>
      <img src={imageUrl} alt="photo" />
      <p>{name}</p>
      <p>
        {age}, {gender}
      </p>
      <p>Special skills: {skills.map((skill) => skill).join(', ')}</p>
      <p>${cost}</p>
      <p>{inStock} left in stock</p>
    </div>
  );
};

export default SingleProduct;

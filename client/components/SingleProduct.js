import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSingleProduct } from "../store/singleProduct";

const SingleProduct = (props) => {
  const { name, gender, imageUrl } = useSelector(
    (state) => state.singleProduct
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSingleProduct(props.match.params.id));
  }, []);

  return (
    <div>
      <img src={imageUrl} alt="photo" />
      <div>{name}</div>
      <div>{gender}</div>
    </div>
  );
};

export default SingleProduct;

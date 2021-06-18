import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getSingleProduct } from "../store/singleProduct";
import AddToCart from "./AddToCart";

const SingleProduct = (props) => {
  const product = useSelector((state) => state.singleProduct);
  let { name, age, gender, skills, cost, imageUrl, inStock } = product;
  skills = skills || [];
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSingleProduct(props.match.params.id));
  }, []);

  return (
    <div>
      <div>
        <img src={imageUrl} alt="photo" />
        <p>{name}</p>
        <p>
          {age}, {gender}
        </p>
        <p>Special skills: {skills.map((skill) => skill).join(", ")}</p>
        <p>${cost}</p>
        <p>{inStock} left in stock</p>
        <AddToCart product={product} quantity={1} />
      </div>
      <Link to="/products">&lt;&lt;&lt; Back</Link>
    </div>
  );
};

export default SingleProduct;

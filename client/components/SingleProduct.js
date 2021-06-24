import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getSingleProduct } from "../store/singleProduct";
import AddToCart from "./AddToCart";

const SingleProduct = (props) => {
  const product = useSelector((state) => state.singleProduct);
  let { name, age, skills, cost, imageUrl, inStock } = product;
  skills = skills || [];
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getSingleProduct(id));
  }, []);

  return (
    <div>
      <div>
        <img src={imageUrl} alt="photo" />
        <p>The {name}</p>
        <p>
          age: {age}
          <form>
            <div>
              <label>Role:</label>
              <select name="role" id="role">
                <option value="grandpa">Grandpa</option>
                <option value="grandma">Grandma</option>
                <option value="great uncle">Great Uncle</option>
                <option value="great aunt">Great Aunt</option>
                <option value="abuelo">Abuelo</option>
                <option value="abuela">Abuela</option>
                <option value="Tío abuelo">Tío abuelo</option>
                <option value="Tía abuela">Tía abuela</option>
              </select>
            </div>
          </form>
        </p>
        <p>Special skills: {skills.map((skill) => skill).join(", ")}</p>
        <p>${cost}</p>
        <p>{inStock} left in stock</p>
        <AddToCart product={product} />
      </div>
      <Link to="/products">&lt;&lt;&lt; Back</Link>
    </div>
  );
};

export default SingleProduct;

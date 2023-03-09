import { FunctionComponent, SetStateAction, useEffect, useState } from "react";
import Product from "../interfaces/Product";
import axios from "axios";
import Navbar from "./Navbar";
import { getProductsInCart } from "../services/cartsService";

interface CartProps {}

const Cart: FunctionComponent<CartProps> = () => {
  let [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const products = await getProductsInCart();
        setProducts(products);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  let getProducts2 = async () => {
    try {
      let userId: number = JSON.parse(
        sessionStorage.getItem("userData") as string
      ).userId;

      let cartRes = await axios.get(
        `${process.env.REACT_APP_API}/carts?userId=${userId}`
      );
      let productsIds: number[] = cartRes.data[0].products;

      const promiseArr = await Promise.all(
        productsIds.map((id) =>
          axios.get(`${process.env.REACT_APP_API}/products/${id}`)
        )
      );

      let products: Product[] = promiseArr.map((res) => res.data);
      console.log(products);

      setProducts(products);
    } catch (error) {
      console.log(error);
    }
  };

  let getProducts = async () => {
    try {
      let userId: number = JSON.parse(
        sessionStorage.getItem("userData") as string
      ).userId;

      let products: Product[] = [];
      let cartRes = await axios.get(
        `${process.env.REACT_APP_API}/carts?userId=${userId}`
      );
      let productsIds: number[] = cartRes.data[0].products;
      for (let id of productsIds) {
        let productRes = await axios.get(
          `http://localhost:8000/products/${id}`
        );
        products.push(productRes.data);
      }
      setProducts(products);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Navbar />
      {products.length ? (
        <div className="container">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Description</th>
                <th>Image</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product: Product) => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{product.category}</td>
                  <td>{product.price}</td>
                  <td>{product.description}</td>
                  <td>
                    <img src={product.image} style={{ width: "12rem" }} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center mt-3">No products</p>
      )}
    </>
  );
};

export default Cart;

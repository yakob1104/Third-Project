import { FunctionComponent, useEffect, useState } from "react";
import Product from "../interfaces/Product";
import { getProducts } from "../services/productsService";
import Navbar from "./Navbar";
import AddProductModal from "./AddProductModal";
import UpdateProductModal from "./UpdateProductModal";
import DeleteProductModal from "./DeleteProductModal";
import { addProductToCart } from "../services/cartsService";
import { successMsg } from "../services/feedbacks";

interface ProductsProps {}

const Products: FunctionComponent<ProductsProps> = () => {
  let [products, setProducts] = useState<Product[]>([]);
  let isAdmin: boolean =
    JSON.parse(sessionStorage.getItem("userData") as string).isAdmin == true
      ? true
      : false;
  let [openAddModal, setOpenAddModal] = useState<boolean>(false);
  let [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false);
  let [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  let [productId, setProductId] = useState<number>(0);
  let [productsChange, setProductsChange] = useState<boolean>(false);

  useEffect(() => {
    getProducts()
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, [productsChange]);

  let handleAddProduct = () => {
    setOpenAddModal(true);
  };

  let refresh = () => {
    setProductsChange(!productsChange);
  };

  return (
    <>
      <Navbar />
      <h5 className="display-5 text-center">OUR PRODUCTS</h5>
      {isAdmin && (
        <button className="btn btn-success" onClick={handleAddProduct}>
          <i className="fa-solid fa-plus"></i> Product
        </button>
      )}
      {products.length ? (
        <div className="container">
          <div className="row">
            {products.map((product: Product) => (
              <div
                key={product.id}
                className="card ms-1 col-md-4"
                style={{ width: "18rem" }}
              >
                <div className="card-header">{product.category}</div>
                <img
                  src={product.image}
                  className="card-img-top"
                  alt={product.name}
                  style={{ height: "100%" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">{product.description}</p>
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      addProductToCart(product.id as number)
                        .then(() =>
                          successMsg(`Product ${product.name} added to cart`)
                        )
                        .catch((err) => console.log(err));
                    }}
                  >
                  </button>
                  {isAdmin && (
                    <>
                      <button
                        className="btn btn-warning mx-2"
                        onClick={() => {
                          setOpenUpdateModal(true);
                          setProductId(product.id as number);
                        }}
                      >
                        <i className="fa-solid fa-pen-to-square"></i>
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          setOpenDeleteModal(true);
                          setProductId(product.id as number);
                        }}
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p></p>
      )}
      <AddProductModal
        show={openAddModal}
        onHide={() => setOpenAddModal(false)}
        refresh={refresh}
      />
      <UpdateProductModal
        show={openUpdateModal}
        onHide={() => setOpenUpdateModal(false)}
        productId={productId}
        refresh={refresh}
      />
      <DeleteProductModal
        show={openDeleteModal}
        onHide={() => setOpenDeleteModal(false)}
        productId={productId}
        refresh={refresh}
      />
    </>
  );
};

export default Products;

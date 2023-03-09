import { useFormik } from "formik";
import { FunctionComponent, useEffect } from "react";
import * as yup from "yup";
import Product from "../interfaces/Product";
import { addProduct } from "../services/productsService";
import { successMsg } from "../services/feedbacks";

interface AddProductProps {
  onHide: Function;
  refresh: Function;
}

const AddProduct: FunctionComponent<AddProductProps> = ({
  onHide,
  refresh,
}) => {
  let formik = useFormik({
    initialValues: {
      name: "",
      price: 0,
      category: "",
      description: "",
      image: "",
    },
    validationSchema: yup.object({
      name: yup.string().required().min(2),
      price: yup.number().required().min(0),
      category: yup.string().required().min(2),
      description: yup.string().required().min(2),
      image: yup.string().required().min(2),
    }),
    onSubmit: (values: Product) => {
      addProduct(values)
        .then(() => {
          onHide();
          successMsg("Card added successfully!");
          refresh();
        })
        .catch((err) => console.log(err));
    },
  });

  useEffect(() => {
    formik.setFieldValue("price", "");
  }, []);

  return (
    <div className="container mt-3 text-center">
      <form onSubmit={formik.handleSubmit}>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="nameInput"
            placeholder="product name"
            name="name"
            onChange={formik.handleChange}
            value={formik.values.name}
            onBlur={formik.handleBlur}
          />
          <label htmlFor="nameInput">Name</label>
          {formik.touched.name && formik.errors.name && (
            <p className="text-danger">{formik.errors.name}</p>
          )}
        </div>
        <div className="form-floating mb-3">
          <input
            type="number"
            className="form-control"
            id="priceInput"
            placeholder="1"
            name="price"
            onChange={formik.handleChange}
            value={formik.values.price}
            onBlur={formik.handleBlur}
          />
          <label htmlFor="priceInput">Net worth</label>
          {formik.touched.price && formik.errors.price && (
            <p className="text-danger">{formik.errors.price}</p>
          )}
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="categoryInput"
            placeholder="Desktops"
            name="category"
            onChange={formik.handleChange}
            value={formik.values.category}
            onBlur={formik.handleBlur}
          />
          <label htmlFor="categoryInput">Category</label>
          {formik.touched.category && formik.errors.category && (
            <p className="text-danger">{formik.errors.category}</p>
          )}
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="descriptionInput"
            placeholder="very good"
            name="description"
            onChange={formik.handleChange}
            value={formik.values.description}
            onBlur={formik.handleBlur}
          />
          <label htmlFor="descriptionInput">Description</label>
          {formik.touched.description && formik.errors.description && (
            <p className="text-danger">{formik.errors.description}</p>
          )}
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="imageInput"
            placeholder="..."
            name="image"
            onChange={formik.handleChange}
            value={formik.values.image}
            onBlur={formik.handleBlur}
          />
          <label htmlFor="imageInput">Image</label>
          {formik.touched.image && formik.errors.image && (
            <p className="text-danger">{formik.errors.image}</p>
          )}
        </div>
        <button
          type="submit"
          className="btn btn-success w-100 my-3"
          disabled={!formik.dirty || !formik.isValid}
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default AddProduct;

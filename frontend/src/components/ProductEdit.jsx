import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductById, updateProductData } from "../redux/feature/Product.jsx";
import { useParams, useNavigate } from "react-router-dom";
import styles from "../styles/productEdit.module.css";
import Spinner from "./Spinner.jsx";

function ProductEdit() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productId,loading, error, message } = useSelector((state) => state.product);
 

  useEffect(() => {
    dispatch(getProductById(id));
  }, [id, dispatch]);

  const productData = useRef({});
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const title = productData.current.title.value;
    const description = productData.current.description.value;
    const price = productData.current.price.value;
    const qty = productData.current.qty.value;
    const category = productData.current.category.value;

    await dispatch(
      updateProductData({
      id,
      product: { title, description, price, qty, category }
    }),
   
    );
    navigate(`/product/${id}`)
  };

  if (loading) return <p className={styles.loading}><Spinner/></p>;
    if (error) return <p className={styles.error}>{message || "Something went wrong"}</p>;
  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <h2 className={styles.heading}>Edit Product</h2>

      {productId?.image?.url && (
        <img
          src={productId.image.url}
          alt={productId.title}
          className={styles.image}
        />
      )}

      <label htmlFor="title" className={styles.label}>
        Title
      </label>
      <input
        id="title"
        defaultValue={productId?.title || ""}
        ref={(el) => (productData.current.title = el)}
        className={styles.input}
      />

      <label htmlFor="desc" className={styles.label}>
        Description
      </label>
      <textarea
        id="desc"
        defaultValue={productId?.description || ""}
        ref={(el) => (productData.current.description = el)}
        className={styles.textarea}
      />

      <label htmlFor="price" className={styles.label}>
        Price
      </label>
      <input
        type="number"
        id="price"
        defaultValue={productId?.price || ""}
        ref={(el) => (productData.current.price = el)}
        className={styles.input}
      />

      <label htmlFor="qty" className={styles.label}>
        Quantity
      </label>
      <input
        type="number"
        id="qty"
        defaultValue={productId?.qty || ""}
        ref={(el) => (productData.current.qty = el)}
        className={styles.input}
      />

      <label htmlFor="category" className={styles.label}>
        Category
      </label>
      <select
        id="category"
        defaultValue={productId?.category || ""}
        ref={(el) => (productData.current.category = el)}
        className={styles.select}
      >
        <option disabled value="">
          Select your category
        </option>
        <option value="Cloth">Cloth</option>
        <option value="Sport">Sport</option>
        <option value="Electronic">Electronic</option>
      </select>

      <button type="submit" className={styles.button}>
        Update Product
      </button>
    </form>
  );
}

export default ProductEdit;

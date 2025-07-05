import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductById,
  deleteProduct,
  getAllProduct,
} from "../redux/feature/Product.jsx";
import { addProductToCart } from "../redux/feature/Cart.jsx";
import { useParams, useNavigate } from "react-router-dom";
import styles from "../styles/productDetails.module.css";
import Spinner from "./Spinner.jsx";

function ProductList() {
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { productId, loading, error, message } = useSelector((state) => state.product);
  const { user } = useSelector((state) => state.user);
  

  useEffect(() => {
    dispatch(getProductById(id));
  }, [id, dispatch]);

  if (loading)
    return (
      <p className={styles.loading}>
        <Spinner />
      </p>
    );
  if (error)
    return <p className={styles.error}>{message || "Something went wrong"}</p>;

  let handleDelete = (id) => {
    dispatch(deleteProduct({ id }))
      .unwrap()
      .then(() => {
        dispatch(getAllProduct())
          .unwrap()
          .then(() => {
            navigate("/");
          })
          .catch((err) =>
            console.error("Fetching updated products failed:", err)
          );
      })
      .catch((err) => console.error("Delete failed:", err));
  };

  let handleAddQty=(e)=>{
    setQty(parseInt(e.target.value) || 1);
  }

  console.log(qty);
  let handleQty=()=>{
    dispatch(addProductToCart({id,qty: Number(qty)}))
     .unwrap()
          .then(() => {
            navigate("/cart");
  }).catch((err) =>
            console.error("Fetching cart products failed:", err)
          );
}

  return (
    <div className={styles.detailsContainer}>
      <button className={styles.backBtn} onClick={() => navigate("/")}>
        ← Back to Home
      </button>
      {productId && (
        <div className={styles.card}>
          <img
            src={productId.image?.url}
            alt={productId.title}
            className={styles.image}
          />
          <div className={styles.info}>
            <h2 className={styles.title}>{productId.title}</h2>
            <p className={styles.description}>{productId.description}</p>
            <p className={styles.price}>₹{productId.price}</p>
            <p className={styles.qty}>In Stock: {productId.qty}</p>
            <p className={styles.category}>Category: {productId.category}</p>

            <button className={styles.buy}>Buy</button>

            {/* Show comment icon for all users, just after Buy */}
            <span className={styles.commentWrapper}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className={styles.icon}
                title="Comment"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                />
              </svg>
              <span style={{ marginLeft: "50px" }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className={styles.icon}
                  title="Share"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
                  />
                </svg>
              </span>
            </span>

      
            {(user?.role === "admin" || user?._id === productId.userId) && (
              <div className={styles.btnGroup}>
                <button
                  className={styles.editBtn}
                  onClick={() => navigate(`/product/edit/${id}`)}
                >
                  Edit
                </button>
                <button
                  className={styles.deleteBtn}
                  onClick={() => handleDelete(id)}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
          <div style={{ marginBottom: "10px" }}>
            <span
            onClick={handleQty}
              className={styles.cartBtn}
              style={{ position: "relative", bottom: "12px", left: "9px" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={styles.icon}
                title="add to cart"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
            </span>

            <input
              type="number"
              id="qty"
              min="1"
              max={productId.qty}
              value={qty}
               onChange={handleAddQty}
              style={{
                width: "60px",
                Padding: "4px",
                borderRadius: "4px",
                border: "1px solid #ccc",
                position: "relative",
                left: "15px",
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductList;

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllCartProduct,placeOrder,deleteProductFromCart } from "../redux/feature/Cart";
import { getAllProduct } from "../redux/feature/Product.jsx";
import {  useNavigate } from "react-router-dom";

function Cart() {
  const dispatch = useDispatch();
  const navigate=useNavigate();

  useEffect(() => {
    dispatch(getAllCartProduct());
  }, [dispatch]);

  useEffect(()=>{
      dispatch(getAllProduct())
    },[dispatch])

  const cart = useSelector((state) => state.cart);
  const {product} = useSelector((state) => state.product);
  
  
  const cartItems = cart.item?.[0]?.items || [];
  const handlePlaceOrder = () => {
  const orderItems = cartItems
    .filter((item) => item.productId)
    .map((item) => ({
      productId: item.productId._id,
      qty: item.qty,
    }));

  if (orderItems.length === 0) {
    alert("No valid items to order.");
    return;
  }

  dispatch(placeOrder(orderItems))
    .unwrap()
    .then((res) => {
      alert("Order placed successfully!");
      console.log(res);
      navigate("/");
    })
    .catch((err) => {
      alert("Order failed: " + err.message);
      console.error(err);
    });
};

const handleRemove=(id)=>{
  dispatch(deleteProductFromCart (id))
    .unwrap()
    .then((res) => {
      console.log(res);
      navigate("/");
    })
    .catch((err) => {
      console.error(err);
    });
}
 

  return (
    <div className="container my-4">
      <div className="row">
        {/* Left Side - Cart Items */}
        <div className="col-md-8">
          <h2 className="mb-3">Shopping Cart</h2>

          {cartItems.length === 0 ? (
            <div className="alert alert-info">{ cart.meaasge}</div>
          ) : (
            cartItems.map((item) => (
              <div className="card mb-3" key={item._id}>
                <div className="row g-0 align-items-center">
                  {/* Product Image */}
                  <div className="col-md-3">
                    <img
                      src={item?.image?.url}
                      alt={item.title}
                      className="img-fluid rounded-start"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="col-md-6">
                    <div className="card-body">
                      <h5 className="card-title">{item.title}</h5>
                      <p className="card-text text-muted">{item.description}</p>
                      <p className="card-text mb-1">Quantity: {item.qty}</p>
                      <p className="card-text">Price: ₹{item.price}</p>
                    </div>
                  </div>

                  {/* Total and Remove */}
                  <div className="col-md-3 text-end pe-3">
                    <h6 className="text-success fw-bold">₹{item.totalAmount}</h6>
                    <button className="btn btn-outline-danger btn-sm mt-2" onClick={()=>handleRemove(item.productId._id)}>Remove</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Right Side - Summary */}
        <div className="col-md-4" style={{position:"relative",top:"53px"}}>
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">Price Details</h5>
            </div>
            <div className="card-body">
              <div className="d-flex justify-content-between mb-2">
                <span>Total Items</span>
                <span>{cartItems.length}</span>
              </div>
              <div className="d-flex justify-content-between fw-semibold">
                <span>Total Amount</span>
                <span>
                  ₹{cartItems.reduce((sum, item) => sum + item.totalAmount, 0)}
                </span>
              </div>
              <button className="btn btn-success w-100 mt-4" onClick={handlePlaceOrder} >Place Order</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;

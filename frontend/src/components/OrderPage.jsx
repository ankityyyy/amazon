// src/pages/OrderPage.jsx
import React,{useEffect} from "react";
import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllPlaceOrder } from "../redux/feature/Cart";
function OrderPage() {
let dispatch=useDispatch();
 const navigate = useNavigate();

useEffect(()=>{
dispatch(getAllPlaceOrder());
},[dispatch])


  const cart = useSelector((state) => state.cart);
  const cartItems = cart.order?.[0]?.order || [];
 
  const totalAmount = cartItems.reduce((sum, item) => sum + item.totalAmount, 0);

  return (
    <div className="container my-4">
      <div className="text-center mb-4">
        <h2 className="text-success">Order Placed Successfully!</h2>
        <p className="lead">Thank you for shopping with us.</p>
        <button className="btn btn-primary mt-2" onClick={() => navigate("/")}>
          Continue Shopping
        </button>
      </div>

      <h4 className="mb-3">Order Summary</h4>

      {cartItems.length === 0 ? (
        <div className="alert alert-info">No items in order.</div>
      ) : (
        cartItems.map((item) => (
          <div className="card mb-3" key={item._id}>
            <div className="row g-0 align-items-center">
              <div className="col-md-3">
                <img
                  src={item?.image?.url || "https://via.placeholder.com/150"}
                  alt={item.title}
                  className="img-fluid rounded-start"
                />
              </div>
              <div className="col-md-6">
                <div className="card-body">
                  <h5 className="card-title">{item.title}</h5>
                  <p className="card-text">{item.description}</p>
                  <p className="card-text mb-1">Quantity: {item.qty}</p>
                  <p className="card-text">Price: ₹{item.price}</p>
                </div>
              </div>
              <div className="col-md-3 text-end pe-3">
                <h6 className="text-success fw-bold">₹{item.totalAmount}</h6>
              </div>
            </div>
          </div>
        ))
      )}

      <div className="text-end fw-bold fs-5 mt-3">
        Total Paid: ₹{totalAmount}
      </div>
    </div>
  );
}

export default OrderPage;

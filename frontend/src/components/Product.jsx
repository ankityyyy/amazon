import React,{useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getAllProduct } from "../redux/feature/Product.jsx";
import { Link,useNavigate } from "react-router-dom";
import styles from "../styles/product.module.css";
import Spinner from './Spinner.jsx';


function Product() {
  // const product = [
  //   {
  //     _id: "1",
  //     name: "Cloth",
  //     media: ["/image/box1_image.jpg"],
  //   },
  //   {
  //     _id: "2",
  //     name: "Cloth",
  //     media: ["/image/box2_image.jpg"],
  //   },
  //   {
  //     _id: "3",
  //     name: "Cloth",
  //     media: ["/image/box3_image.jpg"],
  //   },
  //   {
  //     _id: "4",
  //     name: "Cloth",
  //     media: ["/image/box4_image.jpg"],
  //   },
  //   {
  //     _id: "5",
  //     name: "Sport",
  //     media: ["/image/box5_image.jpg"],
  //   },
  //   {
  //     _id: "6",
  //     name: "Sport",
  //     media: ["/image/box6_image.jpg"],
  //   },
  //   {
  //     _id: "7",
  //     name: "Sport",
  //     media: ["/image/box7_image.jpg"],
  //   },
  //   {
  //     _id: "8",
  //     name: "Sport",
  //     media: ["/image/box8_image.jpg"],
  //   },
  // ];
  
 
const {product,loading} = useSelector((state) => state.product);



  let dispatch=useDispatch();
  const navigate = useNavigate();

  useEffect(()=>{
    dispatch(getAllProduct())
  },[dispatch])
  

  return (
   <div className={styles.productGrid}>
  {loading && <Spinner/>}

  {product && product.map((item) => (
    <div className={styles.productCard} key={item._id}>
     
      <img
        src={item.image?.url}
        alt={item.title}
        className={styles.productImg}
      />
    
        <button className={styles.seeMoreBtn}  onClick={() => navigate(`/product/${item._id}`)}>See more</button>
      
    </div>
  ))}
</div>
  );
}

export default Product;

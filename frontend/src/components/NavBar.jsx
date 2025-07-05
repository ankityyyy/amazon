import React from "react";
import styles from "../styles/navBar.module.css";
import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
    <>
      <div className={styles.navbar}>
          <div className={styles.logo}></div>
          <div className={styles.address}>
            <p className={styles.addfirst}>Deliver to</p>
            <div className={styles.addicon}>
              <i className="fa-solid fa-location-dot"></i>
              <p className={styles.addsecond}>India</p>
            </div>
          </div>
          <div className={styles.navsearch}>
            <select className={styles.navselect}>
              <option value="">All</option>
            </select>
            <input
              type="text"
              placeholder="Search Amazon"
              className={styles.navinput}
            />
            <div className={styles.navicon}>
              <i className="fa-solid fa-magnifying-glass"></i>
            </div>
          </div>
          <div className={styles.navsigin}>
            <p className={styles.navsign1}>Hello,sign in </p>
            <p className={styles.navaccount}>Account & List</p>
          </div>
<Link to="/order" className="text-decoration-none">
          <div className={styles.navorder}>
            <p className={styles.navsign1}>Returns </p>

            <p className={styles.navaccount} > & Orders</p>
          </div>
          </Link>
          <Link to="/cart" className="text-decoration-none">
          <div className={styles.navcart}>
            <i className="fa-solid fa-cart-shopping nav"></i>

            <p> cart</p>
          </div>
          </Link>
     
      </div>
    </>
  );
}

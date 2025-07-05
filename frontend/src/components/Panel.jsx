import React from 'react'
import styles from "../styles/panel.module.css";

export default function Panel() {
  return (
    <>
    <div  className={styles.panel}>
        <div  className={styles.allapnel}>
            <i className="fa-solid fa-bars"></i>
            All
        </div>
        <div  className={styles.panelopt}>
            <p>Todoy's Deals</p>
            <p>Customer Service</p>
            <p> Register</p>
            <p>Gift Cards</p>
            <p>Sell</p>
           
        </div>
        <div  className={styles.paneldeal}>
            Shop deals in Electronics
        </div>
    </div>
    </>
  )
}

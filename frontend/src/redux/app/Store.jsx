import {configureStore} from '@reduxjs/toolkit'
import ProductSlice from "../feature/Product.jsx";
import userSlice from "../feature/User.jsx"
import cartProductSlice  from '../feature/Cart.jsx';

const Store=configureStore({
     reducer:{
product:ProductSlice,
user:userSlice,
cart:cartProductSlice
     }
})

export default Store;
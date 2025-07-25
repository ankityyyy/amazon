import NavBar from './components/NavBar.jsx'
import Panel from './components/Panel.jsx'
import Hero from './components/Hero.jsx'
import Product from './components/Product.jsx'
import ProductList from './components/ProductList.jsx'
import store from './redux/app/Store.jsx';
import SignUp from './components/SignUp.jsx'
import Login from './components/Login.jsx'
import Cart from './components/Cart.jsx'
import OrderPage from './components/OrderPage.jsx'
import { Provider } from 'react-redux'
import ProductEdit from './components/ProductEdit.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Footer from './components/Footer.jsx'
import ProtectedRoute from "./components/ProtectedRoute.jsx"


function App() {
 
  return (
    <>
     <Provider store={store}>
      
       <Routes>
        <Route 
            path="/signup" 
            element={
              <>
                <NavBar />
                 <Panel />
               <SignUp/>
               <Footer/>
              </>
            } 
          />

           <Route 
            path="/login" 
            element={
              <>
                <NavBar />
                 <Panel />
               <Login/>
               <Footer/>
              </>
            } 
          />


          <Route 
            path="/" 
            element={
               <ProtectedRoute>
              <>
                <NavBar />
                <Panel />
                <Hero />
                <Product />
                  <Footer/>
              </>
              </ProtectedRoute>
            } 
          />
         

          <Route 
            path="/product/:id" 
            element={
              <>
                <NavBar />
                <Panel />
                <Hero />
                <ProductList />
                  <Footer/>
              </>
            } 
          />

          <Route 
            path="/product/edit/:id" 
            element={
              <>
                <NavBar />
                <Panel />
            <Hero />
             
               <ProductEdit/>
                 <Footer/>
              </>
            } 
          /> 


           <Route 
            path="/cart" 
            element={
              <>
                <NavBar />
                <Panel /> 
             <Cart/>
               <Footer/>
              </>

              
            } 
          /> 

           <Route 
            path="/order" 
            element={
              <>
                <NavBar />
                <Panel />
                <OrderPage/>
                  <Footer/>
              </>

              
            } 
          /> 

        </Routes> 
      
    </Provider>
      
    </>
  )
}

export default App

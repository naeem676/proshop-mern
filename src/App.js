import Footer from "./components/Footer";
import './bootstrap.min.css'
import Header from "./components/Header";
import { Container } from "react-bootstrap";
import HomeScreen from "./components/HomeScreen";
import ProductScreen from "./components/ProductScreen";
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CartScreen from "./components/CartScreen";
import LoginScreen from "./components/LoginScreen";
import RegisterScreen from "./RegisterScreen";
import ProfileScreen from "./components/ProfileScreen";
import ShippingScreen from "./components/ShippingScreen";
import PaymentScreen from "./components/PaymentScreen";
import PlaceHolderScreen from "./components/PlaceHolderScreen";
import OrderScreen from "./components/OrderScreen";
import UsersListScreen from "./components/UsersListScreen";
import UserEditScreen from "./components/UserEditScreen";
import ProductListScreen from "./components/ProductListScreen";
import ProductEditScreen from "./components/ProductEditScreen";
import OrderListScreen from "./components/OrderListScreen";
 


function App() {
  return (
    <Router>
      
    <Header/>
    <main>
    <Container className='py-2'>
    <Switch>
      <Route exact path='/'>
         <HomeScreen/>
      </Route>
      <Route  path='/search/:keyword'>
         <HomeScreen/>
      </Route>
      <Route  path='/profile'>
         <ProfileScreen/>
      </Route>
      <Route  path='/login'>
         <LoginScreen/>
      </Route>
      <Route  path='/admin/product/:id/edit'>
         <ProductEditScreen/>
      </Route>
      <Route  path='/admin/user/:id/edit'>
         <UserEditScreen/>
      </Route>
      <Route  path='/admin/ordersList'>
         <OrderListScreen/>
      </Route>
      <Route  path='/admin/usersList'>
         <UsersListScreen/>
      </Route>
      <Route  path='/admin/productsList'>
         <ProductListScreen/>
      </Route>
      <Route  path='/order/:id'>
         <OrderScreen/>
      </Route>
      <Route  path='/placeholder'>
         <PlaceHolderScreen/>
      </Route>
      <Route  path='/payment'>
         <PaymentScreen/>
      </Route>
      <Route  path='/shipping'>
         <ShippingScreen/>
      </Route>
      <Route  path='/register'>
         <RegisterScreen/>
      </Route>
      <Route path='/product/:id'>
         <ProductScreen/>
      </Route>
      <Route path='/cart/:id?'>
         <CartScreen/>
      </Route>
      </Switch>
    </Container>
    </main>
      
      <Footer/>
      
    </Router>
  );
}

export default App;

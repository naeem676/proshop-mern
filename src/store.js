import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { productsListReducer } from './productsReducer';
import { productCreateReducer, productCreateReviewReducer, productDeleteReducer, productDetailsReducer, productTopRatedReducer, productUpdateReducer } from './productReducer';
import { cartReducer } from './cartReducer';
import { userDeleteReducer, userDetailsAdminReducer, userDetailsReducer, userLoginReducer, userRegisterReducer, usersListReducer, userUpdateReducer, userUpdateAdminReducer } from './userReducer';
import { createOrderReducer, myOrderReducer, orderDeliveredReducer, orderDetailsReducer, orderListReducer, orderPayReducer } from './components/orderReducer';

const reducer = combineReducers({
    productsList:productsListReducer,
    productDetails:productDetailsReducer,
    productDelete:productDeleteReducer,
    productUpdate:productUpdateReducer,
    productCreate:productCreateReducer,
    topRatedProducts:productTopRatedReducer,
    productCreateReview:productCreateReviewReducer,
    orderList:orderListReducer,
    cart:cartReducer,
    user:userLoginReducer,
    userRegister:userRegisterReducer,
    userDetails:userDetailsReducer,
    userUpdate:userUpdateReducer,
    orderCreate:createOrderReducer,
    orderDetails:orderDetailsReducer,
    orderDelivered:orderDeliveredReducer,
    orderPay:orderPayReducer,
    myOrder:myOrderReducer,
    usersList:usersListReducer,
    userDelete:userDeleteReducer,
    userPromo:userDetailsAdminReducer,
    userUpdateAdmin:userUpdateAdminReducer,
})

const cartItemsFromLocalStorage = 
localStorage.getItem('cartItems') ? 
JSON.parse(localStorage.getItem('cartItems')) : [];
const userFromLocalStorage = 
localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;
const shippingAddressFromLocalStorage = 
localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {};

const initialState ={
    cart:{ cartItems:cartItemsFromLocalStorage,
         shippingAdress: shippingAddressFromLocalStorage},
    user:{userInfo:userFromLocalStorage}
}

const middleware = [thunk]

const store = createStore(reducer, initialState, 
    composeWithDevTools(applyMiddleware(...middleware)))

    export default store;
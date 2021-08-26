
import axios from 'axios';
import { MY_ORDER_FAIL, MY_ORDER_REQUEST, MY_ORDER_SUCCESS, ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_DELIVERED_FAIL, ORDER_DELIVERED_REQUEST, ORDER_DELIVERED_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_LIST_FAIL, ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS, ORDER_PAY_FAIL, ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS } from '../components/orderConstents'
export const makeOrder = (order) => async (dispatch, getState)=>{
    try {
        dispatch({type:ORDER_CREATE_REQUEST})
        const {user:{userInfo}} = getState();
        const config = {
            headers:{'Content-Type':'Application/json',
            authorization:`Bearer ${userInfo.token}`
        },

        }
        const { data } = await axios.post('/api/order', order,
        config)
        dispatch({
            type:ORDER_CREATE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({type: ORDER_CREATE_FAIL, payload:error.response && error.response.data.message ? error.response.data.message : error.message})
    }
}

export const getOrderDetails = (orderId) => async (dispatch, getState)=>{
    try {
        dispatch({type:ORDER_DETAILS_REQUEST})
        const {user:{userInfo}} = getState();
        const config = {
            headers:{
                authorization:`Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/findOrder/${orderId}`,
        config)
        dispatch({
            type:ORDER_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({type: ORDER_DETAILS_FAIL, payload:error.response && error.response.data.message ? error.response.data.message : error.message})
    }
}


export const makePayOrder = (orderId, paymentResult) => async (dispatch, getState)=>{
    try {
        dispatch({type:ORDER_PAY_REQUEST})
        const {user:{userInfo}} = getState();
        const config = {
            headers:{
                'Content-Type':'Application/json',
                authorization:`Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(`/api/findOrder/${orderId}/pay`, paymentResult,
        config)
        dispatch({
            type:ORDER_PAY_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({type: ORDER_PAY_FAIL, payload:error.response && error.response.data.message ? error.response.data.message : error.message})
    }
}

export const getMyOrder = () => async (dispatch, getState)=>{
    try {
        dispatch({type:MY_ORDER_REQUEST})
        const {user:{userInfo}} = getState();
        const config = {
            headers:{
                authorization:`Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get('/api/order/myOrder',
        config)
        dispatch({
            type:MY_ORDER_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({type: MY_ORDER_FAIL, payload:error.response && error.response.data.message ? error.response.data.message : error.message})
    }
}

export const listOrder = () => async (dispatch, getState)=>{
    try {
        dispatch({type:ORDER_LIST_REQUEST})
        const {user:{userInfo}} = getState();
        const config = {
            headers:{
                authorization:`Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get('/api/orderList',
        config)
        dispatch({
            type:ORDER_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({type: ORDER_LIST_FAIL, payload:error.response && error.response.data.message ? error.response.data.message : error.message})
    }
}


export const updateOrderDelivered = (order) => async (dispatch, getState)=>{
    try {
        dispatch({type:ORDER_DELIVERED_REQUEST})
        const {user:{userInfo}} = getState();
        const config = {
            headers:{
                authorization:`Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(`/api/order/delivered/${order._id}`, {},
        config)
        dispatch({
            type:ORDER_DELIVERED_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({type: ORDER_DELIVERED_FAIL, payload:error.response && error.response.data.message ? error.response.data.message : error.message})
    }
}
import axios from "axios"
import { PRODUCT_CREATE_FAIL, PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_REVIEW_FAIL, PRODUCT_CREATE_REVIEW_REQUEST, PRODUCT_CREATE_REVIEW_SUCCESS, PRODUCT_CREATE_SUCCESS, PRODUCT_DELETE_FAIL, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_TOP_FAIL, PRODUCT_TOP_REQUEST, PRODUCT_TOP_SUCCESS, PRODUCT_UPDATE_FAIL, PRODUCT_UPDATE_REQUEST, PRODUCT_UPDATE_SUCCESS } from "../productContants"


export const listProducts = (keyword = '') => async(dispatch)=>{
    try {
        dispatch({type: PRODUCT_LIST_REQUEST})
        const { data } = await axios(`/api/products?keyword=${keyword}`)
        dispatch({type: PRODUCT_LIST_SUCCESS, payload: data})
    } catch (error) {
        dispatch({type: PRODUCT_LIST_FAIL, payload:error.response && error.response.data.message ? error.response.data.message : error.message})
    }
}

export const detailsProduct = (id) => async(dispatch)=>{
    try {
        dispatch({type: PRODUCT_DETAILS_REQUEST})
        const { data } = await axios(`/api/products/${id}`)
        dispatch({type: PRODUCT_DETAILS_SUCCESS, payload: data})
    } catch (error) {
        dispatch({type: PRODUCT_DETAILS_FAIL, payload:error.response && error.response.data.message ? error.response.data.message : error.message})
    }
}


export const deleteProduct = (id) => async (dispatch, getState)=>{
    try {
        dispatch({type:PRODUCT_DELETE_REQUEST})
        const {user:{userInfo}} = getState();
        const config = {
            headers:{
                authorization:`Bearer ${userInfo.token}`
            }
        }

         await axios.delete(`/api/product/delete/${id}`,config)
        dispatch({
            type:PRODUCT_DELETE_SUCCESS
            
        })
    } catch (error) {
        dispatch({type: PRODUCT_DELETE_FAIL, payload:error.response && error.response.data.message ? error.response.data.message : error.message})
    }
}


export const createProduct = () => async (dispatch, getState)=>{
    try {
        dispatch({type:PRODUCT_CREATE_REQUEST})
        const {user:{userInfo}} = getState();
        const config = {
            headers:{
                authorization:`Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(`/api/create/product`, {} , config)
        dispatch({
            type:PRODUCT_CREATE_SUCCESS,
            payload:data
            
        })
    } catch (error) {
        dispatch({type: PRODUCT_CREATE_FAIL, payload:error.response && error.response.data.message ? error.response.data.message : error.message})
    }
}


export const updateProduct = (product) => async (dispatch, getState)=>{
    try {
        dispatch({type:PRODUCT_UPDATE_REQUEST})
        const {user:{userInfo}} = getState();
        const config = {
            headers:{
                'Content-Type':'Application/json',
                authorization:`Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(`/api/update/product/${product._id}`, product , config)
        dispatch({
            type:PRODUCT_UPDATE_SUCCESS,
            payload:data
            
        })
    } catch (error) {
        dispatch({type: PRODUCT_UPDATE_FAIL, payload:error.response && error.response.data.message ? error.response.data.message : error.message})
    }
}

export const createReviewProduct = (productId, review) => async (dispatch, getState)=>{
    try {
        dispatch({type:PRODUCT_CREATE_REVIEW_REQUEST})
        const {user:{userInfo}} = getState();
        const config = {
            headers:{
                'Content-Type':'Application/json',
                authorization:`Bearer ${userInfo.token}`
            }
        }

        await axios.post(`/api/review/${productId}`, review , config)
        dispatch({
            type:PRODUCT_CREATE_REVIEW_SUCCESS
            
        })
    } catch (error) {
        dispatch({type: PRODUCT_CREATE_REVIEW_FAIL, payload:error.response && error.response.data.message ? error.response.data.message : error.message})
    }
}


export const listTopProducts = () => async(dispatch)=>{
    try {
        dispatch({type: PRODUCT_TOP_REQUEST})
        const { data } = await axios.get('/api/top')
        dispatch({type: PRODUCT_TOP_SUCCESS, payload: data})
    } catch (error) {
        dispatch({type: PRODUCT_TOP_FAIL, payload:error.response && error.response.data.message ? error.response.data.message : error.message})
    }
}
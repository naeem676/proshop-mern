import axios from "axios";
import { MY_ORDER_RESET } from "../components/orderConstents";
import { USER_DETAILS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_RESET, USER_DETAILS_SUCCESS, USER_LIST_FAIL, USER_LIST_REQUEST, USER_LIST_RESET, USER_LIST_SUCCESS, USER_LOGIN_FAIL, USER_LOGIN_OUT, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_UPDATE_FAIL, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_DELETE_REQUEST, USER_DELETE_SUCCESS, USER_DELETE_FAIL, USER_DETAILS_ADMIN_REQUEST, USER_DETAILS_ADMIN_SUCCESS, USER_DETAILS_ADMIN_FAIL, USER_UPDATE_BY_ADMIN_REQUEST, USER_UPDATE_BY_ADMIN_SUCCESS, USER_UPDATE_BY_ADMIN_FAIL } from "../userContants";

export const loginUser = (email, password) => async (dispatch)=>{
     try {
         dispatch({type:USER_LOGIN_REQUEST})
         const config = {
             headers:{'Content-Type':'Application/json'}
         }
         const { data } = await axios.post('/api/user/login', {
             email, password, config
         })
         dispatch({
             type:USER_LOGIN_SUCCESS,
             payload: data
         })

         localStorage.setItem('userInfo', JSON.stringify(data))

     } catch (error) {
        dispatch({type: USER_LOGIN_FAIL, payload:error.response && error.response.data.message ? error.response.data.message : error.message})
     }
}

export const logoutUser = () => (dispatch)=>{
    localStorage.removeItem('userInfo')
    dispatch({type:USER_LOGIN_OUT})
    dispatch({type:USER_DETAILS_RESET})
    dispatch({type:MY_ORDER_RESET})
    dispatch({type:USER_LIST_RESET})
}

export const register = (name, email, password) => async (dispatch)=>{
    try {
        dispatch({type:USER_REGISTER_REQUEST})
        const config = {
            headers:{'Content-Type':'Application/json'}
        }
        const { data } = await axios.post('/api/user', {
           name, email, password, config
        })
        dispatch({
            type:USER_REGISTER_SUCCESS,
            payload: data
        })
        dispatch({
            type:USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
       dispatch({type: USER_REGISTER_FAIL, payload:error.response && error.response.data.message ? error.response.data.message : error.message})
    }
}

export const details = () => async (dispatch, getState)=>{
    try {
        dispatch({type:USER_DETAILS_REQUEST})
        const {user:{userInfo}} = getState();
        const config = {
            headers:{'Content-Type':'Application/json',
            authorization:`Bearer ${userInfo.token}`
        },

        }
        const { data } = await axios.get('/api/profile', config)
        dispatch({
            type:USER_DETAILS_SUCCESS,
            payload: data
        })
       

    } catch (error) {
       dispatch({type: USER_DETAILS_FAIL, payload:error.response && error.response.data.message ? error.response.data.message : error.message})
    }
}


export const updateProfile = (user) => async (dispatch, getState)=>{
    try {
        dispatch({type:USER_UPDATE_REQUEST})
        const { user:{ userInfo } } = getState();
        const config = {
            headers:{'Content-Type':'Application/json',
            authorization:`Bearer ${userInfo.token}`
        },

        }
        const { data } = await axios.put('/api/update', user,
        config)
        dispatch({
            type:USER_UPDATE_SUCCESS,
            payload: data
        })
       

    } catch (error) {
       dispatch({type: USER_UPDATE_FAIL, payload:error.response && error.response.data.message ? error.response.data.message : error.message})
    }
}


export const usersListHandler = () => async (dispatch, getState)=>{
    try {
        dispatch({type:USER_LIST_REQUEST})
        const { user:{ userInfo } } = getState();
        const config = {
            headers:{
                authorization:`Bearer ${userInfo.token}`
            },
            
        }

        
        const { data } = await axios.get('/api/users', config)
        dispatch({
            type:USER_LIST_SUCCESS,
            payload: data
        })
       

    } catch (error) {
       dispatch({type: USER_LIST_FAIL, payload:error.response && error.response.data.message ? error.response.data.message : error.message})
    }
}

export const deleteUser = (id) => async (dispatch, getState)=>{
    try {
        dispatch({type:USER_DELETE_REQUEST})
        const { user:{ userInfo } } = getState();
        const config = {
            headers:{
                authorization:`Bearer ${userInfo.token}`
            },
            
        }

        
        await axios.delete(`/api/user/delete/${id}`, config)
        dispatch({
            type:USER_DELETE_SUCCESS
        })
       

    } catch (error) {
       dispatch({type: USER_DELETE_FAIL, payload:error.response && error.response.data.message ? error.response.data.message : error.message})
    }
}

export const getUserdetails = (id) => async (dispatch, getState)=>{
    try {
        dispatch({type:USER_DETAILS_ADMIN_REQUEST})
        const {user:{userInfo}} = getState();
        const config = {
            headers:{
            authorization:`Bearer ${userInfo.token}`
        },

        }
        const { data } = await axios.get(`/api/user/details/${id}`, config)
        dispatch({
            type:USER_DETAILS_ADMIN_SUCCESS,
            payload: data
        })
       

    } catch (error) {
       dispatch({type: USER_DETAILS_ADMIN_FAIL, payload:error.response && error.response.data.message ? error.response.data.message : error.message})
    }
}


export const updateUserByAdmin = (user) => async (dispatch, getState)=>{
    try {
        dispatch({type:USER_UPDATE_BY_ADMIN_REQUEST})
        const { user:{ userInfo } } = getState();
        const config = {
            headers:{
                'Content-Type':'Application/json',
                authorization:`Bearer ${userInfo.token}`
            },
            
        }

        
        const { data } = await axios.put(`/api/update/admin/${user._id}`, user, config)
        dispatch({
            type:USER_UPDATE_BY_ADMIN_SUCCESS
        })
        dispatch({
            type:USER_DETAILS_ADMIN_SUCCESS,
            payload: data
        })
       

    } catch (error) {
       dispatch({type: USER_UPDATE_BY_ADMIN_FAIL, payload:error.response && error.response.data.message ? error.response.data.message : error.message})
    }
}
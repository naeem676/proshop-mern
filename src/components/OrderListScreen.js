import React, { useEffect } from 'react'
import { Button, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { listOrder } from '../actions/orderAction';
import Message from './Message';

const OrderListScreen = () => {
    const dispatch = useDispatch();

   

    const orderList = useSelector(state => state.orderList)
    const { orders, loading, error} = orderList;
   
    const user = useSelector(state => state.user)
    const {userInfo} = user;

    useEffect(()=>{
       if(userInfo.isAdmin){
           dispatch(listOrder())
       }
       
    }, [dispatch, userInfo]);

    
    
    return (
        <>
        <h1>Order list</h1>
        {loading ? <h4>...loading</h4> : error ? <Message variant='danger'>{error}</Message> :
        <Table striped bordered hover responsive className='table-sm'>
            <thead>
                <tr>
                <th>Id</th>
                <th>USER</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
                </tr>
                </thead>
            
            <tbody>
                {orders?.map(order=>(
                    <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.user.name}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>$ {order.totalPrice}</td>
                    <td>{order.isPaid ? (
                        order.paidAlt.substring
                        (0, 10)) : (<i className='fas fa-times' style={{color:'red'}}></i>)
                    }</td>
                    <td>{order.isDelivered ? (
                        order.deliveredAlt.substring
                        (0, 10)) : (<i className='fas fa-times' style={{color:'red'}}></i>)}</td>
                   <td>
                       <LinkContainer
                        to={`/order/${order._id}`}>
                            <Button variant='light' className='btn-sm'>
                                details
                            </Button>
                        </LinkContainer>
                   </td>
                    
                </tr>

                ))}
                
            </tbody>
            
            
            </Table>}
     </>
    )
}

export default OrderListScreen

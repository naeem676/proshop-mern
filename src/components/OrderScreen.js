import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {  Button, Card, Col, Image, ListGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector} from 'react-redux'
import { Link, useHistory, useParams } from 'react-router-dom';
import { getOrderDetails, makePayOrder, updateOrderDelivered } from '../actions/orderAction';
import Message from './Message';
import { PayPalButton } from 'react-paypal-button-v2';
import { ORDER_DELIVERED_RESET, ORDER_PAY_RESET } from './orderConstents';

const OrderScreen = () => {
    const { id } = useParams();
    const [sdkReady, setSdkReady] = useState(false);
  
    const dispatch = useDispatch();
    const history = useHistory();

    const orderDetails = useSelector(state => state.orderDetails)
    const {order, loading, error} = orderDetails;

    const user = useSelector(state => state.user)
    const {userInfo} = user;
    const orderDelivered = useSelector(state => state.orderDelivered)
    const {success:successDelivered, loading:loadingDelivered, error:errorDelivered} = orderDelivered;
    
    const addDecimels = (num) =>{
        return Math.round((num * 100) / 100).toFixed(2)
     }
 
     const itemsPrice = addDecimels(order?.orderItems.reduce((acc, item)=> acc + item.qty * item.price, 0));
     const orderPay = useSelector(state => state.orderPay)
     const { loading:loadingPay, success:successPay} = orderPay;

     const successPaymentHandler = (paymentResult) =>{
        dispatch(makePayOrder(id, paymentResult))
   }

   const orderDeliveredHandler = ()=>{
       dispatch(updateOrderDelivered(order))
   }
     
    useEffect(()=>{
        if(!userInfo){
           history.push('/login')
        }
        
        const addPaypalScript = async ()=>{
             const { data : clientId} = await axios.get('/api/config/paypal')
             const script = document.createElement('script')
             script.type = 'text/javascript'
             script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
             script.async = true;
             script.onload = ()=>{
                 setSdkReady(true)
             }
             document.body.appendChild(script)
        }

        if(id){
            dispatch(getOrderDetails(id))
        }

        
        if(!order || successPay || successDelivered ){
            dispatch({type:ORDER_PAY_RESET})
            dispatch({type:ORDER_DELIVERED_RESET})
            
        }else if(!order.isPaid){
            if(!window.paypal){
                addPaypalScript()
            }else{
                setSdkReady(true)
            }

        }
       
    }, [dispatch, id, successPay, order, successDelivered, userInfo, history])
   
    return( loading ? '...Loading' : error ? <Message>{error}</Message> : <> <h1>{order?._id}</h1> 
     <Row>
          
        <Col md={8}>
            <ListGroup variant='flush'>
                <ListGroup.Item>
                    <h2>Shipping</h2>
                    <p>
                        <strong>Address:</strong>
                        {order?.shippingAddress.address},
                            {order?.shippingAddress.city},
                            {order?.shippingAddress.postalCode}, {order.shippingAddress?.country}
                    </p>
                    <p><strong>Name : </strong>{order?.user.name}</p>
                    <p><strong>Email : </strong> <a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
                    {order.isDelivered ? <Message variant='success'>{order.deliveredAlt}</Message> :
                    <Message variant='danger'>Not delivered</Message>} 
                </ListGroup.Item>
                <ListGroup.Item>
                    <h2>Payment Method</h2>
                    <p>
                        <strong>Method :</strong>
                        {order.paymentMethod}
                    </p>
                    {order.isPaid ? <Message variant='success'>{order?.paidAlt}</Message> :
                    <Message variant='danger'>Not paid</Message>} 

                </ListGroup.Item>
                <ListGroup.Item>
                    <h2>Order Item</h2>
                    {order.orderItems.length === 0 ? <Message variant='danger'>Your order is empty</Message> : (
                        <ListGroup variant='flush'>
                            {order.orderItems?.map((item)=>
                                <ListGroup.Item key={item?.product}>
                                    <Row>
                                        <Col md={1}>
                                            <Image 
                                            src={item?.image}
                                            fluid rounded
                                            />
                                        </Col>
                                        <Col>
                                        <Link 
                                        to={`/product/${item?.product}`}>{item?.name}</Link>
                                        </Col>
                                        <Col md={4}>
                                            {item?.qty} x {item?.price} = {item?.qty * item?.price}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                
                            )}
                        </ListGroup>
                    )}
                </ListGroup.Item>
                
            </ListGroup>

        </Col>
        <Col md={4}>
            <Card>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>Order Summery</h2>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Items
                            </Col>
                            <Col>$ {!loading && itemsPrice}</Col>
                        </Row>
                        <Row>
                            <Col>Shipping
                            </Col>
                            <Col>$ {order?.shippingPrice}</Col>
                        </Row>
                        <Row>
                            <Col>Tax
                            </Col>
                            <Col>$ {order?.taxPrice}</Col>
                        </Row>
                        <Row>
                            <Col>Total
                            </Col>
                            <Col>$ {order?.totalPrice}</Col>
                        </Row>
                    </ListGroup.Item>
                    {!order.isPaid &&(
                        <ListGroup.Item>
                            {
                                loadingPay && <h4>...loading</h4>
                            }
                            {!sdkReady ? <h4>...loading</h4> : <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler} />}
                        </ListGroup.Item>
                    )}
                    {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                        <ListGroup.Item>
                            <Button className='btn btn-block' onClick={orderDeliveredHandler}>
                                Mark as delivered
                            </Button>
                        </ListGroup.Item>
                    )}
                    {loadingDelivered && '...updating delivered' }{errorDelivered && <Message variant='danger'>
                        {errorDelivered}</Message>}
                </ListGroup>
                
            </Card>
        </Col>
    </Row>
 </>)
}

export default OrderScreen

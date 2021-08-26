import React, { useEffect } from 'react';
import { Button, Card, Col, Image, ListGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector} from 'react-redux'
import { Link, useHistory } from 'react-router-dom';
import { makeOrder } from '../actions/orderAction';
import CheckountSteps from './CheckountSteps';
import Message from './Message';

const PlaceHolderScreen = () => {
    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch();
    const history = useHistory();

    const addDecimels = (num) =>{
       return Math.round((num * 100) / 100).toFixed(2)
    }

    const itemsPrice = addDecimels(cart.cartItems?.reduce((acc, item)=> acc + item.qty * item.price, 0));
    const shippingPrice = addDecimels(itemsPrice > 100 ? 0 : 100);
    const taxPrice = addDecimels(Number((0.15 * itemsPrice).toFixed(2)));
    const totalPrice = addDecimels((Number(itemsPrice) + Number(shippingPrice) + Number(taxPrice)).toFixed(2));
    

    const placeOrderHandler = () =>{ 
        dispatch(makeOrder({
            orderItems:cart.cartItems, 
            shippingAddress:cart.shippingAddress,
            paymentMethod:cart.paymentMethod,
            itemsPrice,
            shippingPrice,
            taxPrice,
            totalPrice,

        }))
    }

    const orderCreate = useSelector(state => state.orderCreate)
    const {order, success, error} = orderCreate;
    useEffect(()=>{
        if(success){
            history.push(`/order/${order._id}`)
        }
    }, [success, history, order])
    
    return (
        <>
        <CheckountSteps step1 step2 step3 step4/>
        <Row>
            {error && <Message variant='danger'>{error}</Message>}
            <Col md={8}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>Shipping</h2>
                        <p>
                            <strong>Address:</strong>
                            {cart.shippingAddress?.address},
                             {cart.shippingAddress?.city},
                             {cart.shippingAddress?.postalCode}, {cart.shippingAddress?.country}
                        </p>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h2>Payment Method</h2>
                        <p>
                            <strong>Method :</strong>
                            {cart.paymentMethod}
                        </p>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h2>Order Item</h2>
                        {cart.cartItems.length === 0 ? <Message variant='danger'>Your Cart is empty</Message> : (
                            <ListGroup variant='flush'>
                                {cart.cartItems?.map((item)=>
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
                                <Col>$ {itemsPrice}</Col>
                            </Row>
                            <Row>
                                <Col>Shipping
                                </Col>
                                <Col>$ {shippingPrice}</Col>
                            </Row>
                            <Row>
                                <Col>Tax
                                </Col>
                                <Col>$ {taxPrice}</Col>
                            </Row>
                            <Row>
                                <Col>Total
                                </Col>
                                <Col>$ {totalPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button type='button' className='btn-block w-100'
                            disabled={cart.cartItems.length === 0} 
                            onClick={placeOrderHandler}
                            >Place Order</Button>
                        </ListGroup.Item>
                    </ListGroup>
                    
                </Card>
            </Col>
        </Row>
            
        </>
    )
}

export default PlaceHolderScreen

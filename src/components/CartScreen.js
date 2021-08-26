import React, { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import {Row, Col, ListGroup, Image, Button, Card, Form} from 'react-bootstrap'
import { Link, useHistory, useLocation, useParams } from 'react-router-dom';
import { addToCartHandler, removeFromCartItem } from '../actions/cartAction';
import Message from './Message'

const CartScreen = () => {
    const { id } = useParams();
    const location = useLocation();
   

    const qty = location.search ? Number(location.search.split('=')[1]) : 1;
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;
    
    useEffect(()=>{
        if(id){
            dispatch(addToCartHandler(id, qty))
        }
    }, [dispatch, id, qty])

    const removeFromCart = (productId) =>{
        dispatch(removeFromCartItem(productId))

    }
    const history = useHistory();
    const checkoutHandler = ()=>{
           history.push('/login?redirect=shipping')
           
    }
    
    return (
        <Row>
            <Col md={8}>
                 <h1>Shopping Cart</h1>
                 {cartItems.length === 0 ? <Message>Your Cart is empty <Link 
                 to='/'>
                 Go back</Link> </Message> : (
                      <ListGroup variant='flush'>
                          {cartItems.map(item => (
                              <ListGroup.Item key={item.product}>
                                <Row>
                                    <Col md={2}>
                                        <Image src={item.image} fluid rounded/>
                                    </Col>
                                    <Col md={3}>
                                        <Link to={`/product/${item.product}`}>
                                            {item.name}
                                        </Link>
                                    </Col>
                                    <Col md={2}>${item.price}</Col>
                                    <Col md={2}>
                                        <Form.Control as='select' value={item.qty}
                                        onChange={e=> dispatch(addToCartHandler(item.product, Number(e.target.value)))} >
                                          {[...Array(item.countInStock).keys()]
                                          .map(x =>(
                                             <option key={x + 1} value={x + 1}>
                                                 {x + 1}
                                             </option> 
                                          ))}  
                                        </Form.Control>
                                    </Col>
                                    <Col md={2}>
                                        <Button type='button' variant='light'
                                        onClick={()=>removeFromCart(item.product)}>
                                            <i className='fas fa-trash'></i>
                                        </Button>
                                    </Col>
                                </Row>
                              </ListGroup.Item>
                          ))}
                      </ListGroup>
                 )}
                 
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Subtotal ({cartItems.reduce((acc, item)=> acc + item.qty, 0)})
                            items</h2>
                            {cartItems.reduce((acc, item)=> acc + item.qty * item.price, 0).toFixed(2)}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button type='button' className='btn-block w-100' disabled={cartItems.length === 0}
                            onClick={checkoutHandler} >Processed to Checkout</Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    )
}

export default CartScreen;
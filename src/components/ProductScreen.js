import React, { useEffect, useState } from 'react'
import { Link, useHistory, useParams  } from 'react-router-dom'
import {Col, Row, Image, Card, ListGroup, Button, Form } from 'react-bootstrap';
import Rating from './Rating';
import { useDispatch, useSelector } from 'react-redux'
import { createReviewProduct, detailsProduct } from '../actions/productsAction';
import Loader from './Loader';
import Message from './Message';
import { PRODUCT_CREATE_REVIEW_RESET } from '../productContants';


const ProductScreen = () => {
    const [qty, setQty] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    let { id } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const productDetails = useSelector(state=> state.productDetails);
    const {loading, error, product} = productDetails
    const user = useSelector(state=> state.user);
    const {userInfo} = user;
    const productCreateReview = useSelector(state=> state.productCreateReview);
    const {loading:loadingReview, error:errorReview, success:successReview} = productCreateReview;


    
   
    useEffect(()=>{
        if(successReview){
            alert('Review submitted')
            setRating(0)
            setComment('')
            dispatch({type:PRODUCT_CREATE_REVIEW_RESET})

        }
      dispatch(detailsProduct(id))
    }, [dispatch, id, successReview])

    const addToCart = () =>{
      history.push(`/cart/${id}?qty=${qty}`)
    }
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createReviewProduct(id, {
            rating,
            comment
        }))
    }
    
    
    
    return (
        <>
           <Link to='/'>Go back</Link>
           {loading ? <Loader/> : error ? <Message>No DetailsProduct</Message> :<> <Row>
               <Col md={6}>
                <Image src={product.image} fluid/>
               </Col>
               <Col md={3}>
                   <ListGroup variant='flush' >
                       <ListGroup.Item>
                           <h3>{product.name}</h3>
                       </ListGroup.Item>
                       <ListGroup.Item>
                           <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                       </ListGroup.Item>
                       <ListGroup.Item>
                           Price: ${product.price}
                       </ListGroup.Item>
                       <ListGroup.Item>
                           Description: {product.description}
                       </ListGroup.Item>
                   </ListGroup>
               </Col>
               <Col>
                   <Card>
                   <ListGroup variant='flush'>
                         <ListGroup.Item>
                             <Row>
                                 <Col>Price</Col>
                                 <Col><strong>${product.price}</strong></Col>
                             </Row>
                             <Row>
                                 <Col>Status</Col>
                                 <Col>{product.countInStock > 0 ? 'In stock' : 'out of stock'}</Col>
                             </Row>
                         </ListGroup.Item>
                         {
                             product.countInStock > 0 && 
                             <ListGroup.Item>
                                 <Row>
                                     <Col>Qty</Col>
                                     <Col>
                                     <Form.Control as='select' value={qty}
                                     onChange={(e) => setQty(e.target.value)} >
                                       { [...Array(product.countInStock).keys()].map(x => <option key={x + 1} value={x + 1}  >{x + 1}</option>)}
                                         </Form.Control> </Col>
                                </Row>  
                             </ListGroup.Item>
                         }
                         <ListGroup.Item>
                             <Button className='btn-block w-100'
                             type='button' onClick={addToCart} disabled={product.countInStock === 0} >Add to Cart</Button>
                         </ListGroup.Item>
                   </ListGroup>
                   </Card>
               </Col>
           </Row>
           <Row>
               <Col md={6}>
                   <h2>Review</h2>
                   {
                       product.reviews.length === 0 && <Message>No review</Message>
                   }
                   <ListGroup variant='flush'>
                       {product.reviews.map(review => (
                           <ListGroup.Item key={review._id}>
                               <strong>{review.name}</strong>
                               <Rating value={review.rating}/>
                               <p>{review.createdAt.substring(0, 10)}</p>
                               <p>{review.comment}</p>
                           </ListGroup.Item>
                       ))}
                       <ListGroup.Item>
                           <h2>Write a Customer review</h2>
                           {loadingReview && '...loading'}
                           { errorReview && <Message variant='danger'>{errorReview}</Message>}
                           {userInfo ? (
                               <Form onSubmit={submitHandler}>
                                   <Form.Group controlId='rating'>
                                       <Form.Label>Rating</Form.Label>
                                       <Form.Control as='select' value={rating}
                                       onChange={e=> setRating(e.target.value)}>
                                           <option value="">...select</option>
                                           <option value="1">1 - Poor</option>
                                           <option value="2">2 - Fair</option>
                                           <option value="3">3 - Good</option>
                                           <option value="4">4 - Very Good</option>
                                           <option value="5">5 - Excellent</option>

                                       </Form.Control>

                                   </Form.Group>
                                   <Form.Group controlId='comment'>
                                       <Form.Label>Comment</Form.Label>
                                       <Form.Control as='textarea' row='3' value={comment}
                                       onChange={e=> 
                                        setComment(e.target.value)}>
                                     
                                       </Form.Control>

                                   </Form.Group>
                                   <Button className='mt-2' type='submit' variant='primary'>Submit</Button>
                               </Form>
                           ) : (<Message>
                           Please <Link to='/login'>sign in</Link> to write a review {' '}
                           </Message>) }
                       </ListGroup.Item>
                   </ListGroup>
               </Col>
           </Row>
            </> }
           
        </>
    )
}

export default ProductScreen

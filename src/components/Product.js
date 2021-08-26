import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from './Rating'

const Product = ({ product }) => {
    return (
       
            <Card className='m-3 p-3 rounded'>
                <Link to={`/product/${product._id}`}>
                <Card.Img src={product.image}/>
                </Link>
                <Card.Body>
                    <Link to={`/product/${product._id}`}>
                        <Card.Title  as='div'>
                            <p><strong>{product.name}</strong></p>
                        </Card.Title>
                        </Link>
                        <Card.Text as='div'>
                             <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                        </Card.Text>

                        <Card.Text as='p'>
                          $ {product.price}
                        </Card.Text>


                    
                </Card.Body>
            </Card>
       
    )
}



export default Product;

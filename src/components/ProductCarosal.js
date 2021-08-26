import React, { useEffect } from 'react'
import { Carousel, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { listTopProducts } from '../actions/productsAction'
import Message from './Message'

const ProductCarosal = () => {
    const dispatch = useDispatch()
    const topRatedProducts = useSelector(state => state.topRatedProducts)
    const { loading, error, products} = topRatedProducts;
    useEffect(()=>{
        dispatch(listTopProducts())
    }, [dispatch])
    return loading ? '...loading' : error ? <Message variant='danger'>{error}</Message> : 
    <Carousel pause='hover' className='bg-dark'>
        {products?.map(product => 
            <Carousel.Item key={product._id}>
                <Link to={`/product/${product._id}`}>
                    <Image src={product.image} alt={product.name} fluid/>
                    
                    <Carousel.Caption className='carousel-caption'>
                        <h2>{product.name} ({product.price})</h2>
                    </Carousel.Caption>
                    </Link>
            </Carousel.Item>)}
    </Carousel>
}

export default ProductCarosal

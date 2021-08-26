
import React, { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Product from './Product';
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productsAction';
import Loader from './Loader';
import Message from './Message';
import { useParams } from 'react-router-dom';
import ProductCarosal from './ProductCarosal';

const HomeScreen = () => {
    const { keyword } = useParams()
    
    const dispatch = useDispatch();
     const productsList = useSelector(state => state.productsList)
     const {loading, error, products} = productsList;
    useEffect(()=>{
        dispatch(listProducts(keyword))
    }, [dispatch, keyword])

  
    
    return (
        <>
        {!keyword && <ProductCarosal/>
        }
            <Container>
                <h1>Latest products</h1>
                { loading ? <Loader/> : error ? <Message>Products Not Found</Message> :
                 <Row>
                {products?.map(product => 
                
                            <Col sm={12} md={6} lg={4} xl={3} key={product._id} >
                        <Product  
                        product={product} />
                        </Col>
                    )}
                </Row>}
                
                
            </Container>
        </>
    )
}

export default HomeScreen

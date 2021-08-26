import React, { useEffect } from 'react'
import { Button, Col, Row, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { useHistory } from 'react-router-dom';
import { createProduct, deleteProduct, listProducts } from '../actions/productsAction';
import { PRODUCT_CREATE_RESET } from '../productContants';
import Message from './Message';

const ProductListScreen = () => {
    const dispatch = useDispatch();

    const history = useHistory();
    const productsList = useSelector(state => state.productsList)
     const {loading, error, products} = productsList;
     const productDelete = useSelector(state => state.productDelete)
     const {loading:loadingDelete, error:errorDelete, success:successDelete} = productDelete;
     const productCreate = useSelector(state => state.productCreate)
     const {loading:loadingCreate, error:errorCreate, success:successCreate, product:productMake} = productCreate;
    const user = useSelector(state => state.user)
    const {userInfo} = user;

    useEffect(()=>{
         dispatch({type:PRODUCT_CREATE_RESET})
        
        if(!userInfo.isAdmin){
            history.push('/login')
        }
        if(successCreate){
            history.push(`/admin/product/${productMake._id}/edit`)
        }else{
            dispatch(listProducts())
        }
       
         
    }, [dispatch,  history, userInfo, successDelete, successCreate, productMake]);
    const createProductHandler = ()=>{
        dispatch(createProduct())
    }

    const deleteHandler = (id) => {
        if(window.confirm('Are you sure')){
            dispatch(deleteProduct(id))
           
        }
        
    }
    
    return (
        <>
        <Row className='align-items-center'>
            <Col>
            <h1>Products</h1> 
            </Col>
            <Col className='float-lg-right'>
            <Button className='my-3' onClick={createProductHandler}>
                <i className='fas fa-plus'></i> Create Product
            </Button>
            </Col>
        </Row>
        {loadingCreate && <h4>...loading</h4>}
        {loadingDelete && <h4>...loading</h4>}
        {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
        {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
        {loading ? <h4>...loading</h4> : error ? <Message variant='danger'>{error}</Message> :
        <Table striped bordered hover responsive className='table-sm'>
            <thead>
                <tr>
                <th>id</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
                </tr>
                </thead>
            
            <tbody>
                {products?.map(product=>(
                    <tr key={product._id}>
                    <td>{product._id}</td>
                    <td>{product.name}</td>
                    <td>$ {product.price}</td>
                    <td>{product.category}</td>
                    <td>{product.brand}</td>
                   <td>
                       <LinkContainer
                        to={`/admin/product/${product._id}/edit`}>
                            <Button variant='light' className='btn-sm'>
                                <i className='fas fa-edit'></i>
                            </Button>
                        </LinkContainer>
                        <Button variant='light' className='btn-sm' onClick={()=>( deleteHandler(product._id))}>
                                <i className='fas fa-trash' style={{color:'red'}}></i>
                            </Button>
                   </td>
                    
                </tr>

                ))}
                
            </tbody>
            
            
            </Table>}
     </>
    )
}

export default ProductListScreen

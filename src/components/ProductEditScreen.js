import React, { useState, useEffect} from 'react';
import { Link, useHistory,  useParams } from 'react-router-dom';
import { Form, Button} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from './FormContainer';
import Message from './Message';
import { detailsProduct, updateProduct } from '../actions/productsAction';
import { PRODUCT_UPDATE_RESET } from '../productContants';
import axios from 'axios';

const ProductEditScreen = () => {
    const { id } = useParams();
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [brand, setBrand] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [image, setImage] = useState('')
    const [uploading, setUploading] = useState(false)

    
    const history = useHistory();
    const dispatch = useDispatch();
    const productDetails = useSelector(state => state.productDetails)
    const { loading, product , error} = productDetails;
    const productUpdate = useSelector(state => state.productUpdate)
    const { loading:loadingUpdate, success:successUpdate, error:errorUpdate} = productUpdate;
    useEffect(()=>{
        if(successUpdate){
            dispatch({type:PRODUCT_UPDATE_RESET})
            history.push('/admin/productsList')
        } else{
            if(!product.name || product._id !== id){
                dispatch(detailsProduct(id))
            } else {
                setName(product.name)
                setPrice(product.price)
                setBrand(product.brand)
                setDescription(product.description)
                setCategory(product.category)
                setCountInStock(product.countInStock)
                setImage(product.image)
            }

        }
      
    } ,[dispatch, product, id, successUpdate, history])

     const uploadFileHandler = async(e)=>{
           const file = e.target.files[0]
           const formData = new FormData()
           formData.append('image', file)
           setUploading(true)

           try {
               const config = {
                   headers:{
                       'Content-Type':'multipart/form-data'
                   }
               }
               const { data } = await axios.post('/api/upload', formData, config)
               setImage(data)
               setUploading(false)
           } catch (error) {
               setUploading(false)
           }
     }

    const submitHandler = (e) => {
      e.preventDefault()
      dispatch(updateProduct({
          _id:id,
          name, brand, category, price, countInStock, description, image
      }))
     
    }
    return (
        <>
        <Link to='/admin/usersList' className='btn btn-light my-3'>Go back</Link> 
        <FormContainer>
            <h1>Edit User</h1>
            {loadingUpdate && <h4>...loadingUpdate</h4>}
            {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
            {loading ? <h4>loading.....</h4> : error ? <Message variant='danger'>{error}</Message> : 
             <Form onSubmit={submitHandler}>
             <Form.Group controlId='name'>
                     <Form.Label>Your Name</Form.Label>
                     <Form.Control 
                     type='text'
                     placeholder='Enter your name'
                     value={name}
                     onChange={(e)=> setName(e.target.value)}
                     ></Form.Control>
                 </Form.Group>
                 <Form.Group controlId='price'>
                     <Form.Label>Product Price</Form.Label>
                     <Form.Control 
                     type='number'
                     placeholder='Product price'
                     value={price}
                     onChange={(e)=> setPrice(e.target.value)}
                     ></Form.Control>
                 </Form.Group>
                 <Form.Group controlId='brand'>
                     <Form.Label>Product brand</Form.Label>
                     <Form.Control 
                     type='text'
                     placeholder='Product brand'
                     value={brand}
                     onChange={(e)=> setBrand(e.target.value)}
                     ></Form.Control>
                 </Form.Group>
                 <Form.Group controlId='description'>
                     <Form.Label>Product Description</Form.Label>
                     <Form.Control 
                     type='text'
                     placeholder='Product description'
                     value={description}
                     onChange={(e)=> setDescription(e.target.value)}
                     ></Form.Control>
                 </Form.Group>
                 <Form.Group controlId='category'>
                     <Form.Label>Product Category</Form.Label>
                     <Form.Control 
                     type='text'
                     placeholder='Product category'
                     value={category}
                     onChange={(e)=> setCategory(e.target.value)}
                     ></Form.Control>
                 </Form.Group>
                 <Form.Group controlId='countInStock'>
                     <Form.Label>Product CountInStock</Form.Label>
                     <Form.Control 
                     type='text'
                     placeholder='Product countInStock'
                     value={countInStock}
                     onChange={(e)=> setCountInStock(e.target.value)}
                     ></Form.Control>
                 </Form.Group>
                 <Form.Group controlId='image'>
                     <Form.Label>Product Image</Form.Label>
                     <Form.Control 
                     type='text'
                     placeholder='Product image'
                     value={image}
                     onChange={(e)=> setImage(e.target.value)}
                     ></Form.Control>
                     <Form.File
                     id='image-file'
                     label='choose file'
                     custom
                     onChange={uploadFileHandler}></Form.File>
                     {uploading && '...loading'}
                 </Form.Group>
 
                 <Button className='mt-2' type='submit' variant='primary'>
                     Update Product
                 </Button>
             </Form>}
        </FormContainer>
        </>
        
    )
}

export default ProductEditScreen

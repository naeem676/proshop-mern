import React, { useState} from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Button} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from './FormContainer';
import { saveShippingAddress } from '../actions/cartAction';
import CheckountSteps from './CheckountSteps';


const ShippingScreen = () =>{
    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch();
    const { shippingAddress } = cart;
    const [address, setAddress] = useState(shippingAddress?.address)
    const [city, setCity] = useState(shippingAddress?.city)
    const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode);
    const [country, setCountry] = useState(shippingAddress?.country);
    const history = useHistory();
   
    
    const submitHandle = () => {
        dispatch(saveShippingAddress({ address, city, postalCode, country }));
        history.push('/payment')
    }
    return(
        <>
        <CheckountSteps step1 step2 />
    <FormContainer>
        
        <h1>Shipping</h1>
       <Form onSubmit={submitHandle}>
       <Form.Group controlId='address'>
                    <Form.Label>Your Address</Form.Label>
                    <Form.Control 
                    type='text'
                    placeholder='Enter your address'
                    value={address}
                    onChange={(e)=> setAddress(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId='city'>
                    <Form.Label>Your City</Form.Label>
                    <Form.Control 
                    type='text'
                    placeholder='Enter your city'
                    value={city}
                    onChange={(e)=> setCity(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='postalCode'>
                    <Form.Label>Your postalCode</Form.Label>
                    <Form.Control 
                    type='text'
                    placeholder='Enter your postalCode'
                    value={postalCode}
                    onChange={(e)=> setPostalCode(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId='country'>
                    <Form.Label>Your Country</Form.Label>
                    <Form.Control 
                    type='text'
                    placeholder='Enter your country'
                    value={country}
                    onChange={(e)=> setCountry(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Button className='mt-2' type='submit' variant='primary'>
                    Continue
                </Button>
       </Form>
    </FormContainer>
    </>

    )
}
export default ShippingScreen;
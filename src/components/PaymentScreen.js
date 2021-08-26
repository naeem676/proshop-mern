import React, { useState} from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Button, Col} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from './FormContainer';

import CheckountSteps from './CheckountSteps';
import { savePayemnt } from '../actions/cartAction';


const PaymentScreen = () =>{
    const cart = useSelector(state => state.cart);
    const { shippingAddress} = cart;
    
    const dispatch = useDispatch();
    
    const history = useHistory();
    if(!shippingAddress){
        history.push('/shipping')
    }

    const [paymentMethod, setPaymentMethod] = useState('Paypal')
   
    
    const submitHandle = (e) => {
        e.preventDefault();
        dispatch(savePayemnt(paymentMethod))
        history.push('/placeholder')
      
    }
    return(
        <>
        <CheckountSteps step1 step2  step3/>
    <FormContainer>
        
        <h1>Payment Method</h1>
       <Form onSubmit={submitHandle}>
           <Form.Group>
               <Form.Label as='legend'>Select Method</Form.Label>
           
           <Col className='m-4'>
                <Form.Check
                type='radio'
                label='Paypal or Credit Card'
                id='Paypal'
                name='paymentMethod'
                value='Paypal'
                checked
                onChange={e=> setPaymentMethod(e.target.value)}
                ></Form.Check>
                <Form.Check
                type='radio'
                label='Stripe'
                id='Stripe'
                name='paymentMethod'
                value='Stripe'
                onChange={e=> setPaymentMethod(e.target.value)}
                ></Form.Check>

           </Col>
           </Form.Group>
        
          <Button type='submit' variant='primary'>Continue</Button>
       </Form>
    </FormContainer>
    </>

    )
}
export default PaymentScreen;
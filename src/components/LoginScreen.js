import React, { useState, useEffect} from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { Form, Button, Row, Col} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from './Message';
import { loginUser } from '../actions/userAction';
import FormContainer from './FormContainer';

const LoginScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const location = useLocation();
    const history = useHistory();
    const redirect = location.search ? location.search.split('=')[1] : '/';
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const {loading, error, userInfo} = user;
    useEffect(()=>{
        if(userInfo){
            history.push(redirect)
        }
    } ,[history, redirect, userInfo])
    const submitHandler = (e) => {
      e.preventDefault()
      dispatch(loginUser(email, password))
    }
    return (
        <FormContainer>
            <h1>Sign In</h1>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <h4>loading.....</h4>}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control 
                    type='email'
                    placeholder='Enter email'
                    value={email}
                    onChange={(e)=> setEmail(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                    type='password'
                    placeholder='Enter password'
                    value={password}
                    onChange={(e)=> setPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>


                <Button className='mt-2' type='submit' variant='primary'>
                    Sign In
                </Button>
            </Form>
            <Row className='py-3'>
                <Col>
                New Customer ? {' '}
                <Link to={redirect ?
                     `/register?redirect=${redirect}` : '/register'}>Sign Up</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default LoginScreen

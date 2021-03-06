import React, { useState, useEffect} from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { Form, Button, Row, Col} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { register } from './actions/userAction';
import FormContainer from './components/FormContainer';
import Message from './components/Message';

const RegisterScreen = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);
    const location = useLocation();
    const history = useHistory();
    const redirect = location.search ? location.search.split('=')[1] : '/';
    const userRegister = useSelector(state => state.userRegister);
    const dispatch = useDispatch();
    const {loading, error, userInfo} = userRegister;
    useEffect(()=>{
        if(userInfo){
            history.push(redirect)
        }
    } ,[history, redirect, userInfo])
    const submitHandler = (e) => {
      e.preventDefault()
      if(password !== confirmPassword){
          setMessage("Doesn't match your password")
      }else {
        dispatch(register(name, email, password))
      }
      
    }
    return (
        <FormContainer>
            <h1>Sign Up</h1>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <h4>loading.....</h4>}
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
                <Form.Group controlId='ConfirmPassword'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control 
                    type='password'
                    placeholder='Enter confirm password'
                    value={confirmPassword}
                    onChange={(e)=> setConfirmPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                  {message && <Message variant='danger'>{message}</Message>}

                <Button className='mt-2' type='submit' variant='primary'>
                    Sign Up
                </Button>
            </Form>
            <Row className='py-3'>
                <Col>
                You have already account ? {' '}
                <Link to={redirect ?
                     `/login?redirect=${redirect}` : '/login'}>Log In</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default RegisterScreen

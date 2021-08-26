import React, { useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Button, Row, Col, Table} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { details, updateProfile } from '../actions/userAction';
import { LinkContainer } from 'react-router-bootstrap';
import Message from './Message';
import { getMyOrder } from '../actions/orderAction';

const ProfileScreen = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);
   
    const history = useHistory();
   
    const userDetails = useSelector(state => state.userDetails);
    const dispatch = useDispatch();
    const {loading, error, user} = userDetails;
    const userLogin = useSelector(state => state.user);
    const {userInfo} = userLogin;
    const userUpdate = useSelector(state => state.userUpdate)
    const {success} = userUpdate; 
    const myOrder = useSelector(state => state.myOrder)
    const {loading:myLoading, error:myError, orders} = myOrder; 
    
    useEffect(()=>{
        if(!userInfo){
            history.push('/login')
        } else {
            if(!user.name){
                dispatch(details())
                dispatch(getMyOrder())
            }else{
                setName(user.name)
                setEmail(user.email)
             
            }
        }
    } ,[history, userInfo, dispatch, user, userUpdate])
    const submitHandler = (e) => {
      e.preventDefault()
      if(password !== confirmPassword){
          setMessage("Doesn't match your password")
      }else{
          dispatch(updateProfile({id:user._id, name, email, password}))
      }
      
    }
    return (
        
           <Row>
               <Col md={3}>
               
               <h2>Update Profile</h2>
            {error && <Message variant='danger'>{error}</Message>}
            {success && <Message variant='success'>Profiel Updated</Message>}
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
                    Update
                </Button>
            </Form>
            
               </Col>
              
               <Col md={9}>
                   <h2>My Order</h2>
                   {myLoading ? '...loading': myError ? <Message variant='danger'>{myError}</Message> : <Table striped bordered hover responsive className='table-sm'>
                       <thead>
                            <tr>
                                <th>ID</th>
                                <th>TOTAL</th>
                                <th>PAID</th>
                                <th>DELIVERED</th>
                            </tr>
                       </thead>
                       <tbody>
                         {orders?.map(order =>(
                             <tr key={order?._id}>
                                 <td>{order?._id}</td>
                                 <td>{order?.totalPrice}</td>
                                 <td>{order.isPaid ? order.paidAlt.substring(0, 10):(
                                     <i className='fas fa-times' style={{color:'red'}}></i>
                                 )}</td>
                                 <td>{order.isDelivered ? order.deliveredAlt.substring(0, 10):(
                                     <i className='fas fa-times' style={{color:'red'}}></i>
                                 )}</td>
                                 <td>
                                     <LinkContainer to={`/order/${order._id}`}>
                                         <Button variant='light' className='btn-sm'>Details</Button>
                                     </LinkContainer>
                                 </td>
                             </tr>
                         ) )}  
                       </tbody>
                       </Table>}
               </Col>
           </Row>
            
        
    )
}

export default ProfileScreen

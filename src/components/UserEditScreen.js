import React, { useState, useEffect} from 'react';
import { Link, useHistory,  useParams } from 'react-router-dom';
import { Form, Button} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from './FormContainer';
import Message from './Message';
import { getUserdetails, updateUserByAdmin } from '../actions/userAction';
import { USER_UPDATE_BY_ADMIN_RESET } from '../userContants';

const UserEditScreen = () => {
    const { id } = useParams();
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false);
    const history = useHistory();
    const dispatch = useDispatch();
    const userPromo = useSelector(state => state.userPromo);
    const {loading, error, user} = userPromo;
    const userUpdateAdmin = useSelector(state => state.userUpdateAdmin);
    const {loading:loadingUpdate, error:errorUpdate, success} = userUpdateAdmin;
    useEffect(()=>{
        if(success){
            dispatch({type:USER_UPDATE_BY_ADMIN_RESET})
            history.push('/admin/usersList')
        } else{
            if(!user.name || user._id !== id){
                dispatch(getUserdetails(id))
            } else {
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }
        }
      
    } ,[dispatch, user, id, success, history])
    const submitHandler = (e) => {
      e.preventDefault()
      dispatch(updateUserByAdmin({
          _id:id,
          name, email, isAdmin

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
                 <Form.Group controlId='email'>
                     <Form.Label>Email Address</Form.Label>
                     <Form.Control 
                     type='email'
                     placeholder='Enter email'
                     value={email}
                     onChange={(e)=> setEmail(e.target.value)}
                     ></Form.Control>
                 </Form.Group>
                 <Form.Group controlId='isAdmin'>
                     
                     <Form.Check 
                     type='checkbox'
                     label='Is Admin'
                     checked={isAdmin}
                     onChange={(e)=> setIsAdmin(e.target.checked)}
                     ></Form.Check>
                 </Form.Group>
 
                 <Button className='mt-2' type='submit' variant='primary'>
                     Update User
                 </Button>
             </Form>}
        </FormContainer>
        </>
        
    )
}

export default UserEditScreen

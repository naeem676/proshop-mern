import React, { useEffect } from 'react'
import { Button, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { useHistory } from 'react-router-dom';
import { usersListHandler, deleteUser } from '../actions/userAction';
import Message from './Message';

const UsersListScreen = () => {
    const dispatch = useDispatch();

    const history = useHistory();

    const usersList = useSelector(state => state.usersList)
    const {users, error, loading} = usersList;
    const user = useSelector(state => state.user)
    const {userInfo} = user;
    const userDelete = useSelector(state => state.userDelete)
    const {success:successDelete} = userDelete
    useEffect(()=>{
        if(userInfo && userInfo.isAdmin){
            dispatch(usersListHandler())
        }else{
            history.push('/login')

        }
         
    }, [dispatch, userInfo, history, successDelete])

    const deleteHandler = (id) => {
        if(window.confirm('Are you sure')){
            dispatch(deleteUser(id))
        }
        
    }
    return (
        <>
           <h1>Users</h1> 
           {loading ? <h4>...loading</h4> : error ? <Message variant='danger'>{error}</Message> :
           <Table striped bordered hover responsive className='table-sm'>
               <thead>
                   <tr>
                   <th>id</th>
                   <th>NAME</th>
                   <th>EMAIL</th>
                   <th>ADMIN</th>
                   <th></th>
                   </tr>
                   </thead>
               
               <tbody>
                   {users?.map(user=>(
                       <tr key={user._id}>
                       <td>{user._id}</td>
                       <td>{user.name}</td>
                       <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                       <td>{user.isAdmin ? (<i className='fas fa-check' style={{color:'green'}}></i>) :
                      <i className='fas fa-times' style={{color:'red'}}></i> }</td>
                      <td>
                          <LinkContainer
                           to={`/admin/user/${user._id}/edit`}>
                               <Button variant='light' className='btn-sm'>
                                   <i className='fas fa-edit'></i>
                               </Button>
                           </LinkContainer>
                           <Button variant='light' className='btn-sm' onClick={()=>( deleteHandler(user._id))}>
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

export default UsersListScreen

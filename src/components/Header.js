import React from 'react'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector} from 'react-redux';
import { logoutUser } from '../actions/userAction';
import { Route } from 'react-router-dom';
import SearchBox from './SearchBox';



const Header = () => {
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const { userInfo } = user;
    const logout = () =>{
       dispatch(logoutUser())
    }
   
    
    return (
        <header>
            <Navbar bg="dark" variant="dark" collapseOnSelect>
                <Container>
               <LinkContainer to='/'>
                <Navbar.Brand>Proshop</Navbar.Brand>
                </LinkContainer>
                <Route render={({history})=><SearchBox history={history}/>} />
                <Nav className="ml-auto">
                
                <LinkContainer to='/cart'>
                <Nav.Link> <i className='fas fa-shopping-cart'></i> Cart</Nav.Link>
                </LinkContainer>
                {userInfo ?
                <NavDropdown title={userInfo.name} id='userInfo'>
                    <LinkContainer to='/profile'>
                        <NavDropdown.Item>
                            Profile
                        </NavDropdown.Item>
                        </LinkContainer>
                        <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                    
                </NavDropdown>
                 :
                 <LinkContainer to='/login'>
                 <Nav.Link href="#features"> <i className='fas fa-user'></i> Sing in</Nav.Link></LinkContainer>}
                 {userInfo && userInfo.isAdmin && (
                     <NavDropdown title='admin' id='adminMenu'>
                     <LinkContainer to='/admin/usersList'>
                         <NavDropdown.Item>
                            UsersList
                         </NavDropdown.Item>
                         </LinkContainer>
                         <LinkContainer to='/admin/productsList'>
                         <NavDropdown.Item>
                            productsList
                         </NavDropdown.Item>
                         </LinkContainer>
                         <LinkContainer to='/admin/ordersList'>
                         <NavDropdown.Item>
                            ordersList
                         </NavDropdown.Item>
                         </LinkContainer>
                         
                     
                 </NavDropdown>
                 )}
               
                </Nav>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header


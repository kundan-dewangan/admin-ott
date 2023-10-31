import React from 'react'
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Link, useNavigate } from 'react-router-dom';

function Header() {
    const navigate = useNavigate()
    const logoutHandle = () => {
        localStorage.clear()
        navigate('/login')
    }
    return (
        <Navbar bg="dark" data-bs-theme="dark">
            <Container>
                <Navbar.Brand href="#home">Pinmbo</Navbar.Brand>
                <Nav className="me-auto">
                    <Link to="/app/user-list" className='nav-link'>User List</Link>
                    <Link to="/app/add-category" className='nav-link'>Add Category</Link>
                    <Link to="/app/category-list" className='nav-link'>Category List</Link>
                    <Link to="/app/add-video" className='nav-link'>Add Video</Link>
                    <Link to="/app/video-list" className='nav-link'>Video List</Link>
                </Nav>
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text> Signed in as: <span className='text-white'>Admin</span></Navbar.Text>
                    <Button className='btn-secondary btn btn-sm mx-2' onClick={logoutHandle}>Logout</Button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header
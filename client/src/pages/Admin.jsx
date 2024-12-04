import Table from 'react-bootstrap/Table';
import axios from 'axios'
import { Button, Modal } from 'react-bootstrap'
import React, { useEffect, useState } from 'react';
import EditUser from './EditUser';

const Admin = () => {
    const [users, setUsers] = useState([])
    const [show, setShow] = useState(false);
    const [blogs, setBlogs] = useState([]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const token = localStorage.getItem('token')
    const getUsers = async () => {

        try {
            const response = await axios.get('http://localhost:5000/api/admin/users', { headers: { authorization: `Bearer ${token}` } })
            setUsers(response.data)

        } catch (error) {
            console.log(error)
        }
    }


    const fetchBlogs = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/blogs/');
            setBlogs(response.data);

        } catch (error) {
            console.error('Failed to fetch blogs:', error);
        }
    };

    useEffect(() => {
        getUsers()
        fetchBlogs()
    }, [])

    const remove = async (id) => {
        const user = await axios.delete(`http://localhost:5000/api/admin/users/${id}`, { headers: { authorization: `Bearer ${token}` } })
        getUsers()
    }


    const removeBlog = async(id) =>{
        const user = await axios.delete(`http://localhost:5000/api/blogs/${id}`, { headers: { authorization: `Bearer ${token}` } })
        fetchBlogs()
    }

    return (
        <div className="container">
            <h2>Admin Dashboard</h2>


            <section>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>User Name</th>
                            <th>User Email</th>
                            <th colSpan={2}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>


                        {
                            users.map((items, index) => {
                                return (
                                    <tr key={items._id}>
                                        <td>{index + 1}</td>
                                        <td>{items.name}</td>
                                        <td>{items.email}</td>
                                        <td><Button variant={'outline-primary'} onClick={handleShow}>Edit</Button></td>
                                        <td><Button variant={'outline-primary'} onClick={() => { remove(items._id) }}>Delete</Button></td>
                                    </tr>
                                )
                            })
                        }


                    </tbody>
                </Table>
            </section>


            <section>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Blog Title</th>
                            <th>Content</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            blogs.map((items,index) => {
                                return (
                                    <tr key={items._id}>
                                        <td>{index + 1}</td>
                                        <td>{items.title.slice(0,10)}</td>
                                        <td>{items.content.slice(0,10)}</td>
                                        <td><Button variant={'outline-danger'} onClick={()=>{removeBlog(items._id)}}>Delete</Button></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
            </section>



            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Update User </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <EditUser />
                </Modal.Body>

            </Modal>
        </div>
    );
};

export default Admin;

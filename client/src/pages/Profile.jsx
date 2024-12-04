import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import BlogDetails from './BlogDetails';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [blogs, setBlogs] = useState([])
    const [toggle,setToggle] = useState(false)
    
    const navigate = useNavigate();


    const token = localStorage.getItem('token')
    const getUserProfile = async () => {
        const response = await axios.get('http://localhost:5000/api/users/profile', { headers: { Authorization: `Bearer ${token}` } })
        setUser(response.data)
    }


    const getUserBlogs = async () => {
        const response = await axios.get('http://localhost:5000/api/blogs/user_blogs', { headers: { Authorization: `Bearer ${token}` } })
        setBlogs(response.data)
    }

    useEffect(() => {
        getUserProfile()
        getUserBlogs()
    }, [])




    const removeBlog = async(id) =>{
        console.log(token)
        const user = await axios.delete(`http://localhost:5000/api/blogs/${id}`, { headers: { authorization: `Bearer ${token}` } })
        getUserBlogs()
    }



    return (
        <div className="container">
            <h2>Profile</h2>
          
            {user ? (
               
                <>
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Blogs Posted:</strong> {user.count}</p>


                {
                    !toggle ? 
                    
                    <section className='d-flex flex-row justify-content-evenly'>
                    {blogs.map((items)=>{
                       
                      return(
                        <div key={items._id} onClick={()=>{setToggle(true)}} className='border border-1 border-primary p-4 w-25' style={{height:'max-content'}}>
                            <Button variant={'outline-danger'} onClick={()=>{removeBlog(items._id)}}>Delete</Button>
                            <Button variant={'outline-primary'}>Edit</Button>
                            <h2>{items.title}</h2>
                            <p>{items.content}</p>
                        </div>
                      )
                    }) }
                </section>
                    
                    : <BlogDetails setToggle={setToggle} />
                }

                
                </>
            ) : (
                <p>You need to log in to view your profile.</p>
            )}
        </div>
    );
};

export default Profile;

import React from 'react'

const BlogDetails = ({setToggle}) => {
  return (
    <div onClick={()=>{setToggle(false)}}>BlogDetails</div>
  )
}

export default BlogDetails
import React from 'react';

const PostDetails = (props) => {

  if (!props.post) return null;
  const {body, title, userId} = props.post;

  return (
    <div className='col-12 col-md-8'>
      <h1 className='font-weight-light'>{title}</h1>
      <div className='mt-5 pb-4'>
        <h3>Autor: <small>{userId}</small></h3>
      </div>
      <p className='text-justify'>{body}</p>
    </div>
  );
};

export default PostDetails;
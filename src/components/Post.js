import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Swal from 'sweetalert2';

class Post extends Component {

  confirmarPost = () =>{
    const {id} = this.props.post;

    Swal.fire({
      title: 'Estas Seguro?',
      text: "No seras capaz de recuperar este post de nuevo",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borralo!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.props.deletePost(id);
        Swal.fire(
          'Borrado!',
          'Tu Post ha sido borrado',
          'success'
        )
      }
    })
  }

  render() {

    const {id, title} = this.props.post;

    return (
      <tr>
        <td>{id}</td>
        <td>{title}</td>
        <td>
          <Link to={`/post/${id}`} className='btn btn-primary'>Ver</Link>
          <Link to={`/edit/${id}`} className='btn btn-warning'>Edit</Link>
          <button type='button' className='btn btn-danger' onClick={this.confirmarPost} >Borrar</button>
        </td>
      </tr>
    );
  }
}

export default Post;
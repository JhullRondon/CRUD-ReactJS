import React, { Component } from 'react';

class EditPost extends Component {

  tituloRef = React.createRef();
  contenidoRef = React.createRef();

  editarPost = (e) => {
    e.preventDefault();
    
    let post = this.props.post;
    post.title= this.tituloRef.current.value;
    post.body= this.contenidoRef.current.value;
    
    if (post.title === '' || post.body === '') {
      alert('Todos los campos son Obligatorios');
      return null;
    }

    this.props.postEdit(post);
  }
  render() {

    const {title, body} = this.props.post;
    return (
      <form className='col-8 bg-white mt-4' onSubmit={this.editarPost}>
        <legend> Crear nuevo Post</legend>
        <div className='form-group'>
          <label>Titulo del Post</label>
          <input type='text' ref={this.tituloRef} className='form-control' defaultValue={title} />
        </div>
        <div className='form-group'>
          <label>Contenido:</label>
          <textarea className='form-control' ref={this.contenidoRef} defaultValue={body} ></textarea>
        </div>
        <div className='d-flex flex-row-reverse'>
          <button className='btn btn-primary m-3' type='submit'>Enviar</button>
        </div>
      </form>
    );
  }
}

export default EditPost;
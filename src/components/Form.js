import React, { Component } from 'react';

class Form extends Component {

  tituloRef = React.createRef();
  contenidoRef = React.createRef();

  crearPost = (e) => {
    e.preventDefault();

    const post = {
      title: this.tituloRef.current.value,
      body: this.contenidoRef.current.value,
      userId: 1
    }

    if (post.titulo === '' || post.body === '') {
      alert('Todos los campos son Obligatorios');
      return null;
    }

    this.props.sendPost(post);
  }


  render() {
    return (
      <form className='col-8 bg-white mt-4' onSubmit={this.crearPost}>
        <legend> Crear nuevo Post</legend>
        <div className='form-group'>
          <label>Titulo del Post</label>
          <input type='text' ref={this.tituloRef} className='form-control' placeholder='Titulo del Post' />
        </div>
        <div className='form-group'>
          <label>Contenido:</label>
          <textarea className='form-control' ref={this.contenidoRef} placeholder='Contenido...'></textarea>
        </div>
        <div className='d-flex flex-row-reverse'>
          <button className='btn btn-primary m-3' type='submit'>Enviar</button>
        </div>
      </form>
    );
  }
}

export default Form;
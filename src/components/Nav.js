import React from 'react';
import '../css/Navegacion.css';
import {NavLink} from 'react-router-dom';


const Nav = () => {
  return (
    <nav className='col-12 col-md-8'>
      <NavLink to={'/posts'} activeClassName='active' >Todos los Posts</NavLink>
      <NavLink to={'/crear'} activeClassName='active' >Nuevo Post</NavLink>
    </nav>
  );
};

export default Nav;
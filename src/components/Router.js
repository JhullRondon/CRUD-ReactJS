import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import Nav from './Nav';
import Home from './Home';
import Posts from './Posts';
import Form from './Form';
import PostDetails from './PostDetails';
import NotPost from './NotPost';
import Swal from 'sweetalert2';
import EditPost from './EditPost';

class Router extends Component {

  state = {
    posts: []
  }

  componentDidMount() {
    this.getPost();
  }

  getPost = () => {
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(res => {
        this.setState({
          posts: res.data
        })
      });
  }

  deletePost = (id) => {

    axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then(res => {
        if (res.status === 200) {
          const posts = [...this.state.posts];
      
          const postsFilter = posts.filter(post => (post.id !== id));    
      
          this.setState({
            posts: postsFilter
          });
        }
      })
      .catch(res => console.log(res));
  }

  sendPost = (post) => {

    axios.post('https://jsonplaceholder.typicode.com/posts', {post})
      .then(res => {
        if (res.status === 201) {
          const postId = {id: res.data.id}
          post = Object.assign(post, postId)
          
         
          this.setState(prevState => ({
            posts: [...prevState.posts, post]
          }))

          Swal.fire({
            type: 'success',
            title: 'Creado',
            text: 'Creado satisfactoriamente'
          })
        }
      })
  }

  postEdit = post => {
    axios.put(`https://jsonplaceholder.typicode.com/posts/${post.id}`, {post})
      .then(res => {
        if (res.status === 200) {
          const updatePosts = this.state.posts.map((value) => {
            if (value.id === post.id) {
              value = post;
              return value;
            } else {
              return value;
            }
          });
          
          this.setState({
            posts: updatePosts
          })

          Swal.fire({
            type: 'success',
            title: 'Actualizado',
            text: 'Actualizado satisfactoriamente'
          })
        }
      })
  }

  render() {
    return (
      <BrowserRouter>
        <div className='container'>
          <div className='row justify-content-center'>
            <Header />
            <Nav />
            <Switch>
              <Route exact path='/' component={Home}></Route>
              <Route exact path='/posts' render= {() => {
                return(
                  <Posts posts={this.state.posts} deletePost={this.deletePost} />
                )
              }}>
              </Route>
              <Route exact path='/post/:id' render= {(props) => {
                const id=props.location.pathname.replace('/post/', '');
                  // filtra por id puesto que los post tiene un indice con valos diferente al id
                const postFilter = this.state.posts.filter(post => (post.id.toString() === id));
    
                const validator = (postFilter.length === 0) ? <NotPost /> : <PostDetails post={postFilter[0]} />;

                return(
                  <React.Fragment>
                    {validator}
                  </React.Fragment>
                )
              }}>
              </Route>
              <Route exact path='/edit/:id' render= {(props) => {
                const id=props.location.pathname.replace('/edit/', '');
                  // filtra por id puesto que los post tiene un indice con valos diferente al id
                const postFilter = this.state.posts.filter(post => (post.id.toString() === id));
    
                const validator = (postFilter.length === 0) ? <NotPost /> : <EditPost postEdit={this.postEdit} post={postFilter[0]} />;

                return(
                  <React.Fragment>
                    {validator}
                  </React.Fragment>
                )
              }}>
              </Route>

              <Route exact path='/crear' render={() => {
                return (
                  <Form sendPost={this.sendPost} />
                )
              }}>
              </Route>
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default Router;
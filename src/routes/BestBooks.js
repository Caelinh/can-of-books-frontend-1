import { Component } from 'react';
import React from 'react';
import axios from 'axios';
import { Carousel } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "../routes/BestBooks.css"
import { Button } from 'react-bootstrap';
import BookFormModal from './BookFormModal';
import Form from 'react-bootstrap/Form';


const server = process.env.REACT_APP_PORT
let url = `https://can-of-books3.herokuapp.com`

class BestBooks extends Component {

  constructor(props) {
    super(props);
    this.state = {
      books: [],
      noBooks: false,
      idToDelete: ''
    }
  }

  /* TODO: Make a GET request to your API to fetch all the books from the database  */
  componentDidMount() {
    this.getBooks();

    // this.setState({ books: axios('/books') });

  }

  getBooks = () => {
    axios.get(`${url}/books`).then(response => {
        this.setState({ books: response.data });
      })


  }

  deleteBook = (id) => {
    // this.setState({idToDelete: id});
  }

  handleChange(e) {
    this.setState({
        status: e.target.value
    });
}

  render() {
    return (
      <Container>
        <nav style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem",
        }}>
           <Link to="/home">Home</Link> |{" "}
           <Link to="/about">About us</Link> 
          

        </nav>
        <h2>Can Of Books</h2>
        <BookFormModal bookList = {this.state.books}/>
        {this.state.noBooks &&
          <p>No books currently saved</p>}
        {this.state.books &&
          <Carousel variant="dark" pause="hover" style={{border: "2px solid black"}}>
            {this.state.books.map(book =>
              <Carousel.Item style={{ height: '15rem',}} key={book._id}>
                <Carousel.Caption>
                  <h3>{book.title}</h3>
                  <p>{book.description}</p>
                  <p>{book.status}</p>
                </Carousel.Caption>
                
              </Carousel.Item>)}
          </Carousel>
          
            }
      </Container>
    )
  }
}


export default BestBooks;

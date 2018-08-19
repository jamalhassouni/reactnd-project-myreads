import React, {Component} from 'react'
import {Route, Switch} from "react-router-dom";
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListShelves from './ListShelves';
import Search from './Search';
class BooksApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      loading: true
    }
    this.onChangeShelf = this.onChangeShelf.bind(this);
  }
  onChangeShelf(book, shelf) {
    if (!shelf)
      return;
    BooksAPI.update(book, shelf).then(() => {
      this.setState(currentState => ({
        books: [
          ...currentState.books.filter(sb => sb.id !== book.id), {
            ...book,
            shelf
          }
        ]
      }));
    });
  }
  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState(() => ({books, loading: false}));
    });

  }
  render() {
    return (<div className="app">
      <Switch>
        <Route exact path="/" render={() => (
          <ListShelves onChangeShelf={this.onChangeShelf}
                       books={this.state.books}
                       isLoading={this.state.loading}/>)}/>
        <Route path="/search" render={() => ( <Search
            books={this.state.books}
             onChangeShelf={this.onChangeShelf}
         /> ) } />
      </Switch>
    </div>);
  }
}

export default BooksApp

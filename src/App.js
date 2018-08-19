import React, {Component} from 'react'
import {Route, Switch} from "react-router-dom";
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListShelves from './ListShelves';
import Search from './Search';
import Page404 from './Page404';
class BooksApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      loading: true
    }
    this.onChangeShelf = this.onChangeShelf.bind(this);
    this.onChangeShelfToggle = this.onChangeShelfToggle.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.onChangeCheckbox = this.onChangeCheckbox.bind(this);
  }
  /*
   When the book's shelf is changed, change it as well as the state
  */
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
  /*
  When the bookshelf is changed from the list,
  make a loop on each book in the current shelf
  and check if it is selected or not
  and accordingly change it to a shelf or leave it as it is
  */
  onChangeShelfToggle(Books,shelf){
    Books.forEach((book) => {
      /* check if the book has been selected or not
         then update state
      */
  let CheckBox  =  document.getElementById(book.id);
  let toggleAll = document.getElementById(book.shelf);
  let listToggle = document.getElementById(`list${book.shelf}`);
  if (CheckBox.checked) {
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
        toggleAll.checked = false;
        listToggle.classList.remove("show");
      });
   }
    });
  }
  /*
  Check if you click on Select All Books
  and then display a check box for each book
  */
  handleCheck(InputName,source){
    let checkboxes = document.querySelectorAll(`input[name=${InputName}]`);
    let listToggle = document.getElementById(`list${InputName}`);
   for (let i = 0; i < checkboxes.length; i++) {
       if (checkboxes[i] !== source)
           checkboxes[i].checked = source.checked;
           if (source.checked) {
             checkboxes[i].parentNode.classList.add("show");
             listToggle.classList.add("show");
           }else{
             checkboxes[i].parentNode.classList.remove("show");
             listToggle.classList.remove("show");
           }
        } // end for loop

  }
  /*
   When the checklist is changed,
   check if the number of books is the same as the number of selected books
   and add or remove class show From each book checkbox
  */
  onChangeCheckbox(checkbox){
    let toggleCheckbox  = document.querySelector(`#${checkbox.name}`);
    let allCheckBox  =  document.querySelectorAll(`input[name=${checkbox.name}]`);
    let listToggle = document.getElementById(`list${checkbox.name}`);
    let nbr  = 0 ;
    let firstCheck = false;
    for (let i = 0; i < allCheckBox.length; i++) {
      if (allCheckBox[i].checked) {
            allCheckBox[i].parentNode.classList.add("show");
            listToggle.classList.add("show");
            firstCheck = true;
            nbr ++;
     }else{
         toggleCheckbox.checked = false;
         allCheckBox[i].parentNode.classList.remove("show");
       if(firstCheck){
           listToggle.classList.add("show");
        }else{
            listToggle.classList.remove("show");
        }

    }

  } // end for loop

        if(nbr === allCheckBox.length){
          toggleCheckbox.checked = true;
        }


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
          <ListShelves
            onChangeShelf={this.onChangeShelf}
            onChangeShelfToggle={this.onChangeShelfToggle}
            handleCheck={this.handleCheck}
            onChangeCheckbox={this.onChangeCheckbox}
            books={this.state.books}
            isLoading={this.state.loading}/>)}/>

        <Route path="/search" render={() => ( <Search
            books={this.state.books}
            onChangeShelf={this.onChangeShelf}
         /> ) } />

        <Route component={Page404} />
      </Switch>
    </div>);
  }
}

export default BooksApp

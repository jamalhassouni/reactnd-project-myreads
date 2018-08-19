import React from "react";
import { Link } from "react-router-dom";
import BOOK_SHELVES from "./utils/BOOKSHELVS";
import Shelf from "./Shelf";

const filterBookByShelf = (books, shelf) =>
  books.filter(book => book.shelf === shelf);

const ListShelves = (props) =>  {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>

        <div className="list-books-content">
            {props.isLoading && (<div><li className="loader" /><h1 className="loadText">Content is Loading</h1></div>)}

            {!props.isLoading && BOOK_SHELVES.map(shelf => {
            return (
              <Shelf
               isLoading={props.loading}
               onChangeShelf={props.onChangeShelf}
               onChangeShelfToggle={props.onChangeShelfToggle}
               handleCheck={props.handleCheck}
               onChangeCheckbox={props.onChangeCheckbox}
               key={shelf.name}
               shelfName={shelf.displayName}
               InputName={shelf.name}
               books={filterBookByShelf(props.books, shelf.name)}
              />
            );
          }) }

        </div>

        <div className="open-search">
          <Link to="/search">Add Book</Link>
        </div>
      </div>
    );
}
export default ListShelves;

import React from "react";
import ChangeShelf from "./ChangeShelf";
import BookThumbnail from "./icons/BookThumbnail.png";

const Book = ({book, onChangeShelf, onChangeCheckbox}) => {
  let currentURL = window.location.href;
  if (currentURL === "http://localhost:3000/search") {
    return (<div className="book">
      <div className="book-top">
        <div className="book-cover" style={{
            width: 128,
            height: 193,
            backgroundImage: `url("${book.imageLinks
              ? book.imageLinks.smallThumbnail
              : BookThumbnail}")`
          }}/>

        <ChangeShelf onChangeShelf={onChangeShelf} book={book}/>
      </div>
      <a className="book-title" target="_blank" href={book.previewLink}>
        {book.title}
      </a>

      <div className="book-authors">
        {book.authors && book.authors.concat().join(" | ")}
      </div>

    </div>);
  } else {

    return (<div className="book">
      <div className="book-top">
        <div className="book-cover" style={{
            width: 128,
            height: 193,
            backgroundImage: `url("${book.imageLinks
              ? book.imageLinks.smallThumbnail
              : BookThumbnail}")`
          }}/>

        <ChangeShelf onChangeShelf={onChangeShelf} book={book}/>
      </div>
      <a className="book-title" target="_blank" href={book.previewLink}>
        {book.title}
      </a>

      <div className="book-authors">
        {book.authors && book.authors.concat().join(" | ")}
      </div>

      <div className="checkbox-group">
        <input onChange={e => onChangeCheckbox(e.target)} className="inp-cbx" id={book.id} value={book.title} name={book.shelf} type="checkbox" style={{
            display: "none"
          }}/>
        <label className="cbx" htmlFor={book.id}>
          <span>
            <svg width="12px" height="10px" viewBox="0 0 12 10">
              <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
            </svg>
          </span>
        </label>
      </div>

    </div>);
  }

};

export default Book;

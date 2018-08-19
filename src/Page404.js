import React from 'react';
import { Link } from 'react-router-dom';

const Page404 = () => {
    return (
        <div className="list-books">
            <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
            <div className="page-error">
            <h1>404</h1>
            <h3>There is no Page with this url.</h3>
              <Link to="/" className="redirectHome">Return to Home Page</Link>
            </div>
        </div>

    );

}

export default Page404;

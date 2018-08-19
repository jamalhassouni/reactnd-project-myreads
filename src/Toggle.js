import React from "react";
import BOOK_SHELVES from "./utils/BOOKSHELVS";
const Toggle = props => {
  return (
    <div className="toggle">
      <label className="control control--checkbox">Toggle All
      <input type="checkbox" id={props.InputName} onClick={e => props.handleCheck(props.InputName,e.target)} />
      <div className="control__indicator"></div>
      </label>
      <div className="boxOfshelf" id={`list${props.InputName}`}>
        <div className="select">
          <select defaultValue="Move to..." onChange={e => props.onChangeShelfToggle(props.books, e.target.value)}>
            <option disabled >Move to...</option>
             {BOOK_SHELVES.map(shelf => (
            <option key={shelf.name} value={shelf.name}>
              {shelf.displayName}
            </option>
          ))}
            <option value="none">None</option>
          </select>
        </div>
      </div>
    </div>

  );
};

export default Toggle;

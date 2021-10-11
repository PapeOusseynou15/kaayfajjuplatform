import React, { Component } from "react";

class Search extends Component {
  render = () => {
    const { handleChange, searchTerm } = this.props;

    return (
      <div className="row">
        <div className="col">
          <input
            onChange={handleChange}
            value={searchTerm}
            placeholder="Recherche..."
          />
        </div>
      </div>
    );
  };
}

export default Search;

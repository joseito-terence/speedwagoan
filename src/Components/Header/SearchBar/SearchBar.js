import React from 'react';
import { 
  SearchBox, 
  /*Hits, 
  Highlight,
  connectStateResults */
} from 'react-instantsearch-dom';
import './SearchBar.css';
import { useHistory } from 'react-router-dom';

function SearchBar() {
  const history = useHistory();

  const search = event => {
    event.preventDefault();
    const search_keyword = event.target.children[0].value;
    history.push(`/products?search=${search_keyword}`);
  }
  return (
    <div className="searchBar">
      <SearchBox translations={{ placeholder: 'Search' }} onSubmit={search}  />
      {/* <Results /> */}
    </div>
  )
}
export default SearchBar;


// const Results = connectStateResults(
//   ({ searchState }) => 
//     searchState && searchState.query ? (
//       <Hits hitComponent={Hit} />
//     ) : //<div>No query</div>
//     null
// );

// function Hit({ hit }) {
//   return (
//     // <Link to={`/product/${hit.objectID}`}>
//       <div className='hit'>
//         <div className="hit__title">
//           <Highlight hit={hit} attribute='title' tagName='b' />
//           {/* {hit.title} */}
//         </div>
//       </div>
//     // </Link>
//   )
// }

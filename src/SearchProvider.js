import React from 'react';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch } from 'react-instantsearch-core';

function SearchProvider({ children }) {
  // This component is kind of like the a State Provider for all algolia's widgets.
  // It is to be used as a wrapper.
  const APP_ID = '7LY0YPT76V';
  const API_KEY = '8be3d54e16c1ec6f9d7274adab97b34a'; 
  const searchClient = algoliasearch(APP_ID, API_KEY);

  return (
    <InstantSearch
      searchClient={searchClient}
      indexName='Products'
    >
      {children}
    </InstantSearch>
  )
}
export default SearchProvider;
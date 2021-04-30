import React from "react";
import Wishlist from "../../Wishlist";
import { RangeInput, RefinementList, } from 'react-instantsearch-dom';

import { toggleFilter } from "../ItemsCarousel/ItemsCarousel";
import {  SortBy, connectCurrentRefinements } from 'react-instantsearch-dom';
import "./SideNav.css";

function SideNav() {
  return (
    <div className="sidenav">
      <button type="button" className="sidenav__close btn" onClick={toggleFilter}>
        <span>&times;</span>
      </button>
      <div>
        <div className="sidenav__filters m-2">
          <SortBy 
            defaultRefinement='Products' 
            items={[
              { value: 'Products', label: 'Most Relevant'},
              { value: 'instant_search_price_asc', label: 'Price asc.' },
              { value: 'instant_search_price_desc', label: 'Price desc.' },
            ]}
          />

          <h5 className='subtitle'>Category</h5>
          <RefinementList 
            attribute='category' 
            limit={8} 
            showMore
          />
          <h5 className='subtitle'>Price</h5>
          <RangeInput attribute='price' translations={{ submit: 'Go' }} />

          <ClearRefinements />  {/* A button to clear all refinements/filters */}
        </div>

        <div className="sidenav__wishlist">
          <Wishlist miniView />
        </div>
      </div>
    </div>
  );
}

export default SideNav;

const ClearRefinements = connectCurrentRefinements(
  ({ items, refine }) => (
    <button 
      type='button' 
      className='btn btn-secondary btn-sm rounded-sm mt-3'  
      onClick={() => refine(items)} 
      disabled={!items.length}
    >
      Clear all filters
    </button>
  )
)

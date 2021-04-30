import React from 'react';
import './ItemsCarousel.css';
import Items from '../Items/';
import { connectPagination, connectSearchBox } from 'react-instantsearch-core';
import { useLocation } from 'react-router';
import { ReactComponent as FilterIcon } from '../../../Assets/filter-results-button.svg'


// A custom hook that builds on useLocation to parse
// the query string.
const useQuery = () => new URLSearchParams(useLocation().search);

function ItemsCarousel() {
  let searchQuery = useQuery();

  return (
    <div id="carouselItems" className="carousel slide" data-ride="carousel">
      <VirtualSearchBox defaultRefinement={searchQuery.get('search')} />
      
      <div className="carousel-inner">
        <div className="carousel-item active">
          <Items />
        </div>
      </div>
      
      <Pagination />

      <button className="sidenav__toggleBtn btn" onClick={toggleFilter}>
        <FilterIcon />
      </button>
    </div>
  )
}

export default ItemsCarousel;

const VirtualSearchBox = connectSearchBox(() => null);

const Pagination = connectPagination(
  ({ currentRefinement, nbPages, refine, createURL }) => (
    <>
      {/* NEXT AND PREVIOUS BUTTONS */}
      <button className="carousel-control-prev btn" data-slide="prev" 
        onClick={() => refine(currentRefinement - 1)}
        disabled={currentRefinement === 1}
      >
        <i className="fa fa-angle-left text-dark"></i>
        <span className="sr-only">Previous</span>
      </button>
      <button className="carousel-control-next btn" data-slide="next"
        onClick={() => refine(currentRefinement + 1)}
        disabled={currentRefinement === nbPages}
      >
        <i className="fa fa-angle-right text-dark"></i>
        <span className="sr-only">Next</span>
      </button>

      {/* PAGE INDICATORS (dots at the bottom) */}
      <ul className='carousel-indicators'>
        {new Array(nbPages).fill(null).map((_, index) => {
          const page = index + 1;
          const activeClass = currentRefinement === page ? 'active' : '';

          return (
            <a
              key={index}
              href={createURL(page)}
              onClick={() => refine(page)}
            >
              <li className={activeClass}>
                {page}
              </li>
            </a>
          );
        })}
      </ul>
    </>
  )
);


export const toggleFilter = () => {   // function to expand and collapse the SideNav.
  document.querySelector(".sidenav")?.classList.toggle("expand");
};
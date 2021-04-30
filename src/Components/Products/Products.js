import React from 'react';
import MetaTags from '../MetaTags';
import ItemsCarousel from './ItemsCarousel/';
import SideNav from './SideNav/';

function Products() {
  return (
    <div className='products d-flex'>
      <MetaTags title='Products' />
      <SideNav />
      <ItemsCarousel />
    </div>
  )
}

export default Products;

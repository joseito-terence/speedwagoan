import React from 'react';
import SkeletonElement from '../SkeletonElement';
import Shimmer from '../SkeletonElement/Shimmer';
import './SkeletonOrders.css';

function SkeletonOrders() {
  return [1,2,3].map(i => (
    <div className='skeleton-wrapper row p-1 max-width mx-0 flex-row' key={i}>
      <div className="col-4 col-sm-3">
        <SkeletonElement classes='image' />
      </div>
      <div className="col-8 col-sm-8">
        <SkeletonElement classes='title' />
        <SkeletonElement classes='order__date' />
      </div>

      <Shimmer />
    </div>
  ))
}
export default SkeletonOrders;

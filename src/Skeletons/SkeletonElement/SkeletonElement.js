import React from 'react';
import Shimmer from './Shimmer';
import './Skeleton.css';

function SkeletonElement({ classes, shimmer }) {
  return (
    <div className={`skeleton ${classes}`}>
      {shimmer && <Shimmer />}
    </div>
  )
}

export default SkeletonElement;

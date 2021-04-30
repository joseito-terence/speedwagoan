import React from 'react';
import './Items.css';
import Item from './Item';
import { ReactComponent as EmptyCartSvg } from '../../../Assets/undraw_empty_cart.svg';
import SkeletonOrders from '../../../Skeletons/SkeletonOrders';

function Items({ items, itemInfo, loading }) {
  return (
    <div className='cartItems w-100'>
      <h3>{items.length} ITEMS</h3>
      {itemInfo.map((item, idx) => 
        <Item 
          key={idx} 
          id={item.id}
          name={item.title} 
          price={item.price} 
          image={item.images[0]} 
          quantity={items[idx]?.qty}
        />
      )}

      {loading && (
        <div className="container-sm p-0">
          <SkeletonOrders />
        </div>
      )}

      {items.length === 0 && (
        <div className="cartItems__empty">
          <EmptyCartSvg />
        </div>
      )}
    </div>
  )
}

export default Items;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import db, { auth } from '../../../../firebase';
import { currencyFormat } from '../../../../Utilities/currencyFormat';
import './Item.css';

function Item({ id, name, price, image, quantity }) {
  const [qty, setQty] = useState(quantity);
  const email = auth.currentUser?.email;

  const removeFromCart = () => {
    db.doc(`customers/${email}/cart/${id}`)
      .delete()
      .then(() => console.log("Removed from Cart"))
      .catch(err => console.log(err));
  }

  const handleQtyChange = ({ target }) => {
    setQty(parseInt(target.value));                           // update local state with new qty.
    db.doc(`customers/${email}/cart/${id}`)         // update db with new qty.
      .update({ qty: parseInt(target.value) });
  }

  const incrementQty = () => {
    handleQtyChange({ target: { value: qty + 1 }});
  }

  const decrementQty = () => {
    if (qty - 1 !== 0)
      handleQtyChange({ target: { value: qty - 1 }});
  }

  return (
    <div className="item">
      <img className="item__image" src={image} alt="item_image" />
      
      <div>
        <div className="item__details">
          <div className="item__name">
            <Link to={`product/${id}`} className='text-reset'>
              {name}
            </Link>
          </div>
          <div className="item__price">{currencyFormat(price)}</div>
        </div>

        <div className="item__options">
          <div className="item__optionsQty">
            <button className="btn btn-secondary fas fa-minus" onClick={decrementQty}></button>
            <input type="text" name="qty" value={qty} onChange={handleQtyChange} />
            <button className="btn btn-secondary fas fa-plus" onClick={incrementQty}></button>
          </div>  
          |
          <button className="item__optionsRemove btn btn-secondary" onClick={removeFromCart}>
            <i className="fas fa-trash">{' '}</i>
            <span>Remove</span>
          </button>
        </div>
      </div>     
    </div>
  )
}

export default Item;

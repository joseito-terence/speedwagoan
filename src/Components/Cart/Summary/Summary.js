import React, { useState, useEffect } from 'react';
import db from '../../../firebase';
import { useHistory, useLocation } from 'react-router-dom';
import { currencyFormat } from '../../../Utilities/currencyFormat';
import './Summary.css';

function Summary({ totalAmount, setTotalAmount }) {
  const history = useHistory();
  const location = useLocation();         
  const [pathName, setPathName] = useState('');   

  const [promocode, setPromocode] = useState('');
  const [promocode_details, setPromocode_details] = useState({});
  const [discount, setDiscount] = useState(0);

  const testPromocode = event => {
    event.preventDefault();

    db.doc(`promocodes/${promocode}`)
      .get()
      .then(doc => {
        if(doc.exists) {
          setPromocode_details(doc.data());
          setDiscount(doc.data().discount * totalAmount / 100);
          setTotalAmount(totalAmount - discount);
        }else{
          setPromocode_details({});
          setDiscount(0);
          setTotalAmount(totalAmount + discount);
        }
      })
      .catch(err => console.log(err));
  }

  useEffect(() => {
    setPathName(location.pathname);   // set path whenever url changes.
  }, [location]);

  return (  
    <div className='summary w-100 mb-5'>
      <h3>ORDER SUMMARY</h3>
      
      {pathName === '/cart' && (
        <form onSubmit={testPromocode}>
          <div className="input-group">
            <div className="summary__promoCode form-control">
              <i className="fas fa-tag"></i>
              <input type="text" name="promoCode" placeholder="HAVE A PROMO CODE?" value={promocode} onChange={e => setPromocode(e.target.value.toUpperCase())}  required />
            </div>   
            <div className="input-group-append">
              <button type="submit" className="summary__promoCode btn btn-outline-dark">Redeem</button>
            </div>
          </div>
        </form>
      )}

      {/* {pathName === '/cart' && (
        <div className="summary__promoCode">
          <i className="fas fa-tag"></i>
          <input type="text" name="promoCode" placeholder="HAVE A PROMO CODE?" />
        </div> 
      )} */}
      <div className="summary__paymentAmt">
        <div>
          <span>Items: </span> <span>{currencyFormat(totalAmount + discount)}</span>
        </div>
        {discount > 0 && 
          <div>
            <span>Discount: ({promocode_details.discount}% off) </span>
            <span> - {currencyFormat(discount)}</span>
          </div>
        }
        <div>
          <span>Estimated Shipping: </span> <span>FREE</span>
        </div>
      </div>   

      <div className="summary__orderTotal">
        <span>ORDER TOTAL: </span>
        <span>{currencyFormat(totalAmount)}</span>
      </div>

      {pathName === '/cart' && (
        <button className="summary__checkoutBtn btn btn-primary mt-3 p-2 w-100" 
          disabled={totalAmount <= 0}
          onClick={() => history.push('/checkout')}
        >
          PROCEED TO CHECKOUT
        </button>
      )} 
    </div>
  )
}

export default Summary;

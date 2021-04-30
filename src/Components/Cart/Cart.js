import React, { useState, useEffect } from "react";
import Items from "./Items";
import Summary from "./Summary";
import "./Cart.css";
import db, { auth } from '../../firebase';
import Checkout from "./Checkout";
import { useLocation } from "react-router-dom";
import MetaTags from "../MetaTags";

function Cart() {
  const [items, setItems] = useState([]);            // items or products in the cart with quantity.
  const [itemInfo, setItemInfo] = useState([]);      // information for the items.
  const [totalAmount, setTotalAmount] = useState(0); // total amount of products excluding other charges.
  const email = auth.currentUser?.email;
  const location = useLocation();         
  const [pathName, setPathName] = useState('');   
  const [loading, setLoading] = useState(true);   

  useEffect(() => { // get items from cart.   
    const unsubscribe = db.doc(`customers/${email}`).collection('cart')
      .onSnapshot(snap => {
        setItems(snap.docs.map(doc => ({ ...doc.data(), id: doc.id })))
        setLoading(false);
      });
    
    return () => {
      unsubscribe();
    }
  }, [email]);

  useEffect(() => { // fetch each product's details
    if(items.length !== 0){
      const ids = items.map(item => item.id);
      
      db.collection('products')
        .where('__name__', 'in', ids)
        .get()
        .then(snap => setItemInfo(snap.docs.map(doc => ({ ...doc.data(), id: doc.id }))))
        .catch(err => console.error(err));
    }
    else
      setItemInfo([]);    // items in cart are 0, reset the array.
  }, [items]);

  useEffect(() => {       // function for calculating total of the items in the cart.
    if(itemInfo.length !== 0){
      setTotalAmount(items.reduce((total, curr, i) => (total + curr.qty * itemInfo[i].price), 0));
    }
  }, [itemInfo, items]);

  useEffect(() => {
    setPathName(location.pathname);   // set path whenever url changes.
  }, [location]);

  return (
    <div className="shoppingCart mx-auto p-5">
      <MetaTags title={pathName === '/cart' ? 'Cart' : 'Checkout'} />
      <div className="container">
        <div className="row">
          <div className="col">
            <h2 className="pb-3">
              {pathName === '/cart' ? 'SHOPPING CART' : 'CHECKOUT'}
            </h2>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-8 col-md-6 col-sm-12">
            {pathName === '/cart' && 
              <Items items={items} itemInfo={itemInfo} loading={loading} />
            }
            {pathName === '/checkout' && 
              <Checkout totalAmount={totalAmount} items={items} itemInfo={itemInfo} />
            }
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12">
            <Summary totalAmount={totalAmount} setTotalAmount={setTotalAmount} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;

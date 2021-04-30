import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import db, { auth } from "../../firebase";
import "./Wishlist.css";
import WishlistProduct from "./WishlistProduct/WishlistProduct";
import { ReactComponent as EmptyStreetSvg } from '../../Assets/undraw_empty_street.svg';


function Wishlist({ miniView }) {
  const [wishlist, setWishlist] = useState([]);     // holds id's of items in the wishlist.
  const [itemInfo, setItemInfo] = useState([]);     // holds info. of the items in the wishlist.
  const email = auth.currentUser?.email;

  useEffect(() => {
    const unsubscribe = db.doc(`customers/${email}`).collection('wishlist')
      .onSnapshot(snap => 
        setWishlist(snap.docs.map(doc => doc.data()))
      );

    return () => {
      unsubscribe();
    }
  }, [email]);

  useEffect(() => {
    if(wishlist.length !== 0){
      const ids = wishlist.map(item => item.id);
      
      db.collection('products')
        .where('__name__', 'in', ids)                         // the '__name__' is a property that holds the 
        .get()
        .then(snap => setItemInfo(snap.docs.map(doc => ({ ...doc.data(), id: doc.id }))))
        .catch(err => console.error(err));
    }
    else
      setItemInfo([]);    // items in wishlist are zero, reset the array.
  }, [wishlist]);

  return (
    <div className="wishlist container mb-3">
      <div className="row">
        <div className="col">
          <div className="text-center py-3">
            {!miniView ? (
              <h3 className="mb-0">Wishlist</h3> 
            ) : (
              <Link to='/wishlist'>
                  <h5 className='text-left text-light btn-link'>My Wishlist</h5>
              </Link>
            )}
          </div>
        </div>
      </div>
      <div className="row">
        {itemInfo.map(product => (
          <WishlistProduct
            key={product.id}
            id={product.id}
            title={product.title}
            category={product.category}
            price={product.price}
            img={product.images[0]}
            miniView={miniView}
          />
        ))}

        {(itemInfo.length === 0 && !miniView ) && (
          <div className="col wishlist__empty">
            <EmptyStreetSvg />
          </div>
        )}
      </div>
    </div>
  );
}
export default Wishlist;


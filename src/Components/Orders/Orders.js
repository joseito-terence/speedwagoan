import React, { useState, useEffect } from 'react';
import db, { auth } from '../../firebase';
import SkeletonOrders from '../../Skeletons/SkeletonOrders';
import MetaTags from '../MetaTags';
import './Orders.css';

function Orders() {
  // const uid = auth.currentUser?.uid;
  const [uid, setUid] = useState('');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      setUid(authUser?.uid || null);
    })
  }, []);

  useEffect(() => {
    if(uid) {
      db.collection('orders')
        .where('customerId', '==', uid)
        .orderBy('order_date', 'desc')
        .limit(10)
        .get()
        .then(snap => {
          setOrders(
            snap.docs.map(doc => 
              ({ 
                ...doc.data(), 
                id: doc.id, 
                order_date: doc.data().order_date.toDate().toString().slice(0, 24) 
              })
            )
          );
          setLoading(false);
        })
        .catch(err => console.log(err));
    }
  }, [uid]);

  return (
    <div className='orders container p-4'> 
      <MetaTags title='Orders' />
      <div className="row mb-3">
        <div className="col">
          <h2>Your Orders</h2>
        </div>
      </div>
      {!loading ? (
        orders.map(order => (
          <div className="row mb-3" key={order.id}>
            <div className="col-2 p-0 order__image">
              <img className='order__image-img' src={order.image} alt={order.title} /> 
            </div>
            <div className="col-10">
              <h4>{order.title}</h4>
              <span>Ordered On: {order.order_date}</span>
            </div>
          </div>
        ))
        ) : (
          uid && <SkeletonOrders />
      )}
      {!uid && <p>Login to view your orders.</p>}
    </div>
  )
}
export default Orders;
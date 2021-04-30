import React, { useEffect, useState } from 'react';
import db, { auth } from '../../../firebase';
import { makePayment } from '../../../Utilities/razorpay';
import './Checkout.css';

function Checkout({ totalAmount, items, itemInfo }) {
  const initialState = {
    address: '',        // address line 1
    address2: '',       // address line 2
    landmark: '',
    city: '',
    country: '', 
    state: '', 
    pincode: '',
    latitude: '',
    longitude: '',
  }
  const [address, setAddress] = useState(initialState);
  const [phoneNo, setPhoneNo] = useState('');
  const [originalState, setOriginalState] = useState({});   // used to track if changes are made to the address or phone no.
  const customer_email = auth.currentUser?.email;

  const handleChange = ({ target }) => {    // handle change of form field text.
    setAddress({ ...address, [target.id]: target.value });
  }

  // const getCurrentLocation = () => {
  //   // window.navigator.geolocation.getCurrentPosition(console.log);
  // }

  const submit = event => {
    event.preventDefault();
    
    const orderDetails = items.map((item, idx) => ({ 
      ...item, 
      title: itemInfo[idx].title,
      image: itemInfo[idx].images[0],
      sellerId: itemInfo[idx].sellerId
    }))

    if(JSON.stringify(originalState) !== JSON.stringify({ ...address, phoneNo })){    // check if details are changed.
      db.doc(`customers/${customer_email}`)
        .set({                                // set() generally would override the document
          address,
          phno: phoneNo
        }, { merge: true })                   // the merge option allows to merge if the doc exists.
        .then(() => {
          console.log('Address saved!');
          makePayment(totalAmount, phoneNo, orderDetails);           // this function will open Razorpay's payment modal
        })
        .catch(err => console.error(err));
    }else{
      makePayment(totalAmount, phoneNo, orderDetails);    // this function will open Razorpay's payment modal
    } 
  }

  useEffect(() => {   
    db.doc(`customers/${customer_email}`)  
      .get()        // get data from the db for display in the fields and edit.
      .then(doc => { 
        setAddress({ ...doc.data().address });
        setPhoneNo(doc.data().phno);
        setOriginalState({ 
          ...doc.data().address, 
          phoneNo: doc.data().phno 
        })
      })
      .catch(err => console.error(err));
  }, [customer_email]);


  return (
    <div className='checkout w-100'>   
      <h3 className='mb-3'>SHIPPING DETAILS</h3>
      <div className="container">
        
        <form onSubmit={submit}>
          <div className="mb-3">
            <label htmlFor="address">Address</label>
            <input type="text" className="form-control" id="address" value={address.address} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label htmlFor="address2">Address 2 <span className="text-muted">(Optional)</span></label>
            <input type="text" className="form-control" id="address2" value={address.address2} onChange={handleChange} />
          </div>
          <div className="row">
            <div className="col-lg-6 mb-3">
              <label htmlFor="landmark">Landmark <span className="text-muted">(Optional)</span></label>
              <input type="text" className="form-control" id="landmark" value={address.landmark} onChange={handleChange} />    
            </div>
            <div className="col-lg-6 mb-3">
              <label htmlFor="city">City</label>
              <input type="text" className="form-control" id="city" value={address.city} onChange={handleChange} required />
            </div>
          </div>

          <div className="row">
            <div className="col-lg-5 mb-3">
              <label htmlFor="country">Country</label>
              <input type='text' className="form-control d-block w-100" id="country" value={address.country} onChange={handleChange} required />
            </div>
            <div className="col-lg-4 mb-3">
              <label htmlFor="state">State</label>
              <input type='text' className="form-control d-block w-100" id="state" value={address.state} onChange={handleChange} required />
            </div>
            <div className="col-lg-3 mb-3">
              <label htmlFor="pincode">Pincode</label>
              <input type="text" className="form-control" id="pincode" value={address.pincode} onChange={handleChange} required />
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="phoneNo">Contact No.</label>
            <input 
              type="text" className="form-control" id="phoneNo" maxLength={10} minLength={10}
              value={phoneNo} onChange={({ target }) => setPhoneNo(target.value)} required 
            />
          </div>

          {/* <div className="row">
            <div className="col mb-3">
              <label>Geo Location <span className="text-muted">(Optional)</span></label>
              <button type='button' className="btn btn-success fas fa-map-marker-alt d-block" onClick={getCurrentLocation}>
                {' '} Provide Location
              </button>
              <span className="text-muted ml-1">htmlFor the purpose of quick delivery.</span>
            </div>
          </div> */}
          

          <input 
            type="submit" value="PLACE ORDER" 
            className='btn btn-primary d-block w-100 mt-4 font-weight-bold' 
          />

        </form>
     
      </div>
    </div>
  )
}
export default Checkout;
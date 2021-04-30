import React, { useState } from 'react';
import db, { auth } from '../../../firebase';
import './WriteAReview.css';
import Modal from '../../Modal';


function WriteAReview({ productId, currentRating = 0 }) {
  const { uid } = auth.currentUser;
  const initialState = {
    rating: 0,
    review: '',
    customerName: auth.currentUser?.displayName
  }
  const [state, setState] = useState(initialState);


  const submitReview = event => {
    event.preventDefault();

    console.log(typeof state.rating);
    db.doc(`products/${productId}/reviews/${uid}`)
      .set({ 
        ...state,
        timestamp: new Date(),
      })
      .then(() => {
        document.querySelector('#ModalWriteAReview button.close').click();
        
        const newRating = (currentRating === 0) ? state.rating : ((currentRating + state.rating) / 2 );
                
        return db.doc(`products/${productId}`).update({ rating: newRating });
      })
      .catch(err => console.log(err));
  }


  return (
    <Modal 
      id='ModalWriteAReview' 
      title='Write A Review'
      className='btn btn-link float-right p-0'
      buttonText='Write a Review'
    >
      <div className="reviews__write p-3">
        <form onSubmit={submitReview}>
          <label>Rating</label>
          <div className="rating">
            {[...Array(5)].map((star, idx) => {
              const ratingValue = idx + 1;

              return (
                <label key={idx}>
                  <input
                    type="radio" 
                    name="rating" 
                    value={ratingValue} 
                    onClick={() => setState({ ...state, rating: ratingValue })} 
                  />
                  <i 
                    className="rating__star fas fa-star" 
                    style={{ color: ratingValue <= state.rating ? '#ffc107' : '#e4e5e9' }}
                  ></i>
                </label>  
              )
            })}
          </div>
          
          <label>Review</label>
          <textarea 
            className='form-control mb-2' 
            placeholder='What did you like or dislike? What did you use this product for?' 
            onChange={e => setState({ ...state, review: e.target.value })}
            required
          />
          
          <input type="submit" className='btn btn-primary float-right mb-3' value="Submit" />
        </form>
      </div>
    </Modal>
  )
}
export default WriteAReview;


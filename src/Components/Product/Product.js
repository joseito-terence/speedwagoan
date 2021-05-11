import React, { useState, useEffect } from 'react';
import './Product.css';
import Accordion from '../Accordion/Accordion';
import db, { auth } from '../../firebase';
import { useParams } from 'react-router-dom';
import { currencyFormat } from '../../Utilities/currencyFormat';
import Reviews from './Reviews';
import WriteAReview from './WriteAReview';
import SkeletonProduct from '../../Skeletons/SkeletonProduct';
import MetaTags from '../MetaTags/';

const Product = (props) => {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const email = auth.currentUser?.email;

  const [mainImage, setMainImage] = useState('');

  const viewProduct = (index) => {
    setMainImage(product.images[index])
  };

  const requiredSignIn = () => {
    /* addToCart and addToWishlist operations
     requires user to be authenticated. */

    document.querySelector('.header__actions > div > button').click(); // open login modal.
  }

  const addToCart = () => {                               // add to cart 
    if(email){
      console.log(email)
      db.doc(`customers/${email}`)
        .collection('cart')
        .doc(productId)
        .set({ qty: 1 })  
        .then(() => props.history.push('/cart'));           // and then redirect to /cart.
    }else{
      requiredSignIn();
    }
  }

  const addToWishList = () => {
    if(email){
      console.log(email)
      db.doc(`customers/${email}`)
        .collection('wishlist')
        .doc(productId)
        .set({ id: productId })
        .then(() => console.log('Added to wishlist'))
        .catch(err => console.log(err));
    }else{
      requiredSignIn();
    }
  }

  useEffect(() => {
    db.doc(`products/${productId}`)
      .get()
      .then(doc => {
        setProduct(doc.data());
        setMainImage(doc.data().images[0]);
        setLoading(false);
      })
      .catch(err => console.log(err.message));
  }, [productId]);
  

  const share = () => {
    navigator.share({ url: `https://share-speedwagoan.herokuapp.com/product/${productId}` });
  }

  return !loading ? (
    <div className='container'>
      <MetaTags
        title={product?.title}
        description={product?.description}
        keywords={product?.tags.join(', ')}
        image={product.images[0]}
      />
      <div className="row">
        <div className='col product__images-display'>
          <img
            className='product__images-main'
            src={mainImage}
            alt={product?.title}
          />
          <div className='product__images-sub'>
            {product.images?.map((image, index) => 
              <img className='product__images-sub-img' key={index} src={image} alt='' onClick={() => viewProduct(index)} />
            )}
          </div>
        </div>

        <div className='col product__summary'>
          <h2 id='product__name'>{product?.title}</h2>
          <div className='product__credebility'>
            <p className='product__value'>
              {(product?.stock > 0) ?                                                 // if in stock 
                currencyFormat(product?.price)                                        // display price
                :
                <span className='text-danger font-weight-bold'>Out of Stock</span>    // else display this message
              }
            </p>
            <div className='product__ratings'>
              <p className='product__rating-stars mr-1'>Ratings</p>
              <span className='text-warning' style={{ minWidth: '120px' }}>
                {[...Array(5)].map((x, i) => (
                  <i 
                    key={i}
                    className={`
                      ${(i + 1) <= product?.rating ? 'fas' : 'far'} 
                      fa-star 
                      ${!product?.rating && 'text-secondary'}
                    `}
                  ></i>
                ))}
              </span>
            </div>
          </div>
          
        
          <div className='d-flex flex-column align-items-end' style={{ marginBottom: '-28px' }}>
            {email && 
              <WriteAReview productId={productId} currentRating={product?.rating} />
            } 

            {/* SHARE BUTTON */}
            {navigator.share &&
              <button type='button' onClick={share} className="product__shareBtn btn btn-light text-secondary fas fa-share-alt"  data-toggle="tooltip" data-placement="bottom" title="Share"></button>
            }
          </div>
    

          <div className='product__nav'>
            <Accordion id='productNav'>
              <Accordion.Item id='description' headerText='DESCRIPTION'>
                {product.description}
              </Accordion.Item>
              <Accordion.Item id='details' headerText='DETAILS'>
                <ul className='ml-2'>
                  {product.details?.split('\n').map((detail, i) => <li key={i}>{detail}</li>)}
                </ul>
              </Accordion.Item>
              <Accordion.Item id='reviews' headerText='REVIEWS'>
                <Reviews productId={productId} />
              </Accordion.Item>
            </Accordion>
          </div>
          <button className='product__cart btn btn-primary' onClick={addToCart} disabled={(product?.stock <= 0)}>
            ADD TO CART
          </button>
          <button className='product__wishlist btn btn-link btn-block' onClick={addToWishList}>
            ADD TO WISHLIST
          </button>
        </div>
      </div>
    </div>
  ) : (
    <SkeletonProduct />
  )
};

export default Product;

import React, { useState, useEffect } from "react";
import "./Header.css";
import { Link } from 'react-router-dom';
import db, { auth } from "../../firebase";

import Navbar from "./Navbar";
import Modal from '../Modal';
import SignIn from "../SignIn";
import Search from "./SearchBar";
import { ReactComponent as Logo } from '../../Assets/logo001SVG.svg';

function Header() {
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [user, setUser] = useState(null);
  const email = auth.currentUser?.email;

  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      setUser(authUser || null);
    })
  }, []);


  useEffect(() => {
    const unsubscribe = db.doc(`customers/${email}`).collection('cart')
      .onSnapshot(snap => 
        setCartItemsCount(snap.docs.length)
      )
    return () => {
      unsubscribe();
    }
  }, [email]);


  return (
    <header className="header">
      <div className="header__container">
        <Link to='/'>
          <span className="header__logo">
            <Logo />
          </span>
        </Link>
        
        {/* <form className="header__search">
          <input
            type="text"
            className="form-control"
            placeholder="Search"
            aria-label="Search"
            aria-describedby="button-search"
          />
     
          <button type='submit' className="d-none" id="button-search">
            Search
          </button>
        </form> */}

        <div className="header__search">
          <Search />
        </div>

        <div className="header__actions">
          {!user ?
            <Modal id='loginModal' className='btn btn-secondary' buttonText='Login'>
              <SignIn />
            </Modal>
            :
            <button className="btn btn-secondary" onClick={() => auth.signOut() }>Logout</button>
          }
          
          <span className="header__actionsCart">
            <Link to='/cart'>
              <i className="fas fa-shopping-cart text-white">
                {' '}{cartItemsCount || ''}
              </i>
            </Link>
          </span>
        </div>
        
      </div>
      <Navbar />
    </header>
  );
}

export default Header;

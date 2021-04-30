import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from '../../Assets/logo001SVG.svg';

function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="footer__sitemap">
          <h5>Sitemap</h5>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/aboutus">About Us</Link>
            </li>
            <li>
              <Link to="/products">Products</Link>
            </li>
            <li>
              <Link to="/wishlist">Wishlist</Link>
            </li>
            <li>
              <Link to="/cart">Cart</Link>
            </li>
          </ul>
        </div>
        <div className="footer__contact-form">
          <h5>Sell your products</h5>
          <a 
            className='btn btn-link' 
            href="https://charlton-dias.github.io/ecommerce-seller/" 
            target='_blank'
            rel='noreferrer'
            style={{ color: 'white' }}
          >
            Register your business.
          </a>
        </div>
        <div className="footer__details">
          <Logo />
          <i className="fas fa-phone-alt"> (+91) 9876543210</i> <br />
          <i className="fas fa-envelope"> support@speedwagoan.com</i>
        </div>
      </footer>
      <div className="footer__copyright">
        Copyright &copy; 2020 All Rights Reserved SpeedWaGoan
      </div>
    </>
  );
}

export default Footer;

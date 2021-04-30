import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Footer from './Components/Footer';
import Header from './Components/Header';
import Home from './Components/Home';
import Products from './Components/Products';
import Cart from './Components/Cart/';
import Product from './Components/Product/';
import Wishlist from './Components/Wishlist/';
import SignUp from './Components/SignUp/';
import AboutUs from './Components/AboutUs/';
import Orders from './Components/Orders/';
import SkeletonProduct from './Skeletons/SkeletonProduct/';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />

        <Switch>
          <Route path='/skeleton' component={SkeletonProduct} />
          <Route path='/signup' component={SignUp} />
          <Route path='/wishlist' component={Wishlist} />
          <Route path='/orders' component={Orders} />
          <Route path='/product/:productId' component={Product} />
          <Route path={['/cart', '/checkout']}component={Cart} />
          <Route path='/products' component={Products} />
          <Route path='/aboutus' component={AboutUs} />
          <Route path='/' component={Home} />
        </Switch>
        
        <Footer />
      </Router>
    </div>
  );
}

export default App;

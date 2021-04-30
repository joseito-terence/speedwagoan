import React from "react";
import "./Items.css";
import { Link } from "react-router-dom";
import { Configure, connectHits } from "react-instantsearch-dom";
import { ReactComponent as VoidSvg } from '../../../Assets/undraw_void.svg';
import { currencyFormat } from "../../../Utilities/currencyFormat";

function Items() {
  return (
    <div className="items">
      <Configure hitsPerPage={8} />
      <Hits />
    </div>
  );
}

export default Items;

const Hits = connectHits(({ hits }) => (
  <div className="container">
    <div className="row">
      {hits.slice(0, 2).map(hit => (
        <div className="col" key={hit.objectID}>
          <Item
            productId={hit.objectID}
            productName={hit.title}
            imgSrc={hit.images}
            price={hit.price}
          />
        </div>
      ))}
    </div>
    <div className="row">
      {hits.slice(2, 8).map(hit => (
        <div className="col col-md-4 col-6" key={hit.objectID}>
          <Item
            productId={hit.objectID}
            productName={hit.title}
            imgSrc={hit.images}
            price={hit.price}
          />
        </div>
      ))}
    </div>
    {hits.length === 0 && (
      <div className="row">
        <div className="col hits__empty">
          <VoidSvg />
        </div>
      </div>
    )}
  </div>
));

function Item({ productId, productName, imgSrc, price }) {
  return (
    <Link to={`/product/${productId}`} className="card bg-dark text-white">
      <img className="card-img" src={imgSrc} alt={productName} />
      <div className="card-overlay">
        <h5 className="card-title text-truncate">{productName}</h5>
        <p className="rating">
          <i className="fas fa-star fa-sm text-warning" aria-hidden="true"></i>
          <i className="fas fa-star fa-sm text-warning" aria-hidden="true"></i>
          <i className="fas fa-star fa-sm text-warning" aria-hidden="true"></i>
          <i className="fas fa-star fa-sm text-warning" aria-hidden="true"></i>
          <i className="far fa-star fa-sm text-warning" aria-hidden="true"></i>
        </p>
        <p>{currencyFormat(price)}</p>
      </div>
    </Link>
  );
}

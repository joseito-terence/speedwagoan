import React from 'react';
import './Carousel.css';

function Carousel() {
    return (
        <div id="carouselHome" className="carousel slide" data-ride="carousel">
            <ol className="carousel-indicators">
                <li data-target="#carouselHome" data-slide-to="0" className="active"></li>
                <li data-target="#carouselHome" data-slide-to="1"></li>
                <li data-target="#carouselHome" data-slide-to="2"></li>
            </ol>
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img src="https://images-eu.ssl-images-amazon.com/images/G/31/img20/Wireless/SamsungM/M31PE/V259540125_IN_WLME_SamsungM31Prime_DesktopTallHero_1500x600_1._CB416195537_.jpg" className="d-block w-100" alt="..." />
                </div>
                <div className="carousel-item">
                    <img src="https://images-eu.ssl-images-amazon.com/images/G/31/img20/Wireless/WLA/November/JabraElite85t/Intrigue/Amazonspecials/SaleNow/D19013686_WLA_BAU_Jabra_Elite_85T_Ingress_Tall_Hero_1500x600_3._CB414362917_.jpg" className="d-block w-100" alt="..." />
                </div>
                <div className="carousel-item">
                    <img src="https://images-eu.ssl-images-amazon.com/images/G/31/img17/Home/LA/Diwali2019/Rishab/Auto_Biss/HobbyStore_GW/Hobby_1500x600._CB416245605_.jpg" className="d-block w-100" alt="..." />
                </div>
            </div>
            <a className="carousel-control-prev" href="#carouselHome" role="button" data-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href="#carouselHome" role="button" data-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="sr-only">Next</span>
            </a>
        </div>
    );
}

export default Carousel;

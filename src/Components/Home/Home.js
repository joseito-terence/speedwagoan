import React from 'react';
import MetaTags from '../MetaTags';
import Carousel from './Carousel';

function Home() {
    return (
        <div className="home">
            <MetaTags 
                title='SpeedWaGoan' 
                description='Hybrid Web and Mobile app for Online Store' 
            />
            <Carousel />
        </div>
    )
}

export default Home;

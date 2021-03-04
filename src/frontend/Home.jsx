import React from 'react';
import { connect } from 'react-redux'; //Nos ayuda a conectar nuestra aplicacion
import Header from './components/Header.jsx';
import Search from './components/Search.jsx';
import Categories from './components/Categories.jsx';
import Carousel from './components/Carousel.jsx';
import CarouselItem from './components/CarouselItem.jsx';
import './assets/styles/App.scss';

const Home = ({ myList = [], trends = [], originals = [] }) => {

  return (
    <>
      <Header />
      <Search isHome />
      {myList.length > 0 && (
        <Categories title='Mi lista'>
          <Carousel>
            {myList.map((item) => (
              <CarouselItem
                key={item.id}
                {...item}
                isList
              />
            ))}

          </Carousel>
        </Categories>
      )}

      <Categories title='Tendencias'>
        <Carousel>
          {trends.map((item) => <CarouselItem key={item.id} {...item} />)}

        </Carousel>
      </Categories>

      <Categories title='Originales de Platzi Video'>
        <Carousel>
          {originals.map((item) => <CarouselItem key={item.id} {...item} />)}
        </Carousel>
      </Categories>

    </>
  );
};

const mapStateToProps = (state) => {
  return {
    myList: state.myList,
    trends: state.trends,
    originals: state.originals,
  };
};

export default connect(mapStateToProps, null)(Home);

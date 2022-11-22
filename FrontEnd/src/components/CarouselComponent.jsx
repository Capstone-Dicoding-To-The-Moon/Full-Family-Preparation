import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';
import Hero1 from '../assets/Hero-img.png';
import Hero2 from '../assets/Hero-img2.png';
import Hero3 from '../assets/Hero-img3.png';

const CarouselComponent = () => {
  return (
    <div className="Container pb-4">
      <Carousel>
        <Carousel.Item>
          <img className="d-block" src={Hero1} alt="Second slide" />

          <Carousel.Caption>
            <Card bsPrefix="carousel-caption-card">
              <Card.Body bsPrefix="carousel-body-card">
                <Card.Text>Praesent commodo cursus magna.</Card.Text>
              </Card.Body>
            </Card>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block" src={Hero2} alt="Second slide" />

          <Carousel.Caption>
            <Card bsPrefix="carousel-caption-card">
              <Card.Body bsPrefix="carousel-body-card">
                <Card.Text>Praesent commodo cursus magna.</Card.Text>
              </Card.Body>
            </Card>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block" src={Hero3} alt="Third slide" />

          <Carousel.Caption>
            <Card bsPrefix="carousel-caption-card">
              <Card.Body bsPrefix="carousel-body-card">
                <Card.Text>Praesent commodo cursus magna.</Card.Text>
              </Card.Body>
            </Card>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default CarouselComponent;

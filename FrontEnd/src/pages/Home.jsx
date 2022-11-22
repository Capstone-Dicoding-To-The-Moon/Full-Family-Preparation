import { Container } from 'react-bootstrap';
import CardListComponent from '../components/CardListComponent';
import CarouselComponent from '../components/CarouselComponent';

const Home = () => {
  return (
    <div style={{ backgroundColor: 'grey', minHeight: '100vh' }}>
      <Container className="py-5">
        <CarouselComponent />
        <CardListComponent />
      </Container>
    </div>
  );
};

export default Home;

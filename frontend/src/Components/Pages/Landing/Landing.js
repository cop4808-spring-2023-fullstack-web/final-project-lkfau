import { Container } from 'react-bootstrap';
import About from '../../Content/About/About';
import Banner from '../../UI/Banner/Banner';

const Landing = () => {
  return <>
  <Banner/>
  <Container className='px-0'>
  <About/>
  </Container>
  </>
};

export default Landing;

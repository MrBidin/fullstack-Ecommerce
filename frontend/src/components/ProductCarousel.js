import { listTopProducts } from "../actions/productActions";
import { useDispatch } from "react-redux";
import { Carousel, Image } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import Loader from "./Loader";
import Message from "./Message";
import { Link } from "react-router-dom";

const ProductCarousel = () => {
  const dispatch = useDispatch();

  const productTopRated = useSelector(state => state.productTopRated);
  const {loading, error, products} = productTopRated;

  useEffect(() => {
    dispatch(listTopProducts());
  }, [dispatch])

  return loading 
  ? <Loader/> 
  : error 
  ? <Message variant='danger'>{error}</Message> 
  : (
    <Carousel pause='hover' className='bg-dark'>
      {products.map(product => {
        return <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <Image  src={product.image} alt={product.name} fluid/>
            <Carousel.Caption className='carousel-caption'>
              <h2>{product.name} ({product.price})</h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      })}
    </Carousel>
  )
};

export default ProductCarousel;
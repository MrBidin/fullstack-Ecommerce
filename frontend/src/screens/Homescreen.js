// import products from '../products';
import {Row, Col} from 'react-bootstrap';
import Product from '../components/Product';
import { useEffect } from "react";
import {listProducts} from '../actions/productActions';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';

const Homescreen = () => {
  const dispatch = useDispatch();
  const productList = useSelector(state => state.productList);
  const {error, products, loading} = productList;

  useEffect(() => {
    dispatch(listProducts())
  }, [dispatch])
  return (
    <>
    <h1>The latest Products</h1>
    { loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : 
      <Row>
      {products.map((product) => (
      (
        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
          <Product product={product} />
        </Col>
      )))}
      </Row>
    }
    </>
  )
};

export default Homescreen;

import {Row, Col} from 'react-bootstrap';
import Product from '../components/Product';
import Paginate from '../components/Paginate';
import { useEffect } from "react";
import { useParams } from 'react-router-dom';
import {listProducts} from '../actions/productActions';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';

const Homescreen = () => {
  const dispatch = useDispatch();
  const { keyword, pageNumber} = useParams();
  const productList = useSelector(state => state.productList);
  const {error, products, loading, pages, page} = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber])
  return (
    <>
    <h1>The latest Products</h1>
    { loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : 
    <>
      <Row>
      {products.map((product) => (
      (
        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
          <Product product={product} />
        </Col>
      )))}
      </Row>
      <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''}></Paginate>
    </>
    }
    </>
  )
};

export default Homescreen;
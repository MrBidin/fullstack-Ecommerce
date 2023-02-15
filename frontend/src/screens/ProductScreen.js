import { useParams, Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap";
import Rating from "../components/Rating";
import { useEffect} from "react";
import { listProductDetails } from "../actions/productActions";
import { useSelector, useDispatch } from 'react-redux';
import Message from "../components/Message";
import Loader from "../components/Loader";

const ProductScreen = () => {

  const dispatch = useDispatch()
  const productDetails = useSelector(state => state.productDetails);
  const {product, error, loading} = productDetails;

  const {id} = useParams();
  
  useEffect(() => {
    dispatch(listProductDetails(id))
  }, [id, dispatch]);

  return (
    <>
      <Link to='/' className="btn btn-light my-3">Go back</Link>
      {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : 
      <Row>
      <Col md={6}>
        <Image src={product.image} alt={product.name} fluid/>
      </Col>
      <Col md={3}>
        <ListGroup variant='flush'>
          <ListGroup.Item>
            <h3>{product.name}</h3>
          </ListGroup.Item>
          <ListGroup.Item>
            <Rating rating={product.rating} numReviewsText={`${product.numReviews} reviews`}/>
          </ListGroup.Item>
          <ListGroup.Item>
            price: ${product.price}
          </ListGroup.Item>
          <ListGroup.Item>
            description: {product.description}
          </ListGroup.Item>
        </ListGroup>
      </Col>
      <Col md={3}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <Row>
                <Col>
                  Price: 
                </Col>
                <Col>
                  <strong>${product.price}</strong>
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>
                  Status: 
                </Col>
                <Col>
                  {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
                  <Button className="btn-block" type='button' disabled={product.countInStock === 0}>
                    Add to Cart
                  </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>}
    </>
  )
};

export default ProductScreen;
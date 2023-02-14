import { useParams, Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap";
// import products from '../products';
import Rating from "../components/Rating";
import { useEffect, useState } from "react";
import axios from 'axios';

const ProductScreen = () => {

  const {id} = useParams();

  const [product, setProduct] = useState({});
  
  useEffect(() => {
    const fetchProduct = async () => {
      const {data} = await axios.get(`/api/v1/products/${id}`);
      setProduct(data)
    }
    fetchProduct()
  }, [id]);

  return (
    <>
      <Link to='/' className="btn btn-light my-3">Go back</Link>
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
      </Row>
    </>
  )
};

export default ProductScreen;
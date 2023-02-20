import {addToCart, removeFromCart } from "../actions/cartActions";
import { useSelector, useDispatch } from 'react-redux';
import {Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap';
import Message from '../components/Message';
import {Link, useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { useEffect } from "react";

const CartScreen = () => {
  const {id} = useParams();
  const [searchParams] = useSearchParams();
  const qty = Number(searchParams.get('qty'));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if(id){
      dispatch(addToCart(id, qty))
    }
  }, [dispatch, id, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  } ;

  const checkoutHandler = () => {
    navigate('/shipping')
  }

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
          Your cart is empty 
          <Link to='/'>Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant='flush'>
            {
              cartItems.map(x => (
                <ListGroup.Item key={x.product}>
                  <Row>
                    <Col md={2}>
                      <Image src={x.image} alt={x.name} fluid rounded/>
                    </Col>
                    <Col md={2}>
                      <Link to={`product/${x.product}`}>{x.name}</Link>
                    </Col>
                    <Col md={2}>
                      {x.price}
                    </Col>
                    <Col md={2}>
                      <Form.Control as='select' value={x.qty} onChange={(e) => dispatch(addToCart(x.product, Number(e.target.value)))}>
                      {
                        [...Array(x.countInStock).keys()].map( x => (
                        <option key={x + 1} value={x + 1}>{x + 1}</option>
                        ))
                      }
                      </Form.Control>
                    </Col>
                    <Col md={2}>
                      <Button 
                      type='button' 
                      variant='light' 
                      onClick={() => removeFromCartHandler(x.product)}>
                        <i className="fas fa-trash"/>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))
            }
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items
              </h2>
              $ {cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button 
              type='button' 
              className="btn-block" 
              disabled={cartItems.length === 0}
              onClick={checkoutHandler}>
                Proceed to Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  )
};

export default CartScreen;
import { useState } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { savePaymentMethod } from '../actions/cartActions';
import { useSelector, useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';

const PaymentScreen = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector(state => state.cart);
  const { shippingAddress } = cart;

  const [paymentMethod, setPaymentMethod] = useState('Paypal');

  if(!shippingAddress){
    navigate('/shipping')
  }

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate('/placeorder')
  }

  return (
    <FormContainer>
      <CheckoutSteps  step1 step2 step3/>
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as='legend'>Select Method</Form.Label>
        <Col>
          <Form.Check 
          type='radio'
          label='Paypal or Credit Card'
          id='Paypal'
          name='paymentMethod'
          value='Paypal'
          checked
          onChange={(e) => setPaymentMethod(e.target.value)}>
          </Form.Check>
        </Col>
        </Form.Group>
        <Button variant='primary' type='submit'>Continue</Button>
      </Form>
    </FormContainer>
  )
};

export default PaymentScreen;
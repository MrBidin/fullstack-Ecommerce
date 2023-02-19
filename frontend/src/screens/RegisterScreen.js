import { register } from "../actions/userActions";
import {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from "../components/FormContainer";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useSearchParams, useNavigate } from "react-router-dom";

const RegisterScreen = () => {

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);
  
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const redirect = searchParams.get('redirect') ? searchParams.get('redirect') : '/';

  const dispatch = useDispatch();
  const userRegister = useSelector(state => state.userRegister);
  const { loading, error, userInfo } = userRegister;
  // const userLogin = useSelector(state => state.userLogin);
  // const {loading, error, userInfo} = userLogin;

  useEffect(() => {
    if(userInfo){
      navigate(redirect)
    }
  }, [userInfo, redirect, navigate])

  const submitHandler = (e) => {
    e.preventDefault();
    if(password !== confirmPassword){
      setMessage('Passwords do not match')
    } else {
      dispatch(register(name, email, password))
    }
  }

  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {error ? <Message variant='danger'>{error}</Message> : message ? <Message>{message}</Message> : loading ? <Loader /> : <></>  } 
    
        <Form onSubmit={submitHandler}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control 
          type='name' 
          placeholder="Enter name" 
          value={name}
          onChange={(e) => setName(e.target.value)}
          >
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control 
          type='email' 
          placeholder="Enter email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          >
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control 
          type='password' 
          placeholder="Enter password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          >
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control 
          type='password' 
          placeholder="Confirm Password" 
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          >
          </Form.Control>
        </Form.Group>
        <Button type="submit" variant='primary'>Register</Button>
      </Form>

      <Row className="py-3">
        <Col>
          Had An Account?{' '}
          <Link to={redirect ? `/login/?redirect=${redirect}` : '/login'}>Login</Link>
        </Col>
      </Row>
    </FormContainer>
  )
};

export default RegisterScreen;
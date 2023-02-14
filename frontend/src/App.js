import Footer from "./components/Footer";
import Header from "./components/Header";
import Homescreen from "./screens/Homescreen";
import ProductScreen from "./screens/ProductScreen";
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
    <Header />
    <main className="py-3">
      <Container>
        <Routes>
          <Route path='/' element={<Homescreen />} />
          <Route path='/product/:id' element={<ProductScreen />} />
        </Routes>
      </Container>
    </main>
    <Footer />
    </Router>
  );
}

export default App;

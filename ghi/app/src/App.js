import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import SalesList from './SalesList';
import SaleForm from './SaleForm';

function App(props) {

  if (props.sales === undefined) {
    return null
  }
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path = "sales" element = {<SalesList sales={props.sales}/>} />
          <Route path = 'sales/new' element = {<SaleForm /> } />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

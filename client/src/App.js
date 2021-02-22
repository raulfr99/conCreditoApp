import './App.css';
import {useState,useRef} from "react";
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button,Nav,Navbar,NavDropdown } from 'react-bootstrap';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Inicio from './components/Inicio'
import Listado from './components/Listado'
import Evaluacion from './components/Evaluacion'
function App() {
  
  return (
    <div style={{width:'100%',height:'100%'}}>
      <Navbar bg="dark" expand="lg" variant="dark">
  <Navbar.Brand href="/">ConCredito</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link href="/">Home</Nav.Link>
      <Nav.Link href="/listado">Listado y Evaluacion</Nav.Link>
     
    </Nav>
  </Navbar.Collapse>
</Navbar>
    
    <Router >
      <Switch>
      <Route path='/' exact>
      <Inicio/>
        </Route>
        <Route path='/listado'>
        <Listado/>
        </Route>
        <Route  path="/evaluacion"  >
        <Evaluacion/>
        </Route>

        
    
    </Switch>
    </Router>
    </div>
  );
}

export default App;

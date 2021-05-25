import React,{Component} from 'react';
import logo from './logo.svg';
import {Navbar,NavbarBrand} from 'reactstrap';
import Menu from './components/MenuComponent';
import {DISHES} from './shared/dishes';
import './App.css';
// app is the parent class menu is the child class 
// We are lifting up the state so that all the information is directly available in the parent class 
//and any other child component can access it from here easily

// To do so we need to first create state for App also.

class App extends Component {
     constructor(props) {
       super(props);
       this.state = {
            dishes:DISHES
       }
     }
render() {
  return (
    <div>
       <Navbar dark color="primary">
          <div className="container">
            <NavbarBrand href="/">RisTorante Confusion</NavbarBrand>
          </div>
        </Navbar>
        <Menu dishes={this.state.dishes} />
    </div>
  );
}
}


export default App;

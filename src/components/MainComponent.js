////////////////////// Container Component //////////////////////////
import React,{Component} from 'react';
import {Navbar,NavbarBrand} from 'reactstrap';
import Menu from './MenuComponent';
import DishDetail from './DishdetailComponent';
import {DISHES} from '../shared/dishes';
import '../App.css';
// app is the parent class menu is the child class 
// We are lifting up the state so that all the information is directly available in the parent class 
//and any other child component can access it from here easily

// To do so we need to first create state for App also.

class Main extends Component {
     constructor(props) {
       super(props);
       this.state = {
            dishes:DISHES,
            selectedDish: null

       }
     }
     onDishSelected(dishId){
        this.setState({selectedDish:dishId}); // cannot directly change the state
    }
render() {
  return (
    <div>
       <Navbar dark color="primary">
          <div className="container">
            <NavbarBrand href="/">RisTorante Confusion</NavbarBrand>
          </div>
        </Navbar>
        <Menu dishes={this.state.dishes} dish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]}  onClick={(dishId)=>{this.onDishSelected(dishId)}} />
        {/* <DishDetail dish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]} /> */}
    </div>
  );
}
}


export default Main;

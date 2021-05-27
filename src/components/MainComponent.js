////////////////////// Container Component //////////////////////////
import React,{Component} from 'react';
import {Navbar,NavbarBrand} from 'reactstrap';
import Menu from './MenuComponent';
import DishDetail from './DishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import {DISHES} from '../shared/dishes';
import Home from './HomeComponent';
import { Switch, Route, Redirect } from 'react-router-dom';
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
  const Homepage =()=>{
        return (
            <Home />
        );
  }
  return (
    <div>
       <Header />
       <Switch>
        <Route path="/home" component ={Homepage} />
        <Route exact path="/menu" component ={()=><Menu dishes={this.state.dishes} dish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]}  onClick={(dishId)=>{this.onDishSelected(dishId)}} />} />
        <Redirect to="/home" />
       </Switch>
        {/* <DishDetail dish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]} /> */}
        <Footer />
    </div>
  );
}
}


export default Main;

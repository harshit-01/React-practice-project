////////////////////// Container Component //////////////////////////
import React,{Component} from 'react';
import {Navbar,NavbarBrand} from 'reactstrap';
import Menu from './MenuComponent';
import DishDetail from './DishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import About from './AboutComponent';
import {DISHES} from '../shared/dishes';
import {PROMOTIONS} from '../shared/promotions';
import {LEADERS} from '../shared/leaders';
import {COMMENTS} from '../shared/comments';
import Contact from './ContactComponent';
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
            comments:COMMENTS,
            promotions:PROMOTIONS,
            leaders:LEADERS,
            selectedDish: null

       }
     }
     onDishSelected(dishId){
        this.setState({selectedDish:dishId}); // cannot directly change the state
    }
render() {
  const Homepage =()=>{
        return (
            <Home 
              dish={this.state.dishes.filter((dish) => dish.featured)[0]}
              promotion={this.state.promotions.filter((promo) => promo.featured)[0]}
              leader={this.state.leaders.filter((leader) => leader.featured)[0]}
            />
        );
  }
  const DishWithId = ({match}) => {
    return(
       
        <Menu dishes={this.state.dishes} dish={this.state.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
          comments={this.state.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))} />
    );
  };

  return (
    <div>
       <Header />
       <Switch>
        <Route path="/home" component ={Homepage} />
        <Route exact path="/menu" component ={()=><Menu dishes={this.state.dishes} dish={this.state.dishes.filter((dish) =>dish.id === this.state.selectedDish)[0]} comment={this.state.comments} onClick={(dishId)=>{this.onDishSelected(dishId)}} />} />
        <Route path="/menu/:dishId" component={DishWithId} />
        <Route exact path="/aboutUs" component ={()=><About leaders={this.state.leaders} />} />
        <Route exact path="/contactUs" component ={Contact} />
        <Redirect to="/home" />
       </Switch>
        {/* <DishDetail dish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]} /> */}
        <Footer />
    </div>
  );
}
}


export default Main;

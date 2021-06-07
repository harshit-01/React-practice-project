////////////////////// Container Component //////////////////////////
import React,{Component} from 'react';
import Menu from './MenuComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import About from './AboutComponent';
import {Contact} from './ContactComponent';
import Home from './HomeComponent';
import { Switch, Route, Redirect,withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import { actions } from 'react-redux-form';
import { addComment, fetchDishes } from '../redux/ActionCreators';
import '../App.css';
// app is the parent class menu is the child class 
// We are lifting up the state so that all the information is directly available in the parent class 
//and any other child component can access it from here easily

// To do so we need to first create state for App also.
const mapStateToProps = (state) => { 
  return {dishes:state.dishes,
  comments:state.comments,
  promotions:state.promotions,
  leaders:state.leaders,
  selectedDish: null
  }
}
const mapDispatchToProps = (dispatch)=>({
      addComment:(dishId,rating,author,comment)=>dispatch(addComment(dishId,rating,author,comment)),
      fetchDishes:()=>{dispatch(fetchDishes())},
      resetFeedbackForm: () => { dispatch(actions.reset('feedback'))}
})

class Main extends Component {
      // eslint-disable-next-line
      constructor(props) {
        super(props);
        //this.fetchDishes = this.fetchDishes.bind(this);
      }
     componentDidMount() {
      this.props.fetchDishes();
     }
      onDishSelected(dishId){
         this.setState({selectedDish:dishId}); // cannot directly change the state
     }
render() {
  const Homepage =()=>{
        return (
            <Home 
                dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
                dishesLoading={this.props.dishes.isLoading}
                dishesErrMess={this.props.dishes.errMess}
                promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
                leader={this.props.leaders.filter((leader) => leader.featured)[0]}
            />
        );
  }
  const DishWithId = ({match}) => {
    return(
       
        <Menu dishes={this.props.dishes.dishes} dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
        isLoading={this.props.dishes.isLoading}
        errMess={this.props.dishes.errMess}
          comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))} 
          addComment = {this.props.addComment} dishId={this.props.addComment.dishId}/>
    );
    //{console.log(this.props.dishes.dish)}
  };

  return (
    <div>
       <Header />
       <Switch>
        <Route path="/home" component ={Homepage} />
        <Route exact path="/menu" component ={()=><Menu dishes={this.props.dishes.dishes} dish={this.props.dishes.dishes.filter((dish) =>dish.id === this.props.selectedDish)[0]} comment={this.props.comments} onClick={(dishId)=>{this.onDishSelected(dishId)}} />} />
        <Route path="/menu/:dishId" component={DishWithId} />
        <Route exact path="/aboutUs" component ={()=><About leaders={this.props.leaders} />} />
        <Route exact path="/contactUs" component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} />}/>
        <Redirect to="/home" />
       </Switch>
        {/* <DishDetail dish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]} /> */}
        <Footer />
    </div>
  );
}
}


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));


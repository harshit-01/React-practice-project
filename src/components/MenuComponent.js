import React ,{Component} from 'react';
import { Media } from 'reactstrap';
import { Card, CardImg, CardImgOverlay, CardText, CardBody,
    CardTitle } from 'reactstrap';
import DishDetail from './DishdetailComponent';

// Wants to access JS inside html use {}.
class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedDish:null // created a prop here
        };
    };
    onDishSelected(dish){
        this.setState({selectedDish:dish}); // cannot directly change the state
    }
    renderDish(dish){
           if(dish!=null){
                    // return (<Card>
                    //     <CardImg top src={dish.image} alt={dish.name} />
                    //     <Card body>
                    //         <CardTitle>{dish.name}</CardTitle>  
                    //         <CardText>{dish.description}</CardText> 
                    //     </Card>
                    // </Card>
                    // );
                    return (<DishDetail name={dish.name} description={dish.description} image={dish.image}/>)
           }
           else{
               return (<div></div>);
           }
    }
     renderComments(dish){
             if(dish!=null){
                //console.log(dish.comments)
                  return(
                        dish.comments.map((co)=>{
                            //console.log(co['comment']);
                             return(
                                 <div>
                                 <p>{co.comment}</p><br></br>
                                 <p>--{co.author}, {co.date}</p><br></br>
                                 </div>
                             )
                        })
                  )
             }
             else{
                 return (<div></div>);
             }
     }
    render(){
        const menu = this.props.dishes.map((dish)=>{
            return (
                <div key={dish.id} className="col-12 col-md-5 m-1"> 
                { <Card onClick={()=>{this.onDishSelected(dish)}}>
                    <CardImg width="100%" src={dish.image} alt={dish.name} />
                    <CardImgOverlay>
                        <CardTitle>{dish.name}</CardTitle>
                    </CardImgOverlay>
                </Card>}
              </div>
              );
        });
        return(
            <div className="container">
                <div className="row">
                    {menu};
                </div>
                <div className="zip col-12 col-md-5 m-1">
                <span className="tip">{this.renderDish(this.state.selectedDish)}</span>
                <div className="pin">
                <h4>Comments</h4>
                <h6>{this.renderComments(this.state.selectedDish)}</h6>
                </div> 
                </div>
            </div>
        );
    }
};
export default Menu;


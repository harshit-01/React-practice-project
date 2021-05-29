///////////////// Presentational Component /////////////////////////
import React ,{Component} from 'react';
import { Media } from 'reactstrap';
import { Card, CardImg, CardImgOverlay,
    CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import DishDetail from './DishdetailComponent';



function RenderMenuItem ({dish, onClick}) {
    return (
        <Card>
        <Link to={`/menu/${dish.id}`}>
           <CardImg width="100%" src={dish.image} alt={dish.name} />
           <CardImgOverlay>
               <CardTitle>{dish.name}</CardTitle>
           </CardImgOverlay>
       </Link>
       </Card>
    );
}
function renderDish(dish){
                if(dish!=null){
                        return (<DishDetail name={dish.name} description={dish.description} image={dish.image}/>)
                }
                else{
                    return (<div></div>);
                }
    }

function renderComments(comment){
    if(comment!=null){
       console.log(comment);
         return(
                comment.comments.map((co)=>{
                   //console.log(co['comment']);
                    return(
                        <div>
                        <p>{co.comment}</p><br></br>
                        <p>--{co.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(co.date)))}</p><br></br>
                        </div>
                    )
               })
         )
    }
    else{
        return (<div></div>);
    }
}

const Menu = (props) => {

    const menu = props.dishes.map((dish) => {
        return (
            <div className="col-12 col-md-5 m-1"  key={dish.id}>
                <RenderMenuItem dish={dish} onClick={props.onClick}/>
            </div>
        );
    });

    return (
        <div className="container">
          <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Menu</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>Menu</h3>
                        <hr />
                    </div>                
                </div>
        <div className="row">
            {menu};
        </div>
        <div className="zip col-12 col-md-5 m-1">
        <span className="tip">{renderDish(props.dish)}</span>
        <div className="pin">
        <h4>Comments</h4>
        <h6 >{renderComments(props.dish)}</h6>
        </div> 
        </div>
    </div>
    );
}


// Wants to access JS inside html use {}.
// class Menu extends Component {
//            constructor(props) {
//            super(props);
//     //     this.state = {
//     //         selectedDish:null // created a prop here
//     //     };
//      };
//     // onDishSelected(dish){
//     //     this.setState({selectedDish:dish}); // cannot directly change the state
//     // }
//     renderDish(dish){
//            if(dish!=null){
//                     // return (<Card>
//                     //     <CardImg top src={dish.image} alt={dish.name} />
//                     //     <Card body>
//                     //         <CardTitle>{dish.name}</CardTitle>  
//                     //         <CardText>{dish.description}</CardText> 
//                     //     </Card>
//                     // </Card>
//                     // );
//                     return (<DishDetail name={dish.name} description={dish.description} image={dish.image}/>)
//            }
//            else{
//                return (<div></div>);
//            }
//     }
//      renderComments(dish){
//              if(dish!=null){
//                 //console.log(dish.comments)
//                   return(
//                         dish.comments.map((co)=>{
//                             //console.log(co['comment']);
//                              return(
//                                  <div>
//                                  <p>{co.comment}</p><br></br>
//                                  <p>--{co.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(co.date)))}</p><br></br>
//                                  </div>
//                              )
//                         })
//                   )
//              }
//              else{
//                  return (<div></div>);
//              }
//      }
//     // render(){
//     //     const menu = this.props.dishes.map((dish)=>{
//     //         return (
//     //             <div key={dish.id} className="col-12 col-md-5 m-1"> 
//     //              <Card key={dish.id} onClick={() => this.props.onClick(dish.id)}>
//     //                 <CardImg width="100%" src={dish.image} alt={dish.name} />
//     //                 <CardImgOverlay>
//     //                     <CardTitle>{dish.name}</CardTitle>
//     //                 </CardImgOverlay>
//     //             </Card>
//     //           </div>
//     //           );
//     //     });
//         // return(
//         //     <div className="container">
//         //         <div className="row">
//         //             {menu};
//         //         </div>
//         //         <div className="zip col-12 col-md-5 m-1">
//         //         <span className="tip">{this.renderDish(this.props.dish)}</span>
//         //         <div className="pin">
//         //         <h4>Comments</h4>
//         //         <h6>{this.renderComments(this.props.dish)}</h6>
//         //         </div> 
//         //         </div>
//         //     </div>
//         // );
//     //}
// };
export default Menu;


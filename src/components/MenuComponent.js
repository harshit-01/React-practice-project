///////////////// Presentational Component /////////////////////////
import React from 'react';
import { Card, CardImg, CardImgOverlay,
    CardTitle, Breadcrumb, BreadcrumbItem,Button,Row, Col, Label,Modal, ModalHeader,ModalBody,} from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';
import DishDetail from './DishdetailComponent';
import { Loading } from './LoadingComponent';

//const required = (val)=>(val)&&(val.length);
const minLength = (len)=>(val)=>(val)&&(val.length>=len);
const maxLength = (len)=>(val)=>(!val)||(val.length<=len);

class CommentForm extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            isOpen :false
        };
        this.toggleHandle= this.toggleHandle.bind(this);
        this.handleSubmit= this.handleSubmit.bind(this);
    }
    handleSubmit(values) {
        this.toggleHandle();
        console.log('Current State is: ' + JSON.stringify(values));
        var node = document.createElement('li');
        // var date = new Date();
        var date =new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date())
       // console.log(date)
        node.innerHTML =`Rating:${(values.rating)}${'<br/>'} ${date} ${'<br/>'}'Name:'${values.YourName}${'<br />'}${'Comment :'}${values.comment}`;
        //console.log(node);
        document.addEventListener('submit',()=>document.getElementById('comment').appendChild(node));
        //alert('Current State is: ' + JSON.stringify(values));
        // event.preventDefault();
    }
    toggleHandle(){
              this.setState({
                  isOpen:!this.state.isOpen
              })
    }
    render() {
        return(
            <div className="col-12 col-md-9  m-1">
                <Modal isOpen= {this.state.isOpen} toggle={this.toggleHandle}>
                    <ModalHeader toggle={this.toggleHandle}>
                        Submit Comment
                    </ModalHeader>
                    <ModalBody>
                         <LocalForm onSubmit={(values)=>this.handleSubmit(values)}>
                            <Row className="form-group">
                                 <Label md={4}>Rating</Label>&nbsp;
                                 <Col md={12}>
                                      <Control.select model=".rating" name="rating" className="form-control">
                                      <option>1</option>
                                      <option>2</option>
                                      <option>3</option>
                                      <option>4</option>
                                      <option>5</option>
                                      </Control.select>
                                 </Col>
                            </Row>
                            <Row className="form-group">
                                 <Label md={4} htmlFor="YourName">Your Name</Label>&nbsp;
                                 <Col md={12}>
                                      <Control.text model=".YourName" id="YourName" name="YourName" placeholder="Your Name" className="form-control" validators={{minLength:minLength(3),maxLength:maxLength(15)}}></Control.text>
                                 <Errors className="text-danger" showed="touched" model=".YourName"
                                          messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                          }}></Errors>
                                    </Col>
                             </Row>
                             <Row className="form-group">
                                 <Label md={4} htmlFor="comment">Comment</Label>&nbsp;
                                 <Col md={12}>
                                      <Control.textarea model=".comment" id="comment" name="comment" Row="6" className="form-control"></Control.textarea>
                                 </Col>
                             </Row>
                             <Row className="form-group">
                                <Col md={12}>
                                    <Button type="submit" color="primary">
                                       Submit
                                    </Button>
                                </Col>
                        </Row>
                         </LocalForm>
                    </ModalBody>
                </Modal>
                
                <Button type="submit" value="Submit" onClick={this.toggleHandle}><i class="fa fa-pencil" aria-hidden="true"> Submit Comment</i></Button>
            </div>
        )
    }
}

function RenderMenuItem ({dish, onClick}) {
    if (dish.isLoading) {
        return(
            <div className="container">
                <div className="row">            
                    <Loading />
                </div>
            </div>
        );
    }
    else if (dish.errMess) {
        return(
            <div className="container">
                <div className="row"> 
                    <div className="col-12">
                        <h4>{dish.errMess}</h4>
                    </div>
                </div>
            </div>
        );
    }
    else{
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
}

function renderDish(dish,isLoading,errMess){
    if (isLoading) {
        return(
            <div className="container">
                <div className="row">            
                    <Loading />
                </div>
            </div>
        );
    }
    else if (errMess) {
        return(
            <div className="container">
                <div className="row">            
                    <h4>{errMess}</h4>
                </div>
            </div>
        );
    }
    else {
    return (<DishDetail name={dish[0].name} description={dish[0].description} image={dish[0].image}/>)
        }
    }

function renderComments(comment,addComment,dishId){
    if(comment!=null){
       console.log(comment);
         return(
             <div id="comment">
               { comment.comments.map((co)=>{
                   //console.log(co['comment']);
                    return(
                        <div>
                        <p>{co.comment}</p><br></br>
                        <p>--{co.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(co.date)))}</p><br></br>
                        </div>
                    )
               })}
               <CommentForm addComment={addComment} dishId={dishId}/>
               </div>
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
        <span className="tip">{renderDish(props.dishes,props.isLoading,props.errMess)}</span>
        <div className="pin">
        <h4>Comments</h4>
        <h6 >{renderComments(props.dish,props.addComment,props.dishId)}</h6>
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


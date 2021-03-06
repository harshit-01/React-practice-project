import React,{Component} from 'react';
import { Breadcrumb, BreadcrumbItem,
    Button, Row, Col, Label } from 'reactstrap';
import { Control, Form, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';



const required = (val)=>val&&val.length;
const minLength = (len)=>(val)=>{console.log(val)
    return (val) && (val.length>=len)}; // here we use and operator instead of Or because val at the start is undefined and if we use Or then either val needs to be true or val.length needs to be true.But val.length can not be calculated at the start as val is undefined .  Hence here both conditions has to be true simultaneously. 
const maxLength = (len)=>(val)=>!(val) || (val.length<=len);
const isNumber = (val) => !isNaN(Number(val));
const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);


export class Contact extends Component{
     // eslint-disable-next-line
    constructor(props){
    super(props);
    }
    handleSubmit(values) {
        console.log('Current State is: ' + JSON.stringify(values));
        alert('Current State is: ' + JSON.stringify(values));
        this.props.postFeedback(values.firstname, values.lastname,values.email, values.telnum, values.message);
        console.log(values.firstname, values.lastname,values.email, values.telnum, values.messages)
        this.props.resetFeedbackForm();
        // event.preventDefault();
    }
    render(){
        //const errors =this.validate(this.state.firstname, this.state.lastname, this.state.telnum, this.state.email);
    return(
        <div className="container">
             <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                    <BreadcrumbItem active>Contact Us</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>Contact Us</h3>
                    <hr />
                </div>                
            </div>
            <div className="row row-content">
                <div className="col-12">
                <h3>Location Information</h3>
                </div>
                <div className="col-12 col-sm-4 offset-sm-1">
                        <h5>Our Address</h5>
                        <address>
                        121, Clear Water Bay Road<br />
                        Clear Water Bay, Kowloon<br />
                        HONG KONG<br />
                        <i className="fa fa-phone"></i>: +852 1234 5678<br />
                        <i className="fa fa-fax"></i>: +852 8765 4321<br />
                        <i className="fa fa-envelope"></i>: <a href="mailto:confusion@food.net">confusion@food.net</a>
                        </address>
                </div>
                <div className="col-12 col-sm-6 offset-sm-1">
                    <h5>Map of our Location</h5>
                </div>
                <div className="col-12 col-sm-11 offset-sm-1">
                    <div className="btn-group" role="group">
                        <a role="button" className="btn btn-primary" href="tel:+85212345678"><i className="fa fa-phone"></i> Call</a>
                        <a role="button" className="btn btn-info" href="mailto:confusion@food.net"><i className="fa fa-skype"></i> Skype</a>
                        <a role="button" className="btn btn-success" href="mailto:confusion@food.net"><i className="fa fa-envelope-o"></i> Email</a>
                    </div>
                </div>
            </div>
            <div className="row row-content">
                <div className="col-12">
                    <h3>Feedback Form</h3> 
                </div>
                <div className="col-12 col-md-9">
                    <Form model ="feedback" onSubmit={(values)=>this.handleSubmit(values)}>
                        <Row className="form-group">
                            <Label md={2} htmlFor="firstname">FirstName</Label>
                            <Col md={10}>
                                <Control.text model=".firstname" id="firstname" name="firstname" placeholder="First Name" 
                                className="form-control" validators={{
                                    required, minLength: minLength(3), maxLength: maxLength(15)
                                }}></Control.text>
                                <Errors
                                        className="text-danger"
                                        model=".firstname"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                     />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label md={2} htmlFor="lastname">LastName</Label>
                            <Col md={10}>
                                <Control.text model=".lastname" id="lastname" name="lastname" placeholder="Last Name" 
                                 className="form-control"  validators={{
                                    required, minLength: minLength(3), maxLength: maxLength(15)
                                }}></Control.text>
                                <Errors
                                        className="text-danger"
                                        model=".lastname"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                     />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label md={2} htmlFor="email">Email</Label>
                            <Col md={10}>
                                <Control.text model=".email" id="email" name="email" placeholder="Email" 
                                className="form-control" validators={{
                                    required, validEmail
                                }}></Control.text>
                                 <Errors
                                        className="text-danger"
                                        model=".email"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            validEmail: 'Invalid Email Address'
                                        }}
                                     />
                            </Col>
                        </Row>
                        <Row className="form-group">
                                <Label htmlFor="telnum" md={2}>Contact Tel.</Label>
                                <Col md={10}>
                                    <Control.text model=".telnum" id="telnum" name="telnum"
                                        placeholder="Tel. Number"
                                        className="form-control" validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15), isNumber
                                        }} /><Errors
                                        className="text-danger"
                                        model=".telnum"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 numbers',
                                            maxLength: 'Must be 15 numbers or less',
                                            isNumber: 'Must be a number'
                                        }}
                                     />
                                </Col>
                        </Row>
                        <Row className="form-group">
                            <Col md={{size:6,offset:2}}>
                                <div className="form-check">
                                <Label check>
                                <Control.checkbox model=".agree" name="agree"
                                className="form-check-input"/> {' '}
                                            <strong>May we contact you?</strong>
                                </Label>
                                </div>
                            </Col>
                            <Col md={{size: 3, offset: 1}}>
                                    <Control.select model=".contactType" name="contactType"
                                        className="form-control">
                                        <option>Tel.</option>
                                        <option>Email</option>
                                    </Control.select>
                                </Col>
                        </Row>
                           <Row className="form-group">
                            <Label md={2} htmlFor="message">Message</Label>
                            <Col md={10}>
                                <Control.textarea model=".message"  id="message" name="message"  row="12" className="form-control"></Control.textarea>
                            </Col>
                        </Row>
                        <Row className="form-group">
                                <Col md={{size: 10, offset: 2}}>
                                    <Button type="submit" color="primary">
                                        Send Feedback
                                    </Button>
                                </Col>
                        </Row>
                    </Form>
                </div>

            </div>
        </div>
    );
}
}


/*import React,{Component} from 'react';
import { Breadcrumb, BreadcrumbItem,
    Button, Row, Col, Label } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';


const required = (val)=>val&&val.length;
const minLength = (len)=>(val)=>{console.log(val)
    return (val) && (val.length>=len)}; // here we use and operator instead of Or because val at the start is undefined and if we use Or then either val needs to be true or val.length needs to be true.But val.length can not be calculated at the start as val is undefined .  Hence here both conditions has to be true simultaneously. 
const maxLength = (len)=>(val)=>!(val) || (val.length<=len);
const isNumber = (val) => !isNaN(Number(val));
const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);


 class Contact extends Component{
     constructor(props){
     super(props);
     }
    handleSubmit(values) {
        console.log('Current State is: ' + JSON.stringify(values));
        alert('Current State is: ' + JSON.stringify(values));
        // event.preventDefault();
    }
    render(){
        //const errors =this.validate(this.state.firstname, this.state.lastname, this.state.telnum, this.state.email);
    return(
        <div className="container">
             <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                    <BreadcrumbItem active>Contact Us</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>Contact Us</h3>
                    <hr />
                </div>                
            </div>
            <div className="row row-content">
                <div className="col-12">
                <h3>Location Information</h3>
                </div>
                <div className="col-12 col-sm-4 offset-sm-1">
                        <h5>Our Address</h5>
                        <address>
                        121, Clear Water Bay Road<br />
                        Clear Water Bay, Kowloon<br />
                        HONG KONG<br />
                        <i className="fa fa-phone"></i>: +852 1234 5678<br />
                        <i className="fa fa-fax"></i>: +852 8765 4321<br />
                        <i className="fa fa-envelope"></i>: <a href="mailto:confusion@food.net">confusion@food.net</a>
                        </address>
                </div>
                <div className="col-12 col-sm-6 offset-sm-1">
                    <h5>Map of our Location</h5>
                </div>
                <div className="col-12 col-sm-11 offset-sm-1">
                    <div className="btn-group" role="group">
                        <a role="button" className="btn btn-primary" href="tel:+85212345678"><i className="fa fa-phone"></i> Call</a>
                        <a role="button" className="btn btn-info" href="mailto:confusion@food.net"><i className="fa fa-skype"></i> Skype</a>
                        <a role="button" className="btn btn-success" href="mailto:confusion@food.net"><i className="fa fa-envelope-o"></i> Email</a>
                    </div>
                </div>
            </div>
            <div className="row row-content">
                <div className="col-12">
                    <h3>Feedback Form</h3> 
                </div>
                <div className="col-12 col-md-9">
                    <LocalForm onSubmit={(values)=>this.handleSubmit(values)}>
                        <Row className="form-group">
                            <Label md={2} htmlFor="firstname">FirstName</Label>
                            <Col md={10}>
                                <Control.Text model=".firstname" id="firstname" name="firstname" placeholder="First Name" 
                                className="form-control" validators={{
                                    required, minLength: minLength(3), maxLength: maxLength(15)
                                }}></Control.Text>
                                <Errors
                                        className="text-danger"
                                        model=".firstname"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                     />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label md={2} htmlFor="lastname">LastName</Label>
                            <Col md={10}>
                                <Control.Text model=".lastname" id="lastname" name="lastname" placeholder="Last Name" 
                                 className="form-control"  validators={{
                                    required, minLength: minLength(3), maxLength: maxLength(15)
                                }}></Control.Text>
                                <Errors
                                        className="text-danger"
                                        model=".lastname"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                     />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label md={2} htmlFor="email">Email</Label>
                            <Col md={10}>
                                <Control.Text model=".email" id="email" name="email" placeholder="Email" 
                                className="form-control" validators={{
                                    required, validEmail
                                }}></Control.Text>
                                 <Errors
                                        className="text-danger"
                                        model=".email"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            validEmail: 'Invalid Email Address'
                                        }}
                                     />
                            </Col>
                        </Row>
                        <Row className="form-group">
                                <Label htmlFor="telnum" md={2}>Contact Tel.</Label>
                                <Col md={10}>
                                    <Control.Text model=".telnum" id="telnum" name="telnum"
                                        placeholder="Tel. Number"
                                        className="form-control" validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15), isNumber
                                        }} /><Errors
                                        className="text-danger"
                                        model=".telnum"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 numbers',
                                            maxLength: 'Must be 15 numbers or less',
                                            isNumber: 'Must be a number'
                                        }}
                                     />
                                </Col>
                        </Row>
                        <Row className="form-group">
                            <Col md={{size:6,offset:2}}>
                                <div className="form-check">
                                <Label check>
                                <Control.Checkbox model=".agree" name="agree"
                                className="form-check-input"/> {' '}
                                            <strong>May we contact you?</strong>
                                </Label>
                                </div>
                            </Col>
                            <Col md={{size: 3, offset: 1}}>
                                    <Control.Select model=".contactType" name="contactType"
                                        className="form-control">
                                        <option>Tel.</option>
                                        <option>Email</option>
                                    </Control.Select>
                                </Col>
                        </Row>
                           <Row className="form-group">
                            <Label md={2} htmlFor="message">Message</Label>
                            <Col md={10}>
                                <Control.Textarea model=".message"  id="message" name="message"  row="12" className="form-control"></Control.Textarea>
                            </Col>
                        </Row>
                        <Row className="form-group">
                                <Col md={{size: 10, offset: 2}}>
                                    <Button type="submit" color="primary">
                                        Send Feedback
                                    </Button>
                                </Col>
                        </Row>
                    </LocalForm>
                </div>

            </div>
        </div>
    );
}
}

export default Contact;
*/
// class Contact extends Component{
//     constructor(props){
//     super(props);
//     this.state = {
//             firstname:'',
//             lastname:'',
//             telnum: '',
//             email: '',
//             agree: false,
//             contactType: 'Tel.',
//             message: '',
//             touched: {
//                 firstname: false,
//                 lastname: false,
//                 telnum: false,
//                 email: false
//             }
//         }
//          this.handleInputChange = this.handleInputChange.bind(this);
//          this.handleSubmit = this.handleSubmit.bind(this);
//          this.handleBlur = this.handleBlur.bind(this);
//     };
//     handleInputChange =function (event) {
//         const target = event.target;
//         const value = target.type === 'checkbox' ? target.checked : target.value;
//         console.log(target.checked)
//         const name = target.name;
//         this.setState(
//             {[name]:value}
//         )
//    }
//     handleSubmit = function(event) {
//         alert("Current state:"+JSON.stringify(this.state));       
//         event.preventDefault();
//     };
//     handleBlur=(fields)=>(events)=>{
//               this.setState=(
//                   {touched:{...this.state.touched,
//                     [fields]:true}}
//               ) 
//     }
//     validate(firstname, lastname, telnum, email){
//         const errors = {
//             firstname: '',
//             lastname: '',
//             telnum: '',
//             email: ''
//         };
//         if(this.state.firstname && firstname.length<=3){
//             errors.firstname= "First name should have more than 3 characters"
//         }
//         else if (this.state.firstname && firstname.length > 10)
//         errors.firstname = 'First Name should be <= 10 characters';

//         if(this.state.lastname && lastname.length<=3){
//             errors.lastname= "Last name should have more than 3 characters"
//         }
//         else if (this.state.lastname && lastname.length > 10)
//         errors.lastname = 'Last Name should be <= 10 characters';

//         if(this.state.email && email.split('').filter(x=>x==='@').length !==1){
//             errors.email= "Email should have contain @"
//         }
//         const reg = /^\d+$/;
//         if(this.state.telnum && !reg.test(telnum)){
//             errors.telnum= "Incorrect Telnum entered"
//         }
//         return errors;
//     }
//     render(){
//         const errors =this.validate(this.state.firstname, this.state.lastname, this.state.telnum, this.state.email);
//     return(
//         <div className="container">
//              <div className="row">
//                 <Breadcrumb>
//                     <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
//                     <BreadcrumbItem active>Contact Us</BreadcrumbItem>
//                 </Breadcrumb>
//                 <div className="col-12">
//                     <h3>Contact Us</h3>
//                     <hr />
//                 </div>                
//             </div>
//             <div className="row row-content">
//                 <div className="col-12">
//                 <h3>Location Information</h3>
//                 </div>
//                 <div className="col-12 col-sm-4 offset-sm-1">
//                         <h5>Our Address</h5>
//                         <address>
//                         121, Clear Water Bay Road<br />
//                         Clear Water Bay, Kowloon<br />
//                         HONG KONG<br />
//                         <i className="fa fa-phone"></i>: +852 1234 5678<br />
//                         <i className="fa fa-fax"></i>: +852 8765 4321<br />
//                         <i className="fa fa-envelope"></i>: <a href="mailto:confusion@food.net">confusion@food.net</a>
//                         </address>
//                 </div>
//                 <div className="col-12 col-sm-6 offset-sm-1">
//                     <h5>Map of our Location</h5>
//                 </div>
//                 <div className="col-12 col-sm-11 offset-sm-1">
//                     <div className="btn-group" role="group">
//                         <a role="button" className="btn btn-primary" href="tel:+85212345678"><i className="fa fa-phone"></i> Call</a>
//                         <a role="button" className="btn btn-info" href="#"><i className="fa fa-skype"></i> Skype</a>
//                         <a role="button" className="btn btn-success" href="mailto:confusion@food.net"><i className="fa fa-envelope-o"></i> Email</a>
//                     </div>
//                 </div>
//             </div>
//             <div className="row row-content">
//                 <div className="col-12">
//                     <h3>Feedback Form</h3> 
//                 </div>
//                 <div className="col-12 col-md-9">
//                     <Form onSubmit={this.handleSubmit}>
//                         <FormGroup row>
//                             <Label md={2} htmlFor="firstname">FirstName</Label>
//                             <Col md={10}>
//                                 <Input type="text" id="firstname" name="firstname" placeholder="First Name" 
//                                 value={this.state.firstname} onChange={this.handleInputChange} valid={errors.firstname ===''} invalid={errors.firstname !== ''} onBlur={this.handleBlur('firstname')}></Input>
//                                 <FormFeedback>{errors.firstname}</FormFeedback>
//                             </Col>
//                         </FormGroup>
//                         <FormGroup row>
//                             <Label md={2} htmlFor="lastname">LastName</Label>
//                             <Col md={10}>
//                                 <Input type="text" id="lastname" name="lastname" placeholder="Last Name" 
//                                 value={this.state.lastname} onChange={this.handleInputChange}  valid={errors.lastname ===''} invalid={errors.lastname !== ''} onBlur={this.handleBlur('lastname')}></Input>
//                                 <FormFeedback>{errors.lastname}</FormFeedback>
//                             </Col>
//                         </FormGroup>
//                         <FormGroup row>
//                             <Label md={2} htmlFor="email">Email</Label>
//                             <Col md={10}>
//                                 <Input type="text" id="email" name="email" placeholder="Email" 
//                                 value={this.state.email} onChange={this.handleInputChange}  valid={errors.email===''} invalid={errors.email !== ''} onBlur={this.handleBlur('email')}></Input>
//                                 <FormFeedback>{errors.email}</FormFeedback>
//                             </Col>
//                         </FormGroup>
//                         <FormGroup row>
//                                 <Label htmlFor="telnum" md={2}>Contact Tel.</Label>
//                                 <Col md={10}>
//                                     <Input type="tel" id="telnum" name="telnum"
//                                         placeholder="Tel. Number"
//                                         value={this.state.telnum}
//                                         valid={errors.telnum === ''}
//                                         invalid={errors.telnum !== ''}
//                                         onBlur={this.handleBlur('telnum')}
//                                         onChange={this.handleInputChange} />
//                                     <FormFeedback>{errors.telnum}</FormFeedback>
//                                 </Col>
//                             </FormGroup>
//                         <FormGroup row>
//                             <Col md={{size:6,offset:2}}>
//                                 <FormGroup check>
//                                 <Label check>
//                                 <Input type="checkbox" name="agree" checked={this.state.agree}
//                                     onChange={this.handleInputChange}/> {' '}
//                                             <strong>May we contact you?</strong>
//                                 </Label>
//                                 </FormGroup>
//                             </Col>
//                             <Col md={{size: 3, offset: 1}}>
//                                     <Input type="select" name="contactType"
//                                             value={this.state.contactType}
//                                             onChange={this.handleInputChange}>
//                                         <option>Tel.</option>
//                                         <option>Email</option>
//                                     </Input>
//                                 </Col>
//                         </FormGroup>
//                            <FormGroup row>
//                             <Label md={2} htmlFor="message">Message</Label>
//                             <Col md={10}>
//                                 <Input type="textarea" id="message" name="message"  row="12" value={this.state.message}onChange={this.handleInputChange}></Input>
//                             </Col>
//                         </FormGroup>
//                         <FormGroup row>
//                                 <Col md={{size: 10, offset: 2}}>
//                                     <Button type="submit" color="primary">
//                                         Send Feedback
//                                     </Button>
//                                 </Col>
//                             </FormGroup>
//                     </Form>
//                 </div>

//             </div>
//         </div>
//     );
// }
// }

// export default Contact;
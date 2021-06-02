import React ,{Component} from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Jumbotron,Button,Modal, ModalHeader,ModalBody,
    Form, FormGroup, Input, Label } from 'reactstrap';

// For grouping together large no of elements use React.Fragments
class Header extends Component {
           constructor(props){
               super(props);
               this.state={
                   isNavOpen: false,
                   isModalOpen:false
               }
               this.toggleNavbar = this.toggleNavbar.bind(this);
               this.toggleModal = this.toggleModal.bind(this);
               this.handleLogin = this.handleLogin.bind(this);

           }
           toggleNavbar(){
               this.setState({ isNavOpen:!this.state.isNavOpen });
           }
           toggleModal(){
            this.setState({ isModalOpen:!this.state.isModalOpen });
           }
            handleLogin(event){
                this.toggleModal();
                alert('Logged in')
                event.preventDefault();
            }
           render(){
               return(
                <React.Fragment>
                <div>
                   <Navbar dark expand="md">
                        <div className="container">
                        <NavbarToggler onClick={this.toggleNavbar}></NavbarToggler>
                        <NavbarBrand className="mr-auto" href="/"><img src='assets/images/logo.png' height="30" width="41" alt='Ristorante Con Fusion' /></NavbarBrand>
                        <Collapse isOpen={this.state.isNavOpen}  navbar>
                            <Nav navbar>
                            <NavItem>
                            <NavLink className="nav-link" to='/home'><span className="fa fa-home fa-lg"></span> Home</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink  className="nav-link" to='/aboutUs'><span className="fa fa-info fa-lg"></span> About Us</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink  className="nav-link" to='/menu'><span className="fa fa-list fa-lg"></span> Menu</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link" to='/contactUs'><span className="fa fa-address-card fa-lg"></span> Contact Us</NavLink>
                            </NavItem>
                            </Nav>
                            <Nav className="ml-auto" navbar>
                                 <NavItem>
                                     <Button outline onClick={this.toggleModal} color="primary"><span className="fa fa-sign-in fa-lg"></span> Login</Button>{console.log(this.state.isModalOpen)}
                                 </NavItem>
                            </Nav>
                            </Collapse>
                        </div>
                    </Navbar>
                    <Modal isOpen={this.state.isModalOpen} toggle= {this.toggleModal}>
                        <ModalHeader toggle= {this.toggleModal}> 
                        {/* because user might click on cross to close modal */}
                             Login
                        </ModalHeader>
                        <ModalBody>
                            <Form onSubmit={this.handleLogin}>
                                <FormGroup row>
                                    <Label htmlFor="username">Username</Label>
                                    <Input name="username" id="username" type="text" innerRef={(input) => this.username = input}></Input>
                                </FormGroup>
                                <FormGroup row>
                                    <Label htmlFor="password">Password</Label>
                                    <Input name="password" id="password" type="text" innerRef={(input) => this.password = input}></Input>
                                </FormGroup>
                                <FormGroup check>
                                <Label check>
                                    <Input type="checkbox" name="remember"
                                    innerRef={(input) => this.remember = input}  />
                                    Remember me
                                </Label>
                            </FormGroup>
                                <FormGroup row>
                                    <Button type="submit" value="submit" color="primary"><span className="fa fa-sign-in fa-lg"></span>Login</Button>
                                </FormGroup>
                            </Form>

                        </ModalBody>
                    </Modal>
                    <Jumbotron>
                        <div className="container">
                            <div className="row">
                                <div className="col-12 col-sm-6">
                                <h1>Ristorante con Fusion</h1>
                                <p>We take inspiration from the World's best cuisines, and create a unique fusion experience. Our lipsmacking creations will tickle your culinary senses!</p>
                                </div>
                            </div>
                        </div>
                    </Jumbotron>
                    </div>
                   </ React.Fragment>
               )
           }
}
export default Header
import React,{Component} from 'react';
import './App.css';
import Main from './components/MainComponent';
import { BrowserRouter } from 'react-router-dom';
import {ConfigureStore} from './redux/configureStore';
import { Provider } from 'react-redux'
// app is the parent class menu is the child class 
// We are lifting up the state so that all the information is directly available in the parent class 
//and any other child component can access it from here easily

// To do so we need to first create state for App also.
const store = ConfigureStore();
class App extends Component {
    //  constructor(props) {
    //    super(props);
    //    this.state = {
    //         dishes:DISHES
    //    }
    //  }
render() {
  return (
    // <div className="App">
    //    {/* <Navbar dark color="primary">
    //       <div className="container">
    //         <NavbarBrand href="/">RisTorante Confusion</NavbarBrand>
    //       </div>
    //     </Navbar> */}
    //     <Main />
    // </div>
    <Provider store={store}>
    <BrowserRouter>
      <div className="App">
        <Main />
      </div>
    </BrowserRouter>
    </Provider>
  );
}
}


export default App;

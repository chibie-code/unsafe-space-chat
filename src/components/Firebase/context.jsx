import React, { Component, createContext} from 'react';
import app from 'firebase/app';
import { auth } from 'firebase/auth';
 

export const withFirebase = Component => props => (
  <FirebaseContext.Consumer>
    {firebase => <Component {...props} firebase={firebase} />}
  </FirebaseContext.Consumer>
);

export const FirebaseContext = React.createContext({user: null});

class UserProvider extends Component {
  state = {
    user: null
  };

  componentDidMount = () => {
    auth.onAuthStateChanged(userAuth => {
      this.setState({ user: userAuth});
    });
};

render() {
  return(
    <FirebaseContext.Provider value={this.state.user}>
      {this.props.children}
    </FirebaseContext.Provider>
    );
  }
}
 
export default UserProvider;
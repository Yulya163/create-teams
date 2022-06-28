import { Component } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import { Login } from "./components/Login";

import UsersService from './services/usersService';

class App extends Component {

  usersService = new UsersService();

  state = {
    isAuthorization: true,
    isRegistration: false,
    isMessage: false,
    message: '',
    login: '',
    password: '',
    userId: null,
    users: this.usersService.getLocalStorageUsers() || []
  }


  handleInputLogin = (evt) => {
    this.setState({login: evt.target.value, isMessage: false, message: ''});
  }
  handleInputPassword = (evt) => {
    this.setState({password: evt.target.value, isMessage: false, message: ''});
  }
  onRegisterClick = (evt) => {
    this.setState({isRegistration: true, isAuthorization: false, isMessage: false});
  }
  onEnterClick = (evt) => {
    this.setState({isRegistration: false, isAuthorization: true, isMessage: false});
  }
  
  checkResponse = (log, pass) => {  
    const usersCurrent = this.usersService.getLocalStorageUsers();     
    if (usersCurrent) {
      const userIdCurrent = usersCurrent.find(user => user.login === log && user.password === pass);
      if (userIdCurrent) {
        this.setState({userId: userIdCurrent.userId, isAuthorization: false, isRegistration: false});      
      } else {
        this.setState({isMessage: true, message: 'Invalid login/password. Try again or sign up'});  
      }
    } else {
      this.setState({isMessage: true, message: 'Invalid login/password. Try again or sign up'});
    }
  }

  setUser = async () => {    
    if (this.state.users && this.state.users.some(user => user.login === this.state.login)) {
      await this.setState({isMessage: true, message: 'The login already exists. Enter a new one or sign in'});
    } else {
      if (this.state.login !== '' && this.state.password !== '') {
  
        const user = {
          userId: this.state.users.length + 1 || 1,
          login: this.state.login,
          password: this.state.password
        };         
        await this.setState({users: [...this.state.users, user], isMessage: false, login: '', password: '', userId: null});      
        await this.setState({isMessage: true, message: 'You have successfully registered'});    
      } else {
        await this.setState({isMessage: true, message: 'Enter correct login and password for sign up'});      
      }
      await this.usersService.setLocalStorageUsers(this.state.users);    
    }    
  }


  showMessage = (message) => {
    return (
      <h3 className="incorrect">{message}</h3>
    )
  }

  logOut = () => {
    this.setState({isAuthorization: true, login: '', password: '', userId: null, isMessage: false, message: ''});
  }

  // componentDidMount() {     
        
  //   const localStorageUsers = this.usersService.getLocalStorageUsers();
  //   console.log(localStorageUsers);
    
  //   if (localStorageUsers) {
  //     this.setState({ users: localStorageUsers });      
  //   }     
  // } 
  
  render() {
    //console.log(this.state.users);
    return (
      <div className="App">
        <Header/>
        {
          this.state.isAuthorization || this.state.isRegistration ? 
          <Login 
            login={this.state.login} 
            password={this.state.password} 
            handleInputLogin={this.handleInputLogin}
            handleInputPassword={this.handleInputPassword}
            checkResponse={this.checkResponse}
            isMessage={this.state.isMessage}
            isAuthorization={this.state.isAuthorization}
            isRegistration={this.state.isRegistration}
            onRegisterClick={this.onRegisterClick}
            onEnterClick={this.onEnterClick}
            setUser={this.setUser}
            users={this.state.users}
            showMessage={this.showMessage}
            message={this.state.message}
          /> : 
          <Main 
            userId={this.state.userId}
            login={this.state.login} 
            logOut={this.logOut}
          />
        }        
      </div>
    )
  }
}

export default App;

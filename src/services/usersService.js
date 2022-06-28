export default class UsersService {    
 
    setLocalStorageUsers = (users) => {
        localStorage.setItem('users', JSON.stringify(users));
    }
    getLocalStorageUsers = () => {
        return JSON.parse(localStorage.getItem('users'));
    }        
}
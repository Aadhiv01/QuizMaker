import decode from 'jwt-decode';
// import { useDispatch } from 'react-redux'
// import { cleanState } from '../../Redux/stateUpdater'

class AuthService {

    getProfile() {

      return this.getToken();
      
    }
  
    isloggedIn() {

      const token = this.getToken();
      return token && !this.isTokenExpired(token);

    }
  
    isTokenExpired(token) {

      try {
        const decoded = decode(token);
        if (decoded.exp < Date.now() / 1000) {
          localStorage.removeItem('login_token');
          return true;
        } else {
          return false;
        }
      } catch (err) {
        return false;
      }

    }
  
    getToken() {

      return localStorage.getItem('login_token');

    }
  
    login({token}) {

      localStorage.setItem('login_token', JSON.stringify(token));

    }
  
    logout() {

      localStorage.removeItem('login_token');

      // const dispatch = useDispatch();
      // dispatch(cleanState(undefined));

      window.location.assign('/');

    }

  }

export default new AuthService();
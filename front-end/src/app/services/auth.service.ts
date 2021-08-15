import {
  Injectable
} from '@angular/core';
import {
  HttpClient
} from '@angular/common/http';
import {
  BehaviorSubject
} from 'rxjs';
import {
  Router
} from '@angular/router';
import {
  User
} from '../models/User.model';
import { interval } from "rxjs";
import { debounce } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  

  isAuth$ = new BehaviorSubject < boolean > (this.checkLoginStatus());
  private authToken: string;
  private userId: string;

  constructor(private http: HttpClient,
    private router: Router) {}

  createUser(fullname: string, email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:8080/api/auth/signup', {
        fullname: fullname,
        email: email,
        password: password
      })
      .subscribe(
        (response: {
          message: string
        }) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }


  getToken() {
    return this.authToken;
  }

  loginUser(email: string, password) {
    return new Promise < void > ((resolve, reject) => {
      this.http.post('http://localhost:8080/api/auth/login', {
        email: email,
        password: password
      })
      .pipe(debounce(() => interval(1000)))
      .subscribe(
        (response: {
          token: string
        }) => {
          this.authToken = response.token;
          localStorage.setItem('token', response.token);
          localStorage.setItem('email', email);
          this.isAuth$.next(true);
          this.fetchUser()
          resolve()
        },
        (error) => {
          reject(error);
        }
      )
    })
  }

  fetchUser() {
      const email = localStorage.getItem('email')
      new Promise((resolve, reject) => {
        this.http.post('http://localhost:8080/api/user', {
          email: email
        }).subscribe(
          (user: User) => {
            resolve(user);
            localStorage.setItem('name', user.profile.fullname)
            localStorage.setItem('role', user.role)
            localStorage.setItem('userId', user.userId)
          },
          (error) => {
            reject(error);
          }
        );
      });
  }

  checkLoginStatus(){
    if(localStorage.getItem('token')){
      return true 
    } else {
      false
    }
  }

  logout() {
    localStorage.removeItem('email')
    localStorage.removeItem('userId')
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    localStorage.removeItem('name')
    this.authToken = null;
    this.userId = null;
    this.isAuth$.next(false);
    this.router.navigate(['login']);
  }


}

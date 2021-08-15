import {
  Component,
  OnInit
} from '@angular/core';
import {
  Location
} from '@angular/common';
import {
  NgbModal
} from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';
import {
  HttpClient
} from '@angular/common/http';
import { User } from '../models/User.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  isAuth: boolean;
  authSubscription: Subscription;

  fullname:string;

  isAside:boolean = false;
  

  constructor(private location: Location, private modalService: NgbModal, private auth: AuthService, private http: HttpClient) {
  }

  open(logout) {
    this.modalService.open(logout, {
      ariaLabelledBy: 'modal-basic-title'
    })
  }

  isSelected() {
    if (this.location.path() === '') {
      return 0
    }
    if (this.location.path().indexOf('/forum') > -1) {
      return 1
    }
    if (this.location.path().indexOf('/profile') > -1) {
      return 2
    }
  }

  ngOnInit(): void {
    this.authSubscription = this.auth.isAuth$.subscribe(
      (auth) => {
        this.isAuth = auth;
      }
      );
      this.onLogin()
    }

  onLogin(){
      const email = localStorage.getItem('email')
      new Promise((resolve, reject) => {
        this.http.post('http://localhost:8080/api/user', {email: email}).subscribe(
          (user: User)=> {
            resolve(user);
            this.fullname=user.profile.fullname
          },
          (error) => {
            reject(error);
          }
        );
      });
  }
  
  onLogout() {
    this.auth.logout();
  }

  asideToggle(){
    this.isAside = !this.isAside;
  }

}
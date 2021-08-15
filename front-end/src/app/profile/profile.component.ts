import {
  Component,
  OnInit
} from '@angular/core';
import {
  Location
} from '@angular/common';
import {
  HttpClient
} from '@angular/common/http';
import {
  User
} from '../models/User.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {

  fullname: string;
  job: string;

  constructor(private location: Location, private http: HttpClient) {}

  ngOnInit() {

    const email = localStorage.getItem('email')
    new Promise((resolve, reject) => {
      this.http.post('http://localhost:8080/api/user', {
        email: email
      }).subscribe(
        (user: User) => {
          resolve(user);
          this.fullname = user.profile.fullname
          this.job = user.profile.job
        },
        (error) => {
          reject(error);
        }
      );
    });

  }

}

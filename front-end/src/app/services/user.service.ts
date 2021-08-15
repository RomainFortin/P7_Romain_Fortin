import {
  Injectable
} from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpParams
} from '@angular/common/http';
import {
  Profile
} from '../models/Profile.model';
import {
  Router
} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private router: Router) {}

  profileUpdate(userId, fullname, job) {
    new Promise((resolve, reject) => {
      this.http.put('http://localhost:8080/api/profile/update', {
        userId: userId,
        fullname: fullname,
        job: job
      }).subscribe(
        (profile: Profile) => {
          resolve(profile);
          window.location.reload();
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  profileDelete() {
    const userId = localStorage.getItem('userId')
    let httpParams = new HttpParams().set("userId", userId);

    this.http.request('DELETE', 'http://localhost:8080/api/user/delete', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        userId: userId
      }
    }).subscribe()
    localStorage.removeItem('email')
    localStorage.removeItem('userId')
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    localStorage.removeItem('name')
    this.router.navigate(['login']);
  }

}

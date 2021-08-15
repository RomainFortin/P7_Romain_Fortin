import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Comment } from '../models/Comments.model';
import {
  HttpClient,
  HttpHeaders,
  HttpParams
} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  comments$ = new Subject<Comment[]>();

  constructor(private http: HttpClient) {}

  getComments(id: string) {
    return new Promise((resolve, reject) => {
    this.http.get('http://localhost:8080/api/comments/'+ id).subscribe(
      (comments: Comment[]) => {
        this.comments$.next(comments);
      },
      (error) => {
        this.comments$.next([]);
        console.error(error);
      }
    )
    });
  }

  createComments(comment: Comment, image:File) {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append('comments', JSON.stringify(comment));
      formData.append('image', image);
      this.http.post('http://localhost:8080/api/comments/create', formData).subscribe(
        (response: { message: string }) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  commentDelete(a) {
    let httpParams = new HttpParams().set("uuid", a);

    this.http.request('DELETE', 'http://localhost:8080/api/comment/delete/' + a, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }).subscribe()
    window.location.reload();
  }

}

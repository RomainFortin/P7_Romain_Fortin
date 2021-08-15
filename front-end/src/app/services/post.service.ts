import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Post } from '../models/Post.model';
import {
  HttpClient,
  HttpHeaders,
  HttpParams
} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  posts$ = new Subject<Post[]>();

  constructor(private http: HttpClient) {}

  getPosts() {
    this.http.get('http://localhost:8080/api/posts').subscribe(
      (posts: Post[]) => {
        this.posts$.next(posts);
      },
      (error) => {
        this.posts$.next([]);
        console.error(error);
      }
    )
  }

  createPost(post: Post, image:File) {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append('post', JSON.stringify(post));
      formData.append('image', image);
      this.http.post('http://localhost:8080/api/post/create', formData).subscribe(
        (response: { message: string }) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  postDelete(a) {
    let httpParams = new HttpParams().set("uuid", a);

    this.http.request('DELETE', 'http://localhost:8080/api/post/delete/' + a, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }).subscribe()
    window.location.reload();
  }
}

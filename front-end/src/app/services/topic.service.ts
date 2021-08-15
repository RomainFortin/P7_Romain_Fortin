import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Topic } from '../models/Topic.model';
import {
  HttpClient,
  HttpHeaders,
  HttpParams
} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class TopicService {

  topics$ = new Subject<Topic[]>();

  constructor(private http: HttpClient) {}

  getTopics() {
    this.http.get('http://localhost:8080/api/topics').subscribe(
      (topics: Topic[]) => {
        this.topics$.next(topics);
      },
      (error) => {
        this.topics$.next([]);
        console.error(error);
      }
    );
  }

  getTopicById(id: string) {
    return new Promise((resolve, reject) => {
      this.http.get('http://localhost:8080/api/topic/' + id).subscribe(
        (topic: Topic) => {
          resolve(topic);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  createTopic(topic: Topic, image:File) {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append('topic', JSON.stringify(topic));
      formData.append('image', image);
      this.http.post('http://localhost:8080/api/topic/create', formData).subscribe(
        (response: { message: string }) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  topicDelete(a) {
    let httpParams = new HttpParams().set("uuid", a);

    this.http.request('DELETE', 'http://localhost:8080/api/topic/delete/' + a, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }).subscribe()
    window.location.reload();
  }
}

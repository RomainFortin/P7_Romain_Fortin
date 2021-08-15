import { Component, OnInit } from '@angular/core';
import {
  NgbModal
} from '@ng-bootstrap/ng-bootstrap';
import { PostService } from '../services/post.service';
import { Subscription } from 'rxjs';
import { Post } from '../models/Post.model';
import * as moment from 'moment';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html'
})
export class PostComponent implements OnInit {

  postSub:Subscription;
  posts: Post[];
  
  constructor(private modalService: NgbModal,private post: PostService) { }

  ngOnInit(): void {
    this.postSub = this.post.posts$.subscribe(
      (posts) => {
        this.posts = posts;
        for(let i = 0; this.posts.length; i++){
          this.posts[i].createdAt=moment(this.posts[i].createdAt).format('DD/MM/YYYY');
        }
      },
      (error) => {
        console.log(error);
      },
    )
    this.post.getPosts();
    this.checkRole()
  }
   

  checkRole(){
    if(localStorage.getItem('role') == 'moderateur'){
     return true
    } else {
      return false
    }
  }

  open(content) {
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title'
    })
  }

  deletePost(a){
    this.post.postDelete(a)
  }


}


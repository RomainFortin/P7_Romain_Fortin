import {
  Component,
  OnInit
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import {
  Subscription
} from 'rxjs';
import {
  NgbModal
} from '@ng-bootstrap/ng-bootstrap';

import {
  Topic
} from '../../models/Topic.model';
import {
  TopicService
} from '../../services/topic.service';
import {
  CommentsService
} from '../../services/comments.service';
import {
  Comment
} from '../../models/Comments.model';
import {
  ActivatedRoute
} from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-topicView',
  templateUrl: './topicView.component.html'
})
export class TopicViewComponent implements OnInit {

  topicForm: FormGroup;
  imagePreview: string;
  message: string;

  routeParam: string;

  topic: Topic;

  CommentsSub: Subscription;
  comments: Comment[];

  constructor(private formBuilder: FormBuilder, private topics: TopicService, private comment: CommentsService, private route: ActivatedRoute, private modalService: NgbModal) {}

  ngOnInit(): void {

    this.topicForm = this.formBuilder.group({
      replyText: [null, [Validators.required]],
      image: [null]
    });

    this.route.params.subscribe(
      (params) => {
        this.topics.getTopicById(params.id).then(
            (topic: Topic) => {
              this.topic = topic;
              this.topic.createdAt = moment(this.topic.createdAt).format('DD/MM/YYYY');
            }
          ),
          (error) => {
            console.log(error);
          }
        this.routeParam = params.id
      }
    );
    this.CommentsSub = this.comment.comments$.subscribe(
      (comments) => {
        this.comments = comments;
      },
      (error) => {
        console.log(error);
      }
    );
    this.comment.getComments(this.routeParam);
    this.checkRole()
  }

  submitComment() {
    const newComment = new Comment();
    newComment.author = localStorage.getItem('name');
    newComment.text = this.topicForm.get('replyText').value;
    newComment.imageUrl = this.topicForm.get('image').value;
    this.route.params.subscribe(
      (params) => {
        newComment.fk_topicid = params.id
      }
    );

    this.comment.createComments(newComment, this.topicForm.get('image').value).then(
      
      (response: {
        message: string
      }) => {
        window.location.reload()
      }
    ).catch(
      (error) => {
        console.error(error);
      }
    );
  }

  onImageAdded(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.topicForm.get('image').setValue(file);
    this.topicForm.updateValueAndValidity();
    if (file.type.match(/image\/*.jpg|.jpeg|.png|.gif/) == null) {
      this.message = "Seuls les types JPEG, JPG et PNG sont supportés";
      this.imagePreview = null
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onImageRemoved() {
    this.imagePreview = null
    this.topicForm.get('image').setValue(null);
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

  deleteComment(a){
    this.comment.commentDelete(a)
  }

}

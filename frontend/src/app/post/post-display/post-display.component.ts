import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PostServiceService } from '../post-service.service';

@Component({
  selector: 'app-post-display',
  templateUrl: './post-display.component.html',
  styleUrls: ['./post-display.component.css']
})

export class PostDisplayComponent implements OnInit {

  posts: { _id: string, _username: string, username: string, _date: string, date: string, _department: string, department: string, _postContent: string, postContent: string, __v: string } [] = [];

  constructor(public postservice: PostServiceService) { }

  private postSubscription!: Subscription;

  ngOnInit(): void {
    this.postservice.getPostService();
    this.postSubscription = this.postservice.getUpdatedListener()
      .subscribe((posts: { _id: string, _username: string, username: string, _date: string, date: string, _department: string, department: string, _postContent: string, postContent: string, __v: string }[]) => {
        this.posts = posts;
      });
  }

  ngOnDestroy() {
    this.postSubscription.unsubscribe();
  }

  onDelete(postID: string) {
    console.log(postID);
    this.postservice.deletePostService(postID);
  }
}
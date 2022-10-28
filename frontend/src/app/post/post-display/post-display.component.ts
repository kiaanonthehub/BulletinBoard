import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PostServiceService } from '../post-service.service';

@Component({
  selector: 'app-post-display',
  templateUrl: './post-display.component.html',
  styleUrls: ['./post-display.component.css']
})

export class PostDisplayComponent implements OnInit {
  // private postdisplay:{ username: string, _username: string, date: string, _date: string, department: string, _department: string, postContent: string, _postContent: string }[] = [];
  posts: { username: string, _username: string, date: string, _date: string, department: string, _department: string, postContent: string, _postContent: string }[] = [];

  constructor(public postservice: PostServiceService) { }

  private postSubscription!: Subscription;

  ngOnInit(): void {
    this.postservice.getPostService();
    this.postSubscription = this.postservice.getUpdatedListener()
      .subscribe((posts: { username: string, _username: string, date: string, _date: string, department: string, _department: string, postContent: string, _postContent: string }[]) => {
        this.posts = posts;
      });
  }

  ngOnDestroy() {
    this.postSubscription.unsubscribe();
  }

  onDelete(postID: string) {
    this.postservice.deletePostService(postID);
  }
}
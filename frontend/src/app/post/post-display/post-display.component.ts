import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PostServiceService } from '../post-service.service';

@Component({
  selector: 'app-post-display',
  templateUrl: './post-display.component.html',
  styleUrls: ['./post-display.component.css']
})

export class PostDisplayComponent implements OnInit {

  posts: { _id: string, id: string, name: string, __v: string }[] = [];

  constructor(public postservice: PostServiceService) { }

  private postSubscription!: Subscription;

  ngOnInit(): void {
    this.postservice.getPostService();
    this.postSubscription = this.postservice.getUpdatedListener()
      .subscribe((posts: { _id: string, id: string, name: string, __v: string }[]) => {
        this.posts = posts;
      });
  }

  ngOnDestroy() {
    this.postSubscription.unsubscribe();
  }

  onDelete(fruitid: string) {
    this.postservice.deletePostService(fruitid);
  }
}
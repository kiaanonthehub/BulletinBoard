import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostServiceService {

  // private postdisplay: { _username: string, username: string, _date: string, date: string, _department: string, department: string, _postContent: string, postContent: string }[] = [];
  // private updatedPostDisplay = new Subject<{ _username: string, username: string, _date: string, date: string, _department: string, department: string, _postContent: string, postContent: string }[]>();

  private postdisplay: { _id: string, _username: string, username: string, _date: string, date: string, _department: string, department: string, _postContent: string, postContent: string, __v: string }[] = [];
  private updatedPostDisplay = new Subject<{ _id: string, _username: string, username: string, _date: string, date: string, _department: string, department: string, _postContent: string, postContent: string, __v: string }[]>();
  

  constructor(public http: HttpClient) { }

  // service to write new post
  addPostService(pusername: string, pdate: string, pdepartment:string, ppostContent:string) {
    this.http.post<{ message: string, posts: any }>('https://localhost:3000/api/posts', { username: pusername, date: pdate, department:pdepartment, postContent:ppostContent })
      .subscribe((thePost) => {
        this.postdisplay.push(thePost.posts);
        this.updatedPostDisplay.next([...this.postdisplay]);
      })
  }

  // service to retrieve post
  getPostService() {
    this.http.get<{ message: string, posts: any }>('https://localhost:3000/api/posts')
      .subscribe((thePost) => {
        this.postdisplay = thePost.posts
        this.updatedPostDisplay.next([...this.postdisplay]);
      })
  }

  // service to delete post
  deletePostService(postID: string) {
    this.http.delete('https://localhost:3000/api/posts/' + postID)
      .subscribe(() => {
        const updatedPostDeleted = this.postdisplay.filter(post => post._id !== postID);
        this.postdisplay = updatedPostDeleted;
        this.updatedPostDisplay.next([...this.postdisplay]);
      })
  }

  getUpdatedListener() {
    return this.updatedPostDisplay.asObservable();
  }

}

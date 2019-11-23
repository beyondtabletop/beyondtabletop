import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { format, parse } from 'date-fns';

@Component({
  selector: 'bt-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  public posts: any[]
  constructor(
    public http: HttpService
  ) { }

  async ngOnInit() {
    const data = await this.http.getLocalAsPromise('/assets/data/blog.json')
    this.posts = data.posts.map(post => {
      const formattedPost: any = {
        title: post.title,
        date: post.created_at,
        content: post.body,
      }

      if (post.attachments) {
        formattedPost.image = post.attachments[0].url
      }
      return formattedPost
    })
  }
}

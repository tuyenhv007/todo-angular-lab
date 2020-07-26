import {Component, OnInit} from '@angular/core';
import {IPost} from "../ipost";
import {PostService} from "../services/post.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css']
})
export class BlogDetailComponent implements OnInit {
  post: IPost;

  constructor(
    private postService: PostService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.postService.getPostById(id).subscribe(
      next => (this.post = next),

      error => {
        console.log(error);
        this.post = null;
      }
    )
  }
}

import {Component, OnInit} from '@angular/core';
import {IPost} from "../ipost";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PostService} from "../services/post.service";
import {cssScannerError} from "codelyzer/angular/styles/cssLexer";

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  postList: IPost[] = [];
  postForm: FormGroup;

  constructor(
    private postService: PostService,
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.postForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(10)]],
      body: ['', [Validators.required, Validators.minLength(10)]]
    });
    this.postService.getPosts().subscribe(
      next =>
        (this.postList = next),
      error =>
        (this.postList = []));
  }

  onSubmit() {
    if (this.postForm.valid) {
      const {value} = this.postForm;
      this.postService.createPost(value).subscribe(next => {
        this.postList.unshift(next);
        this.postForm.reset({
          title: '',
          body: ''
        });
      }, error => console.log(error));
    }
  }


  deletePost(i) {
    const post = this.postList[i];
    this.postService.deletePost(post.id).subscribe(() => {
      this.postList = this.postList.filter(title => title.id !== post.id);
    });
  }

  get title() {
    return this.postForm.get('title');
  }

  get body() {
    return this.postForm.get('body');
  }

}

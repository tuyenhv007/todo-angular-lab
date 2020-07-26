import {Component, OnInit} from '@angular/core';
import {IPost} from "../ipost";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PostService} from "../services/post.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-blog-edit',
  templateUrl: './blog-edit.component.html',
  styleUrls: ['./blog-edit.component.css']
})
export class BlogEditComponent implements OnInit {
  post: IPost;
  editForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostService
  ) {
  }

  ngOnInit(): void {
    this.editForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(10)]],
      body: ['', [Validators.required, Validators.minLength(10)]]
    });
    const id = +this.route.snapshot.paramMap.get('id');
    this.postService.getPostById(id).subscribe(
      next => {
      this.post = next;
      this.editForm.patchValue(this.post);
    }, error => {
      console.log(error);
      this.post = null;
    });
  }

  onSubmit() {
    if (this.editForm.valid) {
      const {value} = this.editForm;
      const data = {
        ...this.post,
        ...value
      };
      this.postService.updatePost(data).subscribe(
        next => {
          this.router.navigate(['blog']);
        },
        error => {
          console.log(error);
        });
    }
  }


  get title() {
    return this.editForm.get('title');
  }

  get body() {
    return this.editForm.get('body');
  }

}

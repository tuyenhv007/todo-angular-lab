import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {APP_BASE_HREF} from '@angular/common';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {TodoComponent} from './todo/todo.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RegisterComponent} from './register/register.component';
import { BlogComponent } from './blog/blog.component';
import { BlogEditComponent } from './blog-edit/blog-edit.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import {HttpClientModule} from "@angular/common/http";
import { MenuComponent } from './core/menu/menu.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    RegisterComponent,
    BlogComponent,
    BlogEditComponent,
    BlogDetailComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [{provide: APP_BASE_HREF, useValue: '/'}],
  bootstrap: [AppComponent]
})
export class AppModule {
}

import { NgModule } from '@angular/core';
import { BlSearchGoogleLikeComponent } from './components/bl-search-google-like/bl-search-google-like.component';
import { BrowserModule }  from '@angular/platform-browser';
import { GoogleLikeFilterPipe } from './pipes/google-like-filter.pipe';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [BlSearchGoogleLikeComponent, GoogleLikeFilterPipe],
  imports: [
    FormsModule,
    BrowserModule,
    CommonModule
  ],
  exports: [BlSearchGoogleLikeComponent, GoogleLikeFilterPipe]
})
export class BrniLibraryModule { }

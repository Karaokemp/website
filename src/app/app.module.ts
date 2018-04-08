import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { YoutubeDownloaderComponent } from './youtube-downloader/youtube-downloader.component';
import { FilesService } from './services/files.service';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {HttpClientModule} from '@angular/common/http';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    AppComponent,
    YoutubeDownloaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    CommonModule
  ],
  providers: [FilesService,HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }

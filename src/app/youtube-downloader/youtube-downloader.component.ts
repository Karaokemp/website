import { Component, OnInit } from '@angular/core';
import { FilesService } from '../services/files.service';
import { async } from '@angular/core/testing';
import { AsyncPipe } from '@angular/common';



@Component({
  selector: 'app-youtube-downloader',
  templateUrl: './youtube-downloader.component.html',
  styleUrls: ['./youtube-downloader.component.css']
})
export class YoutubeDownloaderComponent implements OnInit {

  link='';
  response=null;

  constructor(private files:FilesService) { }

  ngOnInit() {
  }

  sendLink(){
    
  this.response =  this.files.sendYoutubeLink(this.link);
  }
  

}

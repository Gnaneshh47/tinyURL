import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SocketServices } from '../services/socket-services';

@Component({
  selector: 'app-tiny-url',
  imports: [FormsModule, CommonModule],
  templateUrl: './tiny-url.html',
})
export class TinyURL implements OnInit {
  formData = {
    url: '',
    privacy: 'public'
  };
  result: any;


  constructor(private toastr: ToastrService, private socketService: SocketServices) { }

  ngOnInit(): void {
    this.loadAll();
  }

  urls: any[] = [];

  loadAll() {
    this.socketService.getAll().subscribe(data => {
      this.urls = data;
    });
  }

  createUrl() {
    this.socketService.create({ originalUrl: this.formData.url }).subscribe(res => {
      if(res.shortCode == null || res.shortCode == '' || res.shortCode == undefined)
        this.toastr.error('Error occured while creating short URL', 'Error');
      else
      {
        this.result = res.shortCode;
        this.loadAll()
      }
      });
  }

  async copy(text: string) {
    await navigator.clipboard.writeText(text);
    this.toastr.info('Copied to clipboard!', 'Copied');
  }
}

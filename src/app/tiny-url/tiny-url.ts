import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SocketServices } from '../services/socket-services';

const API_BASE_URL = 'https://tiny-url-47.azurewebsites.net/';

@Component({
  selector: 'app-tiny-url',
  imports: [FormsModule, CommonModule],
  templateUrl: './tiny-url.html',
})
export class TinyURL implements OnInit {
  formData = {
    OriginalUrl: '',
    IsPrivate: false
  };
  result: any;
  API_BASE: string = API_BASE_URL;
  searchText: string = '';

  constructor(private toastr: ToastrService, private socketService: SocketServices) { }

  ngOnInit(): void {
    this.loadAll();
  }

  urls: any[] = [];

  get filteredUrls(): any[] {
    if (!this.searchText.trim()) {
      return this.urls;
    }
    const query = this.searchText.toLowerCase();
    return this.urls.filter(url => 
      url.originalUrl.toLowerCase().includes(query) ||
      url.shortCode.toLowerCase().includes(query)
    );
  }

  loadAll() {
    this.socketService.getAll().subscribe(data => {
      this.urls = data;
    });
  }

  createUrl() {

    var params = {
      OriginalUrl: this.formData.OriginalUrl,
      IsPrivate: this.formData.IsPrivate? true: false
    }

    this.socketService.create(params).subscribe(data => {
      if(data == 'Created'){
          this.toastr.success('Short URL generated successfully', 'Success');
          this.loadAll()
      }
      else{
          this.toastr.error('Error occured while generating Short URL', 'failed');
      }
    });
  }

  deleteURL(shortCode: any) {

    

    this.socketService.delete(shortCode).subscribe(data => {
      if(data == 'Deleted'){
          this.toastr.success('Short URL deleted successfully', 'Success');
          this.loadAll()
      }
      else{
          this.toastr.error('Error occured while deleting Short URL', 'failed');
      }
    });
  }

  async copy(text: string) {
    
    await navigator.clipboard.writeText(this.API_BASE + text);
    this.toastr.info('Copied to clipboard!', 'Copied');
  }
}

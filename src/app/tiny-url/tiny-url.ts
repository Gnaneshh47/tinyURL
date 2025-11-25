import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tiny-url',
  imports: [FormsModule,CommonModule],
  templateUrl: './tiny-url.html',
  styleUrl: './tiny-url.scss',
})
export class TinyURL {
  formData = {
    url: '',
    privacy: 'public'
  };

  constructor(private toastr: ToastrService) {}

  urls: any[] = [];

  createShortUrl() {
    // TODO: Call your .NET API here

    const shortUrl = "https://short.ly/" + Math.random().toString(36).substring(2, 7);

    this.urls.push({
      originalUrl: this.formData.url,
      shortUrl,
      privacy: this.formData.privacy
    });

    // Reset URL field (optional)
    this.formData.url = '';
  }

  async copy(text: string) {
    await navigator.clipboard.writeText(text);
    this.toastr.info('Copied to clipboard!', 'Copied');
  }
}

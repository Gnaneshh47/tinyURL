# Write a detailed README for this project
## Overview
tinyURL is a URL shortening service that converts long URLs into compact, shareable links.

## Features
- Generate short URL codes from long URLs
- Redirect short URLs to original destinations
- Track URL creation and usage statistics
- Simple and intuitive API

## Installation
```bash
npm install
```

## Usage
```javascript
const tinyURL = require('./src');
const shortUrl = tinyURL.shorten('https://example.com/very/long/url');
console.log(shortUrl); // Returns shortened URL
```

## API Documentation
- `shorten(url)` - Creates a shortened URL
- `expand(shortCode)` - Retrieves the original URL
- `getStats(shortCode)` - Returns usage statistics

## Testing
```bash
npm test
```
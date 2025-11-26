export interface CreateShortRequest {
  originalUrl: string;
  expiresAt?: string | null;
}

export interface  ShortUrlInfo {
  shortCode: string;
  originalUrl: string;
  createdAt: string;
  visitCount: number;
  isActive: boolean;
}
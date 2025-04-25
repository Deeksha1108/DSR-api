import { Injectable } from '@nestjs/common';
import { createClient } from 'redis';

@Injectable()
export class RedisService {
  private client = createClient({ url: process.env.REDIS_URL });

  constructor() {
    this.client.connect();
  }

  async set(key: string, value: string, ttl?: number) {
    await this.client.set(key, value);
    if (ttl) await this.client.expire(key, ttl);
  }

  async get(key: string): Promise<string | null> {
    return this.client.get(key);
  }

  async del(key: string) {
    await this.client.del(key);
  }
}
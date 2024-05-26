import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class DatabaseService {
  private db: object;
  private readonly PATH: string = path.join(process.cwd(), './src/modules/database/db.json');

  constructor() {
    this.init();
  }

  private init(): void {
    try {
      const data = fs.readFileSync(this.PATH, 'utf8');
      this.db = JSON.parse(data);
    } catch (error) {
      console.error('Error initializing database:', error.message);
      this.db = {};
    }
  }

  public getData(): any {
    return this.db;
  }

  public setData(data: any): void {
    this.db = data;
  }

  public save(): void {
    fs.writeFileSync(this.PATH, JSON.stringify(this.db), 'utf8');
  }
}

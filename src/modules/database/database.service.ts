import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { Database } from '../interfaces';

@Injectable()
export class DatabaseService {
  private static db: Database;
  private static filePath = path.join(__dirname, './db.json');

  static init(): void {
    this.db = JSON.parse(fs.readFileSync(this.filePath, 'utf8'));
  }

  static getData(): Database {
    return this.db;
  }

  static setData(data: Database): void {
    this.db = data;
  }

  static saveToDisk(): void {
    fs.writeFileSync(this.filePath, JSON.stringify(this.db), 'utf8');
  }
}

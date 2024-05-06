import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class DatabaseService {
  private static db: any;
  private static readonly PATH: string = path.join(
    process.cwd(),
    './src/modules/database/db.json'
  );

  public static init(): void {
    this.db = JSON.parse(fs.readFileSync(this.PATH, 'utf8'));
  }

  public static getData(): any {
    return this.db;
  }

  public static setData(data: any): void {
    this.db = data;
  }

  public static save(): void {
    fs.writeFileSync(this.PATH, JSON.stringify(this.db), 'utf8');
  }
}

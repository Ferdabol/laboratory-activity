import { Injectable } from '@nestjs/common';
import { db } from '../firebase.config';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  private bookCollection = db.collection('books');

  //  CREATE
  async create(data: CreateBookDto) {
    const docRef = await this.bookCollection.add(data);
    return { id: docRef.id, ...data };
  }

  //  GET ALL
  async findAll() {
    const snapshot = await this.bookCollection.get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  //  GET ONE
  async findOne(id: string) {
    const doc = await this.bookCollection.doc(id).get();
    return doc.exists ? { id: doc.id, ...doc.data() } : null;
  }

  //  UPDATE
  async update(id: string, data: UpdateBookDto) {
    await this.bookCollection.doc(id).update({ ...data } as any);
    return { id, ...data };
  }

  //  DELETE
  async remove(id: string) {
    await this.bookCollection.doc(id).delete();
    return { deleted: true };
  }
}
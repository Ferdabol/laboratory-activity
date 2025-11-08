import { Injectable } from '@nestjs/common';
import { db } from '../firebase.config';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

@Injectable()
export class AuthorsService {
  private authorCollection = db.collection('authors');

  //  CREATE
  async create(data: CreateAuthorDto) {
    const docRef = await this.authorCollection.add(data);
    return { id: docRef.id, ...data };
  }

  //  GET ALL
  async findAll() {
    const snapshot = await this.authorCollection.get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  //  GET ONE
  async findOne(id: string) {
    const doc = await this.authorCollection.doc(id).get();
    if (!doc.exists) {
      return null;
    }
    return { id: doc.id, ...doc.data() };
  }

  //  UPDATE
  async update(id: string, data: UpdateAuthorDto) {
    await this.authorCollection.doc(id).update({ ...data } as any);
    return { id, ...data };
  }

  //  DELETE
  async remove(id: string) {
    await this.authorCollection.doc(id).delete();
    return { deleted: true };
  }
}

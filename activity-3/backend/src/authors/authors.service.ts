import { Injectable } from '@nestjs/common';
import { db } from '../firebase.config';

@Injectable()
export class AuthorsService {
  private authorCollection = db.collection('authors');

  async create(data: any) {
    const docRef = await this.authorCollection.add(data);
    return { id: docRef.id, ...data };
  }

  async findAll() {
    const snapshot = await this.authorCollection.get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  async findOne(id: string) {
    const doc = await this.authorCollection.doc(id).get();
    if (!doc.exists) {
      return null;
    }
    return { id: doc.id, ...doc.data() };
  }

  async update(id: string, data: any) {
    await this.authorCollection.doc(id).update(data);
    return { id, ...data };
  }

  async remove(id: string) {
    await this.authorCollection.doc(id).delete();
    return { deleted: true };
  }
}

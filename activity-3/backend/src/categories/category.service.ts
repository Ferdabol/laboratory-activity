import { Injectable } from '@nestjs/common';
import { db } from '../firebase.config';

@Injectable()
export class CategoryService {
  private categoryCollection = db.collection('categories'); // firestore collection

  async create(data: any) {
    const docRef = await this.categoryCollection.add(data);
    return { id: docRef.id, ...data };
  }

  async findAll() {
    const snapshot = await this.categoryCollection.get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  async findOne(id: string) {
    const doc = await this.categoryCollection.doc(id).get();
    if (!doc.exists) return null;
    return { id: doc.id, ...doc.data() };
  }

  async update(id: string, data: any) {
    await this.categoryCollection.doc(id).update(data);
    return { id, ...data };
  }

  async remove(id: string) {
    await this.categoryCollection.doc(id).delete();
    return { deleted: true };
  }
}

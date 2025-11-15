import { Injectable } from '@nestjs/common';
import { db } from '../firebase.config';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  private categoryCollection = db.collection('categories'); // firestore collection

  async create(data: CreateCategoryDto) {
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

  async update(id: string, data: UpdateCategoryDto) {
    await this.categoryCollection.doc(id).update({ ...data } as any);
    return { id, ...data };
  }

  async remove(id: string) {
    await this.categoryCollection.doc(id).delete();
    return { deleted: true };
  }
}

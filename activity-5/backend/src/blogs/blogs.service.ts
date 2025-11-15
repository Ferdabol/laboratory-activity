import { Injectable } from '@nestjs/common';
import { db } from '../firebase.config';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class BlogsService {
  private postCollection = db.collection('post');
  private commentCollection = db.collection('comments');

  async createPost(data: CreateBlogDto) {
    const postData = {
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      commentsCount: 0
    };
    const docRef = await this.postCollection.add(postData);
    return { id: docRef.id, ...postData };
  }

  async getAllPosts() {
    const snapshot = await this.postCollection.orderBy('createdAt', 'desc').get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  async getPostById(id: string) {
    const doc = await this.postCollection.doc(id).get();
    if (!doc.exists) return null;
    return { id: doc.id, ...doc.data() };
  }

  async updatePost(id: string, data: UpdateBlogDto) {
    const updateData = {
      ...data,
      updatedAt: new Date().toISOString()
    };
    await this.postCollection.doc(id).update(updateData as any);
    return { id, ...updateData };
  }

  async deletePost(id: string) {
    // Delete all comments associated with the post
    const commentsSnapshot = await this.commentCollection.where('postId', '==', id).get();
    const deletePromises = commentsSnapshot.docs.map(doc => doc.ref.delete());
    await Promise.all(deletePromises);
    
    // Delete the post
    await this.postCollection.doc(id).delete();
    return { deleted: true, message: 'Post and associated comments deleted successfully' };
  }

  async createComment(data: CreateCommentDto) {
    const commentData = {
      ...data,
      createdAt: new Date().toISOString()
    };
    const docRef = await this.commentCollection.add(commentData);
    
    // Increment comment count on the post
    const postRef = this.postCollection.doc(data.postId);
    const postDoc = await postRef.get();
    if (postDoc.exists) {
      const currentCount = postDoc.data()?.commentsCount || 0;
      await postRef.update({ commentsCount: currentCount + 1 });
    }
    
    return { id: docRef.id, ...commentData };
  }

  async getCommentsByPostId(postId: string) {
    const snapshot = await this.commentCollection
      .where('postId', '==', postId)
      .orderBy('createdAt', 'desc')
      .get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  async deleteComment(commentId: string, postId: string) {
    await this.commentCollection.doc(commentId).delete();
    
    // Decrement comment count on the post
    const postRef = this.postCollection.doc(postId);
    const postDoc = await postRef.get();
    if (postDoc.exists) {
      const currentCount = postDoc.data()?.commentsCount || 0;
      await postRef.update({ commentsCount: Math.max(0, currentCount - 1) });
    }
    
    return { deleted: true };
  }
}
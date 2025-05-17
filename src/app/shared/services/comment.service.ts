import { Injectable } from '@angular/core';
import { Comment } from '../../model/comment';
import { Firestore, collection, doc, addDoc, updateDoc, deleteDoc, getDocs, query, orderBy, getDoc, where, limit } from '@angular/fire/firestore';
import { take, firstValueFrom } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private readonly COMMENTS_COLLECTION = 'Comments';
  private readonly USERS_COLLECTION = 'Users';

  constructor(private authService: AuthService, private firestore: Firestore) { }

  async addComment(comment: Partial<Comment>): Promise<Comment> {
    try {
      const user = await firstValueFrom(this.authService.currentUser.pipe(take(1)));
      if (!user) {
        throw new Error('No authenticated user found');
      }

      const commentCollection = collection(this.firestore, this.COMMENTS_COLLECTION);
      
      const commentToSave = {
        ...comment,
        writtenBy: user.uid,
        createdTime: new Date(Date.now())
      };
      
      const docRef = await addDoc(commentCollection, commentToSave);
      const commentId = docRef.id;
      
      await updateDoc(docRef, { id: commentId });
      console.log("Added new comment");

      const newComment = {
        ...commentToSave,
        id: commentId
      } as Comment;

      return newComment;
    } catch (error) {
      console.error('Error adding comment:', error);
      throw error;
    }
  }

  async getAllCommentsByArticleId(articleId:string): Promise<Comment[]> {
    try {
      const commentCollection = collection(this.firestore, this.COMMENTS_COLLECTION);
      const comments: Comment[] = [];
      const q = query(
        commentCollection,
        where('articleId', '==', articleId),
        where('replyTo', '==', ''),
        orderBy('createdTime', 'desc')
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(doc => {
        comments.push({ ...doc.data(), id: doc.id } as Comment);
      });
      return comments;
    } catch (error) {
      console.error('Error fetching comment:', error);
      return [];
    }
  }

  async getAllReplys(commentId:string): Promise<Comment[]> {
    try {
      const commentCollection = collection(this.firestore, this.COMMENTS_COLLECTION);
      const comments: Comment[] = [];
      const q = query(
        commentCollection,
        where('replyTo', '==', commentId),
        orderBy('createdTime', 'desc')
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(doc => {
        comments.push({ ...doc.data(), id: doc.id } as Comment);
      });
      return comments;
    } catch (error) {
      console.error('Error fetching comment:', error);
      return [];
    }
  }

  async deleteComment(commentId: string): Promise<void> {
    try {
      const user = await firstValueFrom(this.authService.currentUser.pipe(take(1)));
      if (!user) {
        throw new Error('No authenticated user found');
      }
      const userDocRef = doc(this.firestore, this.USERS_COLLECTION, user.uid);
      const userDoc = await getDoc(userDocRef);
      if (!userDoc.exists()) {
        throw new Error('User not found');
      }

      let replys :Comment[] = await this.getAllReplys(commentId);
      for(let i=0; i<replys.length; i++){
        await this.deleteReply(replys[i].id);
      }

      const commentDocRef = doc(this.firestore, this.COMMENTS_COLLECTION, commentId);
      const commentSnapshot = await getDoc(commentDocRef);
      if (commentSnapshot.exists() && commentSnapshot.data()['writtenBy'] == user.uid) {
        await deleteDoc(commentDocRef);
      }else{
        throw new Error('Comment does not belong to the user');
      }
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error;
    }
  }

  async deleteReply(replyId: string): Promise<void> {
    try {
      const user = await firstValueFrom(this.authService.currentUser.pipe(take(1)));
      if (!user) {
        throw new Error('No authenticated user found');
      }
      const userDocRef = doc(this.firestore, this.USERS_COLLECTION, user.uid);
      const userDoc = await getDoc(userDocRef);
      if (!userDoc.exists()) {
        throw new Error('User not found');
      }

      const commentDocRef = doc(this.firestore, this.COMMENTS_COLLECTION, replyId);
      const commentSnapshot = await getDoc(commentDocRef);
      if (commentSnapshot.exists() && commentSnapshot.data()['writtenBy'] == user.uid) {
        await deleteDoc(commentDocRef);
      }else{
        throw new Error('Comment does not belong to the user');
      }
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error;
    }
  }

}

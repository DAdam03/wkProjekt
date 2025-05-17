import { Injectable } from '@angular/core';
import { Article } from '../../model/article';
import { Firestore, collection, doc, addDoc, updateDoc, deleteDoc, getDocs, query, orderBy, getDoc, where, limit } from '@angular/fire/firestore';
import { take, firstValueFrom } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private readonly ARTICLES_COLLECTION = 'Articles';
  private readonly USERS_COLLECTION = 'Users';

  constructor(private authService: AuthService, private firestore: Firestore) { }

  // CREATE
  async addArticle(article: Partial<Article>): Promise<Article> {
    try {
      const user = await firstValueFrom(this.authService.currentUser.pipe(take(1)));
      if (!user) {
        throw new Error('No authenticated user found');
      }

      const articleCollection = collection(this.firestore, this.ARTICLES_COLLECTION);
      
      const articleToSave = {
        ...article,
        authorId: user.uid,
        createdTime: new Date(Date.now())
      };
      
      const docRef = await addDoc(articleCollection, articleToSave);
      const articleId = docRef.id;
      
      await updateDoc(docRef, { id: articleId });
      
      const newArticle = {
        ...articleToSave,
        id: articleId
      } as Article;

      return newArticle;
    } catch (error) {
      console.error('Error adding article:', error);
      throw error;
    }
  }

  async getAllArticles(): Promise<Article[]> {
    try {
      const articleCollection = collection(this.firestore, this.ARTICLES_COLLECTION);
      const articles: Article[] = [];
      const q = query(
        articleCollection,
        orderBy('createdTime', 'desc')
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(doc => {
        articles.push({ ...doc.data(), id: doc.id } as Article);
      });
      return articles;
    } catch (error) {
      console.error('Error fetching articles:', error);
      return [];
    }
  }

  async getLatestArticles(): Promise<Article[]> {
    try {
      const articleCollection = collection(this.firestore, this.ARTICLES_COLLECTION);
      const articles: Article[] = [];
      const q = query(
        articleCollection,
        orderBy('createdTime', 'desc'),
        limit(5)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(doc => {
        articles.push({ ...doc.data(), id: doc.id } as Article);
      });
      return articles;
    } catch (error) {
      console.error('Error fetching articles:', error);
      return [];
    }
  }


  async getArticlesOfCurrentUser(): Promise<Article[]> {
    try {
      const user = await firstValueFrom(this.authService.currentUser.pipe(take(1)));
      if (!user) {
        throw new Error('No authenticated user found');
      }

      const articleCollection = collection(this.firestore, this.ARTICLES_COLLECTION);
      const articles: Article[] = [];
      const q = query(
        articleCollection,
        where('authorId', '==', user.uid),
        orderBy('createdTime', 'desc'),
        limit(5)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(doc => {
        articles.push({ ...doc.data(), id: doc.id } as Article);
      });
      return articles;
    } catch (error) {
      console.error('Error fetching articles:', error);
      return [];
    }
  }

  async getArticleById(articleId: string): Promise<Article | null> {
    try {
      const articleDocRef = doc(this.firestore, this.ARTICLES_COLLECTION, articleId);
      const articleSnapshot = await getDoc(articleDocRef);
      if (articleSnapshot.exists()) {
        return { ...articleSnapshot.data(), id: articleId } as Article;
      }
      return null;
    } catch (error) {
      console.error('Error fetching task:', error);
      return null;
    }
  }

  async updateArticle(articleId: string, updatedData: Partial<Article>): Promise<void> {
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

      const dataToUpdate: any = { ...updatedData };

      const articleDocRef = doc(this.firestore, this.ARTICLES_COLLECTION, articleId);
      const articleSnapshot = await getDoc(articleDocRef);
      if (articleSnapshot.exists() && articleSnapshot.data()['authorId'] == user.uid) {
        return updateDoc(articleDocRef, dataToUpdate);
      }else{
        throw new Error('Article does not belong to the user');
      }
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  }

  async deleteArticle(articleId: string): Promise<void> {
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

      const articleDocRef = doc(this.firestore, this.ARTICLES_COLLECTION, articleId);
      const articleSnapshot = await getDoc(articleDocRef);
      if (articleSnapshot.exists() && articleSnapshot.data()['authorId'] == user.uid) {
        await deleteDoc(articleDocRef);
      }else{
        throw new Error('Article does not belong to the user');
      }
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error;
    }
  }


}

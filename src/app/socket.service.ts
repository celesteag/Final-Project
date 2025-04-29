import { Injectable, signal} from '@angular/core';
import { Observable } from 'rxjs';
import {io, Socket} from 'socket.io-client'; 

interface Person {
  _id?: string;
  name: string;
  age: number;
}

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: Socket;
  private readonly uri: string = 'http://localhost:3000';

  constructor() { 
    const token = localStorage.getItem('token');

    this.socket = io(this.uri, {
      auth: {
        token: token,
      },
      transports: ['websocket'], //asegura conexión limpia
    });
  }

  getPersons() {
    this.socket.emit('getPersons');
  }

  onPersonsList(): Observable<any[]> {
    return new Observable((observer) => {
      this.socket.on('personsList', (persons: any[]) => {
        observer.next(persons);
      })
    })
  }

  onPersonsError(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('personsError', (error: any) => {
        observer.next(error);
      });
    });
  }
}

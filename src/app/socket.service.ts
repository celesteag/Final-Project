import { Injectable, signal} from '@angular/core';
import { Observable } from 'rxjs';
import {io, Socket} from 'socket.io-client'; 

interface Product {
  _id?: string;
  name: string;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: Socket;
  private readonly uri: string = 'http://localhost:3000';

  constructor() { 
    this.socket = io(this.uri);
  }

  getProducts() {
    this.socket.emit('getProducts');
  }

  onProductsList(): Observable<any[]> {
    return new Observable((observer) => {
      this.socket.on('productsList', (products: any[]) => {
        observer.next(products);
      })
    })
  }
}

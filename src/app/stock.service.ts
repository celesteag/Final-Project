import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

interface Product {
  _id?: number;
  name: string;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class StockService {

  private apiUrl: string = "http://localhost:3000/products";
    private http: HttpClient;
    private estado: string = 'A';

  constructor(http: HttpClient) {
    this.http = http;
  }

  private getHeaders() {
    const token: string = localStorage.getItem('token') ?? "";
    return new HttpHeaders({
        "Authorization": "Bearer " + token,
        'Content-Type': 'application/json' 
    }); 
}

  setEstado(newEstado: string){
      this.estado = newEstado;
  }

  getEstado(): string {
      return this.estado;
  }

  getProducts(): Observable<Product[]> {
      return this.http.get<Product[]>(this.apiUrl);
  }

  addProduct(product: Product): Observable<any>{
      return this.http.post<Product>(this.apiUrl, product, {headers: this.getHeaders()});
  }

  updateProduct(product: Product, id: string): Observable<any>{
      return this.http.put<Product>(`${this.apiUrl}/${id}`, product, {headers: this.getHeaders()});
  }

  deleteProduct(id: string): Observable<any>{
      return this.http.delete(`${this.apiUrl}/${id}`, {headers: this.getHeaders()});
  }

}

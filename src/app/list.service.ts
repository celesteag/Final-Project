import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

interface Person {
  _id?: number;
  name: string;
  age: number;
}

@Injectable({
  providedIn: 'root'
})
export class ListService {

  private apiUrl: string = "http://localhost:3000/persons";
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

  getPersons(): Observable<Person[]> {
      return this.http.get<Person[]>(this.apiUrl);
  }

  addPerson(person: Person): Observable<any>{
      return this.http.post<Person>(this.apiUrl, person, {headers: this.getHeaders()});
  }

  updatePerson(person: Person, id: string): Observable<any>{
      return this.http.put<Person>(`${this.apiUrl}/${id}`, person, {headers: this.getHeaders()});
  }

  deletePerson(id: string): Observable<any>{
      return this.http.delete(`${this.apiUrl}/${id}`, {headers: this.getHeaders()});
  }

}

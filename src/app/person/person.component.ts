import { Component, inject, OnInit, signal } from '@angular/core';
import { SocketService } from '../socket.service';
<<<<<<< HEAD
import { ListService } from '../list.service';
=======
import { ListService} from '../list.service';
>>>>>>> bf9d9e54c742a31f5bfc3fda9cceea002f5c1109
//import { timer } from 'rxjs';


interface Person {
  _id?: number;
  name: string;
  age: number;
}

@Component({
  selector: 'app-persons',
  imports: [],
  templateUrl: './person.component.html'
})
export class PersonComponent implements OnInit {

  constructor(private listService: ListService) { }
  private socketService: SocketService = inject(SocketService);
  persons = signal<Person[]>([]);
  title = "Miembros equipo";
  name = signal('');
  age = signal(0);
  editingId = signal('');
  editando = signal(false);

  ngOnInit(): void {
    this.getPersons();

  }

  getPersons() {
    this.socketService.getPersons();

    this.socketService.onPersonsList().subscribe((persons) => {
      this.persons.set(persons);
    });
  }

  /*
  getPersons() {
    this.listService.getPersons().subscribe((data) => {
      this.persons.set(data);
    })
  }
*/

  addPerson() {
    const person = {
      name: this.name(),
      age: this.age()
    };
    if (!this.name() || this.name().trim() === "") {
      alert("El nombre es obligatorio");
      return;
    }

    if (this.editando()) {
      this.listService.updatePerson(person, this.editingId()).subscribe((message) => {
        this.getPersons();
        this.resetForm();
      });
      this.editingId.set("");
      this.editando.set(false);
    } else {

      if (this.age() > 0) {
        this.listService.addPerson(person).subscribe(() => {
          this.getPersons();
          this.resetForm();

        }, (error) => {
          alert("Error al añadir producto: " + error.error.message);
        });
      } else {
        alert("Edad debe ser mayor que 0")
      }
    }
  }


  updatePerson(person: Person){
    this.editando.set(true);
    this.name.set(person.name);
    this.age.set(person.age);
    this.editingId.set(person._id ? String (person._id) : "");
  }


  deletePerson(id: any){

    this.listService.deletePerson(id).subscribe(() => {
      this.getPersons();
    })
  }

  resetForm() {
    this.name.set('');
    this.age.set(0);
    //this.editando.set(null);
  }

}

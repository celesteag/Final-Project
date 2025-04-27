import { Component, inject, OnInit, signal } from '@angular/core';
import { SocketService } from '../socket.service';
import { StockService } from '../stock.service';
import { timer } from 'rxjs';


interface Product {
  _id?: number;
  name: string;
  quantity: number;
}

@Component({
  selector: 'app-products',
  imports: [],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {

  constructor(private stockService: StockService) { }
  private socketService: SocketService = inject(SocketService);
  products = signal<Product[]>([]);
  
  title = "Lista Productos"
  name = signal('');
  quantity = signal(0);
  editingId = signal('');
  editando = signal(false);

  ngOnInit(): void {
    this.getProducts();
    
    this.socketService.onProductsList().subscribe((products) => {
      this.products.set(products);
    });
  }

  getProducts() {
    this.socketService.getProducts();
  }

  // getProducts(){
  //   this.productService.getProducts().subscribe((data) => {
  //     this.products.set(data);
  //   })
  // }

  addProduct() {
    const product = {
      name: this.name(),
      quantity: this.quantity()
    };
  
    if (this.editando()) {
      this.stockService.updateProduct(product, this.editingId()).subscribe();
      this.editingId.set("");
      this.editando.set(false);
    } else {
      if(this.quantity() > 0){
        this.stockService.addProduct(product).subscribe(()=> {
          timer(500) 
          .subscribe(() => {
            this.getProducts();
            this.resetForm();
          }); 
        }, (error) => {
          alert("Error al añadir producto: " + error.error.message);
        });
      } else {
        alert("Cantidad debe ser mayor que 0")
      }
    }
  }

  updateProduct(product: Product){
    this.editando.set(true);
    this.name.set(product.name);
    this.quantity.set(product.quantity);
    this.editingId.set(product._id ? String (product._id) : "");
  }


  deleteProduct(id: any){
    this.stockService.deleteProduct(id).subscribe(() => {
      this.getProducts();
    })
  }

  resetForm() {
    this.name.set('');
    this.quantity.set(0);
    //this.editando.set(null);
  }

}

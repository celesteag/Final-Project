import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ProductComponent } from './product.component';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductComponent, HttpClientTestingModule],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(ProductComponent);
    const app = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it(`should have the 'Lista Productos' title`, () => {
    const fixture = TestBed.createComponent(ProductComponent);
    const component = fixture.componentInstance;
    expect(component.title).toEqual('Lista Productos');
  });
});


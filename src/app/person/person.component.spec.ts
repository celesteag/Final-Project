import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { PersonComponent } from './person.component';

describe('PersonComponent', () => {
  let component: PersonComponent;
  let fixture: ComponentFixture<PersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonComponent, HttpClientTestingModule],
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(PersonComponent);
    const app = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it(`should have the 'Miembros equipo' title`, () => {
    const fixture = TestBed.createComponent(PersonComponent);
    const component = fixture.componentInstance;
    expect(component.title).toEqual('Miembros equipo');
  });
});


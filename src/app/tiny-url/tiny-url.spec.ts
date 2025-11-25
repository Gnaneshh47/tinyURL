import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TinyURL } from './tiny-url';

describe('TinyURL', () => {
  let component: TinyURL;
  let fixture: ComponentFixture<TinyURL>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TinyURL]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TinyURL);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

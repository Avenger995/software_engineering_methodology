import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoyageEditorComponent } from './voyage-editor.component';

describe('VoyageEditorComponent', () => {
  let component: VoyageEditorComponent;
  let fixture: ComponentFixture<VoyageEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoyageEditorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoyageEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

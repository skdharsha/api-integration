import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskModelsComponent } from './task-models.component';

describe('TaskModelsComponent', () => {
  let component: TaskModelsComponent;
  let fixture: ComponentFixture<TaskModelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskModelsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskModelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

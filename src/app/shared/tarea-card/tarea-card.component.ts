import { Component, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { Tarea } from '../../core/models/Tarea.model';
import { FormsModule } from '@angular/forms';
import { TareaService } from '../../core/services/tarea.service';

@Component({
  selector: 'app-tarea-card',
  templateUrl: './tarea-card.component.html',
  styleUrls: ['./tarea-card.component.css'],
  standalone: true,
  imports: [FormsModule]
})
export class TareaCardComponent {
  @Input() tarea!: Tarea;
  @Output() update = new EventEmitter<Tarea>();
  @Output() delete = new EventEmitter<number>();
  isEditing: boolean = false;
  private originalTarea!: Tarea;

  constructor(private tareaService: TareaService,
              private cdr: ChangeDetectorRef
            ){}

  toggleEdit() {
    this.isEditing = !this.isEditing;
    if (this.isEditing) {
      this.originalTarea = { ...this.tarea }; 
    }
  }

  saveTask() {
        this.update.emit(this.tarea);
        this.isEditing = false;
        this.cdr.detectChanges();  
  }

  cancelEdit() {
    this.tarea = { ...this.originalTarea };
    this.isEditing = false;
    this.cdr.detectChanges(); 
  }

  deleteTask() {
    this.delete.emit(this.tarea.id);
  }

  toggleTaskState(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    this.tarea.estado = (checkbox.checked) ? 'HECHO' : 'ABIERTA';
    this.tareaService.updateTarea(this.tarea).subscribe(
      () => {
        this.update.emit(this.tarea);
        this.cdr.detectChanges();
      },
      (error) => console.error('Error al actualizar estado de tarea', error)
    );
  }
}

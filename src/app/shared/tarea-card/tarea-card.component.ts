import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Tarea } from '../../core/models/Tarea.model';
import { FormsModule } from '@angular/forms';

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

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  saveTask() {
    this.update.emit(this.tarea);
    this.isEditing = false;
  }

  deleteTask() {
    this.delete.emit(this.tarea.id);
  }
}

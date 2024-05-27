import { Component, OnInit } from '@angular/core';
import { TareaService } from '../../core/services/tarea.service';
import { Tarea } from '../../core/models/Tarea.model';
import { TokenService } from '../../core/services/token.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TareaCardComponent } from '../../shared/tarea-card/tarea-card.component';

@Component({
  selector: 'app-tarea',
  templateUrl: './tarea.component.html',
  styleUrls: ['./tarea.component.css'],
  standalone: true,
  imports: [FormsModule, TareaCardComponent]
})
export class TareaComponent implements OnInit {
  tareas: Tarea[] = [];
  newTask: Tarea = {
    id: 0,
    titulo: '',
    descripcion: '',
    estado: 'ABIERTA',
    usuario_id: 0,
  };
  
  username = this.tokenService.getUsername();

  constructor(private tareaService: TareaService,
              private tokenService: TokenService,
              private router: Router) 
              {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    const usuario_id = this.tokenService.getUserId();
    if (usuario_id) {
      this.tareaService.getTareas(usuario_id).subscribe((tareas) => {
        this.tareas = tareas;
      });
    }
  }

  createTask(): void {
    const usuario_id = this.tokenService.getUserId();
    if (usuario_id) {
      this.newTask.usuario_id = usuario_id;
      this.tareaService.createTarea(this.newTask).subscribe(
        () => this.loadTasks(),
        (error) => console.error('Create task failed', error)
      );
    }
  }

  updateTask(tarea: Tarea): void {
    this.tareaService.updateTarea(tarea).subscribe(
      () => this.loadTasks(),
      (error) => console.error('Update task failed', error)
    );
  }

  deleteTask(id: number): void {
    this.tareaService.deleteTarea(id).subscribe(
      () => this.loadTasks(),
      (error) => console.error('Delete task failed', error)
    );
  }

  deleteCompleted(): void {
    const usuario_id = this.tokenService.getUserId();
    if (usuario_id) {
      this.tareaService.deleteCompleted(usuario_id).subscribe(
        () => this.loadTasks(),
        (error) => console.error('Delete completed tasks failed', error)
      );
    }
  }

  logout(): void {
    this.tokenService.clearToken();
    this.router.navigate(['login']);
  }
}

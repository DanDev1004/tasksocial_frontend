import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiEndpoint } from '../constants/constants';
import { Tarea } from '../models/Tarea.model';

@Injectable({
  providedIn: 'root'
})
export class TareaService {
  constructor(private http: HttpClient) {}

  createTarea(tarea: Tarea): Observable<Tarea> {
    return this.http.post<Tarea>(apiEndpoint.TareaEndpoint.create, tarea);
  }

  getTareas(usuario_id: any): Observable<Tarea[]> {
    return this.http.get<Tarea[]>(`${apiEndpoint.TareaEndpoint.getAll}&usuario_id=${usuario_id}`);
  }

  updateTarea(tarea: Tarea): Observable<Tarea> {
    return this.http.post<Tarea>(apiEndpoint.TareaEndpoint.update, tarea);
  }

  deleteTarea(id: number): Observable<void> {
    return this.http.post<void>(apiEndpoint.TareaEndpoint.delete, { id });
  }

  deleteCompleted(usuario_id: number): Observable<void> {
    return this.http.post<void>(apiEndpoint.TareaEndpoint.deleteCompleted, { usuario_id });
  }

  
  generatePDF(usuario_id: number): Observable<Blob> {
    return this.http.get(`${apiEndpoint.TareaEndpoint.generatePDF}?usuario_id=${usuario_id}`, {
      responseType: 'blob'
    });
  }
}

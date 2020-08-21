import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Note } from '../note';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class NotesService {

    private url = "http://localhost:3000/api/v1/notes";
    constructor(private httpClient: HttpClient) {
    }

    getNotes(): Observable<Array<Note>> {
        return this.httpClient.get<Array<Note>>(this.url, {
            headers: new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`)
        });
    }

    addNote(note: Note): Observable<Note> {
        return this.httpClient.post<Note>(this.url, note, {
            headers: new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`)
        });
    }
}

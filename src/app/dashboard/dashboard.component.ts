import { Component } from '@angular/core';
import {Note } from '../note';
import {NotesService} from '../services/notes.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  note: Note = new Note();
  notes: Array<Note> = [];
  errMessage: string;

  constructor(private notesService: NotesService) {
  }

  ngOnInit() {
    this.notesService.getNotes().subscribe(
      data => {
        this.notes = data;
      },
      error => {
        this.errMessage = error.message;
      }
    );
  }

  takeNote() {
    if(this.note.title == '' || this.note.text == '') {
      this.errMessage = 'Title and Text both are required fields';
    }
    this.notesService.addNote(this.note).subscribe(
      data => {
        this.notes.push(data);
      },
      error => {
        this.errMessage = error.message;
      }
    );
    this.note = new Note();
  }
}


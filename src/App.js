import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/database';
import './App.css';
import Note from './components/Note';
import NoteForm from './components/NoteForm';
import { DBconfig } from './Config/config';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { notes: [] }
    this.addNote = this.addNote.bind(this);
    this.removeNoteId = this.removeNoteId.bind(this);
    this.app = firebase.initializeApp(DBconfig);
    this.database = this.app.database().ref().child('notes');
  }

  componentWillMount() {
    const previousNotes = this.state.notes;
    this.database.on('child_added', snap => {
      previousNotes.push({
        id: snap.key,
        noteContent: snap.val().noteContent
      })
      this.setState({ notes: previousNotes });
    })

    this.database.on('child_removed', snap => {
      for (var i = 0; i < previousNotes.length; i++) {
        if (previousNotes[i].id === snap.key) {
          previousNotes.splice(i, 1);
        }
      }
      this.setState({ notes: previousNotes });
    })
  }

  addNote(note) {
    this.database.push().set({ noteContent: note });
  }

  removeNoteId(noteId) {
    console.log("from the parent: " + noteId);
    this.database.child(noteId).remove();
  }

  render() {
    return (
      <div className="notesWrapper">
        <div className="notesHeader">
          <div className="heading">
            NoteBook
          </div>
        </div>
        <div className="notesBody">
          {
            this.state.notes.map((note) => {
              return (
                <Note noteContent={note.noteContent}
                  noteId={note.id}
                  key={note.id}
                  removeNoteId={this.removeNoteId}
                />
              );
            })
          }
        </div>
        <div className="notesFooter">
          <NoteForm addNote={this.addNote} />
        </div>
      </div>
    );
  }
}

export default App;

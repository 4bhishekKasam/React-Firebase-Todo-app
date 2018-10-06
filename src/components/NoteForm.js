import React, { Component } from 'react'
import './NoteForm.css';

export default class NoteForm extends Component {
    constructor(props) {
        super(props);
        this.state = { newNoteContent: '' };
        this.handleUserInput = this.handleUserInput.bind(this);
        this.writeNote = this.writeNote.bind(this);
    }

    handleUserInput(e) {
        this.setState({ newNoteContent: e.target.value });
        //      console.log(e.target.value);
    }

    writeNote() {
        this.props.addNote(this.state.newNoteContent);
        this.setState({ newNoteContent: " " })
    }

    render() {
        return (
            <div className="formWrapper">
                <input className="noteInput"
                    placeholder="Write a new note..."
                    onChange={this.handleUserInput}
                />
                <button onClick={this.writeNote}
                    className="noteButton">Add Note</button>
            </div>
        )
    }
}

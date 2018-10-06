import React, { Component } from 'react';
import './Note.css';
import PropTypes from 'prop-types';

export default class Note extends Component {
    constructor(props) {
        super(props);
        this.noteContent = props.noteContent;
        this.noteId = props.noteId;
        this.removeNote = this.removeNote.bind(this);
    }

    removeNote(id) {
        this.props.removeNoteId(id);
    }

    render() {
        return (
            <div className="note fade-in">
                <span className="closebtn"
                    onClick={() => this.removeNote(this.noteId)} >
                    &times;
                 </span>
                <p className="noteContent">
                    {this.noteContent}
                </p>
            </div>
        )
    }
}

Note.propTypes = {
    noteContent: PropTypes.string,
}
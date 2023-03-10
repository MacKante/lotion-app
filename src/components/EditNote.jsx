import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const EditNote = () => {
    const navigate = useNavigate();
    const { noteId } = useParams();
    const [note , setNote] = useState({});
    const [title, setTitle] = useState("")
    const [date, setDate] = useState(note.date)
    const [editContent, setContent] = useState("");

    useEffect(() => {
        const noteList = JSON.parse(localStorage.getItem("list")) || [];
        const note = noteList.find(x => x.noteNum === parseInt(noteId));
        setNote(note);
        setTitle(note.title)
        setDate(note.date)
        setContent(note.content)
    }, [noteId]);

    const handleChange = (change) => {
        setContent(change);
    };

    const handleDate = (change) => {
        setDate(change)
    }

    const saveNote = () => {
        const noteList = JSON.parse(localStorage.getItem("list")) || [];
        const note = noteList.find(x => x.noteNum === parseInt(noteId));

        note.title = title;
        note.content = editContent;
        note.date = date;

        if (date === "") {
            note.date = new Date();
        } 

        localStorage.setItem("list", JSON.stringify(noteList));
        return note;
    };

    const deleteNote = () => {
        if (window.confirm("Are you sure?")) {
            const noteList = JSON.parse(localStorage.getItem("list")) || [];
            const note = noteList.find(note => note.noteNum === parseInt(noteId));
            const index = noteList.indexOf(note);
            noteList.splice(index, 1);

            for (let i = 0; i < noteList.length; i++) {
                if (noteList[i].noteNum > noteId) {
                    noteList[i].noteNum -= 1;
                }
            }

            localStorage.setItem("list", JSON.stringify(noteList))
            if (noteList.length === 0) {
                navigate(`/notes`)
            }
            else {
                navigate(`/notes/${noteList[0].noteNum}`);
            }
            
        }
    };
   
    return (
        <>
            <div className="edit-bar">
                <div className='title-bar'>
                    <input className='title-input' type='text' value={title} onChange={(x) => setTitle(x.target.value)} />
                    <input className='date-input' type="datetime-local" value={date} defaultValue={note.date} onChange={(x) => handleDate(x.target.value)} />
                </div>
                <div className='edit-buttons'>
                    <button className="save-button" onClick={() => navigate(`/notes/${saveNote().noteNum}`)}>Save</button>
                    <button className="del-button" onClick={() => deleteNote()}>Delete</button>
                </div>
            </div>
            <div className="content-text"><ReactQuill value={editContent} onChange={handleChange} /></div>
        </>
    )
};

export default EditNote;
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
};

const formatDate = (when) => {
    const formatted = new Date(when).toLocaleString("en-US", options);
    if (formatted === "Invalid Date") {
        return "";
    }
    return formatted;
};

const ViewNote = () => {
    const { noteId } = useParams();
    const [note , setNote] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const noteList = JSON.parse(localStorage.getItem("list")) || [];
        const note = noteList.find(x => x.noteNum === parseInt(noteId));
        setNote(note);
    }, [noteId]);

    function navEdit() {
        navigate('./edit')
    }
    
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
        <div className="content-bar">
            <div className="view-head">
                <h2 className="note-title">{note.title}</h2>
                <h4 className="view-date">{formatDate(note.date)}.</h4>
            </div>
            <div className="view-buttons">
                <button className="edit-button" onClick={navEdit}>Edit</button>
                <button className="del-button" onClick={() => deleteNote()}>Delete</button>
            </div>
        </div>
        <div className="content-text" dangerouslySetInnerHTML={{__html: note.content}} />
        </>
    )
};

export default ViewNote;


import React from "react";
import { useNavigate } from "react-router-dom"

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

const NewNote = () => {
    var list = JSON.parse(localStorage.getItem("list")) || [];
    var note = {
        noteNum: list.length + 1,
        title: "Untitled",
        date: "",
        content: "Type Something Here..."
    }

    list.unshift(note);
    localStorage.setItem("list", JSON.stringify(list));
    return note;
}

const NoteList = () => {
    const noteList = JSON.parse(localStorage.getItem("list")) || [];
    const navigate = useNavigate();

    return (
        <>
        <div className="menu">
            <div className="menu-bar">
                <h1 className="notes-head">Notes</h1>
                <button className="new-note" onClick={() => navigate(`/notes/${NewNote().noteNum}/edit`)}>+</button>
            </div>
            
            <ul className="list">
                {noteList.map(notes => (
                    <li key={notes.noteNum}>
                        <button className="note-link" onClick={() => navigate(`/notes/${notes.noteNum}`)}>
                            <div>
                                <h2>{notes.title}</h2>
                                <h4>{formatDate(notes.date)}</h4>
                                <p className="content-prev" dangerouslySetInnerHTML={{ __html: notes.content.length > 20 ? notes.content.substring(0, 20) + "..." : notes.content }} />
                            </div>
                        </button> 
                    </li>
                ))}
            </ul>
            
        </div>
        </>
    )
};

export default NoteList;

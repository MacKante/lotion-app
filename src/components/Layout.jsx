import React from "react";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import NoteList from "./NoteList";

function Layout() {
    const [menu, setMenu] = useState(true);
    return (
    <>
        <div className="content">
            <div className="top">
                <div><hr className="top-line"></hr></div>
                <div className="top-bar">
                    <button className="menu-button" onClick={() => setMenu(menu => !menu)}>&#9776;</button>
                    <div className="top-heads">
                        <h1>Lotion</h1>
                        <h4>Like Notion, but much much worse</h4>
                    </div>
                
                    <div className="top-empty"></div>
                </div>
            </div>
            <div className="main">
                { menu ? <NoteList /> : null }
                <div className="note"><Outlet /></div>
            </div>
        </div>
    </>
    );
};

export default Layout;
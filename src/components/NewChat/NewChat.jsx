import React, { useState } from "react";
import "./NewChat.css";

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default ({ user, chatList, show, setShow }) => {
    const [list, setList] = useState([
        { chatId: 1, name: 'Fulana de Tal', image: 'https://cdn-icons-png.flaticon.com/512/168/168734.png' },
        { chatId: 2, name: 'Ciclano de Tal', image: 'https://cdn-icons-png.flaticon.com/512/168/168724.png' },
        { chatId: 3, name: 'Beltrano de Tal', image: 'https://cdn-icons-png.flaticon.com/512/168/168726.png' },
        { chatId: 4, name: 'Hermana de Tal', image: 'https://cdn-icons-png.flaticon.com/512/168/168730.png' }
    ]);

    const handleClose = () => {
        setShow(false);
    }

    return (
        <div className="newChat" style={{ left: show ? 0 : -415 }}>
            <div className="newChat-header">
                <div
                    className="newChat-backbutton"
                    onClick={handleClose}
                >
                    <ArrowBackIcon style={{ color: '#FFF' }} />
                </div>
                <div className="newChat-headerTitle">Nova Conversa</div>
            </div>
            <div className="newChat-list">
                {list.map((item, key) => (
                    <div className="newChat-item" key={key}>
                        <img className="newChat-itemAvatar" src={item.image} alt="" />
                        <div className="newChat-itemName">{item.name}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
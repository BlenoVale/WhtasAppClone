import React from "react";
import "./ChatListItem.css"

export default ({ onClick, active, data }) => {
    return (
        <div
            className={`chatListItem ${active ? 'active' : ''}`}
            onClick={onClick}
        >
            <img className="chatListItem-avatar" src={data.image} alt="" />
            <div className="chatListItem-lines">
                <div className="chatListItem-line">
                    <div className="chatListItem-name">{data.title}</div>
                    <div className="chatListItem-date">10:00</div>
                </div>
                <div className="chatListItem-line">
                    <div className="chatListItem-lastMsg">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sagittis purus sem, quis cursus neque mollis at. Ut convallis leo eget velit imperdiet</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
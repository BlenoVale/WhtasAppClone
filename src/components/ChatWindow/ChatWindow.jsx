import React, { useState, useEffect, useRef } from "react";
import "./ChatWindow.css";
import MessageItem from "../MessageItem/MessageItem";
import EmojiPicker from "emoji-picker-react";

import SearchIcon from '@mui/icons-material/Search';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import MicIcon from '@mui/icons-material/Mic';
import Api from "../../Api";


export default ({ data, user }) => {

    let recognition = null;
    let SpeeshRecognition = window.SpeechRecognitionResult || window.webkitSpeechRecognition;
    if (SpeeshRecognition !== undefined) {
        recognition = new SpeeshRecognition();
    }

    const [emojiOpen, setEmojiOpen] = useState(false);
    const [text, setText] = useState('');
    const [list, setList] = useState([]);
    const [users, setUsers] = useState([]);
    const [listening, setListening] = useState(false);
    const body = useRef();

    useEffect(() => {
        setList([]);
        let unsub = Api.onChatContent(data.chatId, setList, setUsers);
        return unsub;
    }, [data.chatId]);

    useEffect(() => {
        if (body.current.scrollHeight > body.current.offsetHeight) {
            body.current.scrollTop = body.current.scrollHeight - body.current.offsetHeight;
        }
    }, [list]);


    const handleOpenEmoji = () => {
        setEmojiOpen(true);
    }

    const handleCloseEmoji = () => {
        setEmojiOpen(false);
    }

    const handleEmojiClick = (emojiObject, e) => {
        setText(text + emojiObject.emoji)
    }

    const handleMicClick = () => {
        if (recognition !== null) {

            recognition.onstart = () => {
                setListening(true);
            }
            recognition.onend = () => {
                setListening(false);
            }
            recognition.onresult = (e) => {
                setText(e.results[0][0].transcript);
            }

            recognition.start();

        } else {
            alert('Navegador não suporta uso de Microfone.');
        }
    }

    const handleInputKeyUp = (e) => {
        if (e.keyCode == 13) {
            hendleSendClick();
        }
    }

    const hendleSendClick = () => {
        if (text !== '') {
            Api.sendMessage(data, user.id, 'text', text, users);
            setText('');
            setEmojiOpen(false);
        }
    }

    return (
        <div className="chatWindow">
            <div className="chatWindow-header">

                <div className="chatWindow-headerInfo">
                    <img className="chatWindow-avatar" src={data.image} alt="" />
                    <div className="chatWindow-name">{data.title}</div>
                </div>

                <div className="chatWindow-header-buttons">
                    <div className="chatWindow-btn">
                        <SearchIcon style={{ color: '#919191' }} />
                    </div>
                    <div className="chatWindow-btn">
                        <AttachFileIcon style={{ color: '#919191' }} />
                    </div>
                    <div className="chatWindow-btn">
                        <MoreVertIcon style={{ color: '#919191' }} />
                    </div>
                </div>
            </div>

            <div ref={body} className="chatWindow-body">
                {list.map((item, key) => (
                    <MessageItem
                        key={key}
                        data={item}
                        user={user}
                    />
                ))}
            </div>

            <div
                className="chatWindow-EmojiArea"
                style={{ height: emojiOpen ? '40%' : '0px' }}>
                <EmojiPicker
                    onEmojiClick={handleEmojiClick}
                    searchDisabled
                    defaultSkinTone
                    previewConfig={{ showPreview: false }}
                    width="auto"
                />
            </div>

            <div className="chatWindow-footer">
                <div className="chatWindow-pre">
                    <div
                        className="chatWindow-btn"
                        onClick={handleCloseEmoji}
                        style={{ width: emojiOpen ? '40px' : '0' }}
                    >
                        <CloseIcon style={{ color: '#919191' }} />
                    </div>

                    <div
                        className="chatWindow-btn"
                        onClick={handleOpenEmoji}
                    >
                        <InsertEmoticonIcon style={{ color: emojiOpen ? '#009688' : '#919191' }} />
                    </div>
                </div>
                <div className="chatWindow-inputArea">
                    <input
                        className="chatWindow-input"
                        type="text"
                        placeholder="Digite uma mensagem"
                        value={text}
                        onChange={e => setText(e.target.value)}
                        onKeyUp={handleInputKeyUp}
                    />
                </div>
                <div className="chatWindow-pos">
                    {text === '' &&
                        <div className="chatWindow-btn" onClick={handleMicClick}>
                            <MicIcon style={{ color: listening ? '#126ECE' : '#919191' }} />
                        </div>
                    }
                    {text !== '' &&
                        <div className="chatWindow-btn" onClick={hendleSendClick}>
                            <SendIcon style={{ color: '#919191' }} />
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}
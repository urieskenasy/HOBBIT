import "./style/conversation.scss";
import React, { useContext } from "react";
import ConversationForm from "./ConversationForm";
import { ChatContext } from "../../../context/ChatProvider";
import { UserContext } from "../../../context/user.context";
import { GrClose } from "react-icons/gr";
function Conversation({ handleChatClose }) {
    const { room, receiver } = useContext(ChatContext);
    const { currentUser } = useContext(UserContext);
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                border: "1px solid black",
                width: "100%",
            }}
        >
            <div className="close-btn-and-recipient-display-wrapper">
                <div className="receiver-name-display-warper">
                    <span>To: {receiver}</span>
                </div>
                <button
                    onClick={handleChatClose}
                    style={{ width: "20px", alignSelf: "flex-end" }}
                    className="conversation-closeChat-btn"
                >
                    <GrClose className="conversation-closeChat-btn-icon" />
                </button>
            </div>
            <div
                className="display-msg-container"
                style={{ border: "1px solid black", height: "100%" }}
            >
                <div>
                    {room.messages?.map(
                        (msg, idx) =>
                            msg.content.length > 0 && (
                                <div className="conversation-text" key={idx}>
                                    <span className="conversation-span">
                                        {msg?.content}
                                    </span>{" "}
                                    {/* <span style={{ color: "green" }}>
                                {msg?.sender}
                            </span>{" "} */}
                                    {typeof msg?.date === "string" && (
                                        <span style={{ fontSize: 10 }}>
                                            {msg?.date}
                                        </span>
                                    )}
                                </div>
                            )
                    )}
                </div>
            </div>
            <div className="send-msg-container">
                <ConversationForm />
            </div>
        </div>
    );
}

export default Conversation;

import "./style/conversationForm.scss";
import React, { useContext } from "react";
import { ChatContext } from "../../../context/ChatProvider";
import { BiSend } from "react-icons/bi";
function ConversationForm() {
    const { sendMessage } = useContext(ChatContext);
    return (
        <form
            onSubmit={sendMessage}
            style={{ display: "flex", justifyContent: "space-between" }}
        >
            <textarea
                name="message"
                placeholder="type your message here"
                style={{ width: "80%" }}
                className="send-msg-text-area"Card
            ></textarea>
            <button
                type="submit"
                className="send-msg-text-area-btn"
                style={{ width: "20%" }}
            >
                <BiSend className="send-msg-btn-icon" />
            </button>
        </form>
    );
}

export default ConversationForm;

import React, { useContext, useState, useEffect } from "react";

import Sidebar from "./Sidebar";
import Conversation from "./Conversation";
import Home from "../home/Home";

import { ChatContext } from "../../../context/ChatProvider";
import { UserContext } from "../../../context/user.context";

function Dashboard() {
    const [userInfo, setUserInfo] = useState(null);

    const { sender, 
      setSender, 
      receiver, 
      setReceiver } 
      = useContext(ChatContext);
      
    const { currentUser } = useContext(UserContext);
    const { room, setRoom } = useContext(ChatContext);

  // if(!currentUser) {
  //   window.location.replace('/')
  // }

    const handleChatClose = () => {
        setRoom(null)
    };

    useEffect(() => {
        setUserInfo();
    }, [currentUser]);

    return (
        <div className="dashboard-container" style={{ display: "flex" }}>
            <Sidebar style={{ width: "15%", height: "100vh" }} />
            {room ? <Conversation handleChatClose={handleChatClose}/> : <Home/>}
        </div>
    );
}

export default Dashboard;

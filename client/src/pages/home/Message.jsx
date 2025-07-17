import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const Message = ({ messageDetails }) => {
  const messageRef = useRef(null);
  const { userProfile, selectedUser } = useSelector(
    (state) => state.userReducer
  );

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <>
      <div
        ref={messageRef}
        className={`chat ${
          userProfile?._id === messageDetails?.senderId
            ? "chat-end"
            : "chat-start"
        }`}
      >
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS chat bubble component"
              src={
                userProfile?._id === messageDetails?.senderId
                  ? userProfile?.avatar
                  : selectedUser?.avatar
              }
            />
          </div>
        </div>
        <div className="chat-header">
          <time className="text-xs opacity-50"></time>
        </div>
        <div className="chat-bubble">{messageDetails?.message}</div>
      </div>
    </>
  );
};

export default Message;

import React, { useState } from "react";
import styled from "styled-components";
import Picker from "emoji-picker-react";
import { IoMdSend } from "react-icons/io";
import { BsEmojiSmileFill } from "react-icons/bs";

const ChatInput = ({ handleSendMsg }) => {
  const [msg, setMsg] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleEmojiPickerHideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  // Updated to match current emoji-picker-react API
  const handleEmojiClick = (emojiData) => {
    let message = msg;
    message += emojiData.emoji;
    setMsg(message);
  };

  const sendChat = (event) => {
    event.preventDefault();
    setShowEmojiPicker(false);
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };

  return (
    <Container>
      <div className="button-container">
        <div className="emoji">
          <BsEmojiSmileFill onClick={handleEmojiPickerHideShow} />
          {showEmojiPicker && (
            <div className="emoji-picker-container">
              <Picker onEmojiClick={handleEmojiClick} />
            </div>
          )}
        </div>
      </div>
      <form className="input-container" onSubmit={(event) => sendChat(event)}>
        <input
          type="text"
          placeholder="type your message here"
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
        />
        <button type="submit" className="submit">
          <IoMdSend />
        </button>
      </form>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 5% 95%;
  background-color: #080420;
  padding: 0 2rem;

  @media screen and (min-width: 720px) and (max-width: 1080px) {
    padding: 0 1rem;
    gap: 1rem;
  }

  .button-container {
    display: flex;
    align-items: center;
    color: white;
    gap: 1rem;

    .emoji {
      position: relative;

      svg {
        font-size: 1.5rem;
        color: #ffff00c8;
        cursor: pointer;
      }

      .emoji-picker-container {
        position: absolute;
        bottom: 60px;
        left: 0;
        z-index: 10;

        /* Target the emoji picker with higher specificity */
        .EmojiPickerReact {
          --epr-bg-color: #080420 !important;
          --epr-category-label-bg-color: #080420 !important;
          --epr-picker-border-color: #9a86f3 !important;
          --epr-search-border-color: #9a86f3 !important;
          --epr-category-navigation-button-color: #9a86f3 !important;
          --epr-emoji-hover-color: #9a86f3 !important;
          box-shadow: 0 5px 10px #9a86f3 !important;
          border: 1px solid #9a86f3 !important;
          width: 300px !important;
          height: 360px !important;
        }

        /* Alternative targeting if above doesn't work */
        & > div {
          background-color: #080420 !important;
          border: 1px solid #9a86f3 !important;
          box-shadow: 0 5px 10px #9a86f3 !important;
        }

        /* Target scrollbar */
        * {
          scrollbar-width: thin;
          scrollbar-color: #9a86f3 #080420;
        }

        *::-webkit-scrollbar {
          width: 5px;
          background-color: #080420;
        }

        *::-webkit-scrollbar-thumb {
          background-color: #9a86f3;
          border-radius: 3px;
        }
      }
    }
  }

  .input-container {
    width: 100%;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    background-color: #ffffff34;

    input {
      width: 90%;
      height: 60%;
      background-color: transparent;
      color: white;
      border: none;
      padding-left: 1rem;
      font-size: 1.2rem;

      &::selection {
        background-color: #9a86f3;
      }

      &:focus {
        outline: none;
      }

      &::placeholder {
        color: #ffffff80;
      }
    }

    button {
      padding: 0.3rem 2rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #9a86f3;
      border: none;
      cursor: pointer;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: #8b7ce8;
      }

      @media screen and (min-width: 720px) and (max-width: 1080px) {
        padding: 0.3rem 1rem;

        svg {
          font-size: 1rem;
        }
      }

      svg {
        font-size: 2rem;
        color: white;
      }
    }
  }
`;

export default ChatInput;

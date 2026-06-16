import { Fragment, useEffect, useRef } from "react";
import Header from "./components/Header";
import Wrapper from "./components/Wrapper";
import MessageInput from './components/MessageInput';
import { StyledChat } from "./ChatStyled";
import SenderMessage from "./components/SenderMessage";
import RecipientMessage from "./components/RecipientMessage";
import { useMessages } from "./context/MessagesContext";

export default function Chat() {
    const { messages, setMessages, selectedChatId, chatList, setChatList } = useMessages();
    const chatContainerRef = useRef(null);

    useEffect(() => {
        const el = chatContainerRef.current;
        if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
    }, [messages]);

    const currentChat = chatList.find((chat) => chat.id === selectedChatId);
    const firstNewMessageIndex = messages.findIndex((message) => message.isNew);
    const showNewMessageDivider = currentChat?.hasUnread && firstNewMessageIndex !== -1;

    function handleSendMessage(text) {
        const hour = new Date().toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
        });

        const newMessage = {
            id: Date.now(),
            author: "sender",
            text,
            hour,
        };

        setMessages((currentMessages) => [
            ...currentMessages.map((message) =>
                message.isNew ? { ...message, isNew: false } : message
            ),
            newMessage,
        ]);
        setChatList((currentChats) =>
            currentChats.map((chat) =>
                chat.id === selectedChatId
                    ? { ...chat, hasUnread: false, lastMessage: text, lastTime: hour }
                    : chat
            )
        );
    }

    return (
        <StyledChat>
            <Header />
            <Wrapper>
                <h1 className="recipient-username">Pessoa</h1>
                <div className="chat-container" ref={chatContainerRef}>
                    <div className="spacer" />
                    {messages.map((message, index) => (
                        <Fragment key={message.id}>
                            {showNewMessageDivider && index === firstNewMessageIndex && message.isNew && (
                                <div className="new-message-divider">
                                    <span>Nova Mensagem</span>
                                </div>
                            )}
                            {message.author === "recipient" ? (
                                <RecipientMessage
                                    text={message.text}
                                    hour={message.hour}
                                />
                            ) : (
                                <SenderMessage
                                    text={message.text}
                                    hour={message.hour}
                                />
                            )}
                        </Fragment>
                    ))}
                </div>
            </Wrapper>
            <MessageInput onSendMessage={handleSendMessage} />
        </StyledChat>
    );
}

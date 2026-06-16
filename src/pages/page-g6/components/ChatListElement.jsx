import { StyledChatListElement } from "../styles/ChatListElementStyles.js";
import Avatar from '../../../assets/icons/G6GreenBall';
import Badge from '../../../assets/icons/NewMessageBadge';

export default function ChatListElement({ onlyClick, username, lastMessage, lastTime, hasUnread }) {
    return (
        <StyledChatListElement onClick={onlyClick}>
                <Avatar className="chat-avatar" aria-label="Avatar" />
                <div className="chat-data">
                    <span className="chat-username">{username}</span>
                    <span className="chat-last-message">{lastMessage}</span>
                </div>
                <div className="chat-right">
                    <span className="last-message-time">{lastTime}</span>
                    {hasUnread && <Badge className="chat-notification-badge" aria-label="Mensagem não lida" />}
                </div>
        </StyledChatListElement>
    )
}

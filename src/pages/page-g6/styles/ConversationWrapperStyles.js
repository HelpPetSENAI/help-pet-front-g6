import styled from "styled-components";

export const StyledConversationWrapper = styled.section`
    
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    font-family: var(--main-font);
    background: #39C442;

    width: 100%;
    height: calc(100vh - 75px);

    .chat-list-panel {
        width: 100%;
    }

    .chats-group {
        width: calc(100% + 40px);
        margin: 0 -20px;
        padding: 0 20px;
    }

    .chat-list-title {
        font-size: 32px;
        font-weight: 700;
        margin-bottom: 30px;
        width: 100%;
        text-align: center;
    }

    .no-chats-message {
        font-size: 32px;
        font-weight: 400;
        text-align: center;
        line-height: 100%;
    }

    .desktop-chat { display: none; }

    @media (min-width: 769px) {
        .wrapper.main {
            display: flex;
            flex-direction: row;
            align-items: stretch;

            width: 100vw;
            min-height: calc(100vh - 75px);
            height: calc(100vh - 75px);
            padding: 0;
            border-radius: 30px 30px 0 0;
        }

        .chat-list-panel {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 320px;
            min-width: 290px;
            height: 100%;
            padding: 20px 12px;
            border-right: 2px solid var(--clr-green-1000);
            background: var(--clr-neutral-100);
        }

        .chat-list-title {
            margin-bottom: 20px;
        }

        .chats-group {
            width: 100%;
            margin: 0;
            padding: 0;
        }

        .desktop-chat {
            position: relative;
            display: flex;
            flex: 1;
            flex-direction: column;
            align-items: center;
            min-width: 0;
            height: 100%;
            padding: 30px 24px;
            background: #effcef;
        }

        .recipient-username {
            font-size: 32px;
            font-weight: 700;
            margin-bottom: 20px;
        }

        .desktop-messages {
            display: flex;
            flex: 1;
            flex-direction: column;
            width: 100%;
            gap: 8px;
            overflow-y: auto;
            padding: 0 0 20px;
            scrollbar-width: none;
            &::-webkit-scrollbar { display: none; }

            .new-message-divider {
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 12px;
                margin: 8px 0;
                font-size: 12px;
                color: #000;
            }

            .new-message-divider::before,
            .new-message-divider::after {
                content: "";
                flex: 1;
                height: 1px;
                background: #000;
                opacity: 0.3;
            }
        }

        .desktop-empty-message {
            margin: auto;
            font-size: 28px;
            font-weight: 400;
            line-height: 1;
            text-align: center;
            color: var(--clr-neutral-1000);
        }

        .desktop-message-input {
            position: static;
            width: 100%;
            height: 36px;
            min-height: 36px;
            padding: 0 14px;
            box-shadow: none;
            z-index: 1;
        }
    }
`

import styled from "styled-components";

export const StyledChat = styled.main`
    --chat-content-width: 84vw;

    display: flex;
    flex-direction: column;
    height: 100dvh;
    overflow: hidden;
    font-family: var(--main-font);

    > section {
        flex: 1;
        min-height: 0;
        overflow: hidden;

        .wrapper {
            min-height: 0;
            height: 100%;
            display: flex;
            flex-direction: column;
            overflow: hidden;
            padding-bottom: 0;
        }
    }

    .recipient-username {
        flex-shrink: 0;
        margin-bottom: 10px;
    }

    .chat-container {
        flex: 1;
        min-height: 0;
        width: var(--chat-content-width);
        max-width: 100%;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 4px;
        padding: 0 0 90px 0;
        overflow-y: auto;
        scrollbar-width: none;
        &::-webkit-scrollbar { display: none; }

        .spacer { flex: 1; }

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
`

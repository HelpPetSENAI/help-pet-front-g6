import styled from "styled-components";

export const StyledChat = styled.main`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    min-height: 100vh;
    height: 100vh;
    overflow: hidden;

    font-family: var(--main-font);
    
    .recipient-username { margin: 20px 0 10px; }

    .chat-container {
        width: 100%;
        flex: 1;
        height: 100%;
        min-height: 0;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-end;
        gap: 4px;
        padding: 0 16px 14px;
        overflow-y: auto;
        overscroll-behavior: contain;        scroll-behavior: smooth;    }

    .chat-container::before {
        content: '';
        flex: 1;
        min-height: 0;
    }
`

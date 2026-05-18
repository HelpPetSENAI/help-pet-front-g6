import styled from "styled-components";

export const StyledChat = styled.main`
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
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: 4px;
        padding: 0 16px 90px 16px;
        overflow-y: auto;
        scrollbar-width: none;
        &::-webkit-scrollbar { display: none; }
    }
`

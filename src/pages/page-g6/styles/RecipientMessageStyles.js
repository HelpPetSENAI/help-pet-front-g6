import styled from "styled-components";

export const StyledRecipientMessage = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 6px;
    font-family: var(--main-font);

    .message-box {
        display: flex;
        flex-direction: row;
        align-items: center;
        max-width: calc(100% - 109px);
        min-width: 0;
        border-radius: 8px;
        background: var(--clr-green-500);
        font-size: 12px;
        font-weight: 400;
        padding: 10px;
        overflow-wrap: anywhere;
        word-break: break-word;
    }

    .message-hour {
        font-size: 10px;
        font-weight: 400;
    }
`
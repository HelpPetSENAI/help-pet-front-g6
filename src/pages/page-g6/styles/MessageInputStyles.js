import styled from "styled-components"

export const StyledMessageInput = styled.div`
    display: flex;
    flex-direction: row;
    position: fixed;
    justify-content: space-between;
    align-items: center;
    border: 2px solid black;
    background: var(--clr-green-200);
    box-shadow: 2px 2px 0 var(--clr-neutral-1000);

    width: 84%;
    left: 0;
    right: 0;
    margin: 0 auto;
    height: 44px;

    bottom: 30px;

    padding: 20px;
    z-index: 100;

    .message-input {
        width: 85%;
        height: 40px;
        border: none;
        background: transparent;
        cursor: text;
        font-size: 16px;
        font-weight: 400;
        font-family: var(--main-font);
    }

    .message-input:focus { outline: none; }
    .message-input::placeholder { color: #000000; }

    .send-icon { cursor: pointer; }
`
import styled from "styled-components";

export const StyledWrapper = styled.section`
    background-color: var(--clr-green-500);
    width: 100%;
    display: flex;
    flex-direction: column;
    flex: 1;
    min-height: 0;

    .wrapper {
        padding: 30px 20px 100px 20px;
        font-family: var(--main-font);

        width: 100%;
        flex: 1;
        min-height: 0;

        display: flex;
        flex-direction: column;
        align-items: center;

        border: 2px solid var(--clr-green-1000);
        border-radius: 30px 30px 0px 0px;
        overflow: hidden;

        background-color: var(--clr-neutral-100);
    }
`
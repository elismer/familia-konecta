import styled from "styled-components";


export const Searcher = styled.div`
    position: relative;
    display: flex;
    align-items: center;
`;

export const InputIcon = styled.img`
  position: absolute;
  left: 1.4rem;
  width: 1.1rem;
  filter: opacity(0.5);
`;

export const Input = styled.input`
  padding: 0.75rem 1rem 0.75rem 3.4rem;
  width: 28vw;
  border-radius: 12px;
  border: 1px solid #d8d8d8;
  :focus {
    outline: none;
  }
  @media (max-width: 1000px) {
    width: 100%;
  }
`;
import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  input {
    display: none;
  }
`;

export const Inner = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;

  svg path {
    fill: #4945ff;
  }

  span {
    color: #666687;
    font-size: 12px;
  }

  pointer-events: none;
`;

export const Label = styled.label`
  display: block;
  width: 100%;
  height: 100%;
  inset: 0;
  cursor: pointer;
  border: ${(props: { isOver: boolean }) =>
    props.isOver ? "1px dashed #4945ff" : "0"};
`;

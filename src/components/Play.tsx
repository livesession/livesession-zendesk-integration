import React from "react";
import styled from "styled-components";
import { themeValues } from "../theme/const";

interface PlayProps {
  isLoading: boolean;
}

const StyledPlay = styled.span<PlayProps>`
  border: 1px solid rgb(240, 242, 244);
  border-radius: 100%;
  color: ${(props: any) => (props.isLoading ? "#f0f2f4" : "rgb(4, 70, 202)")};
  font-size: 1.2rem;
  width: 32px;
  height: 32px;
  text-align: center;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  display: flex;

  i {
    position: relative;
    left: 2px;
  }

  transition: 0.2s;

  &:hover {
    background-color: ${themeValues.primaryColor};
    border-color: ${themeValues.primaryColor};
    border-style: solid;
    cursor: pointer;
    color: ${themeValues.white};
  }
`;

export function Play({ isLoading }: PlayProps) {
  return (
    <StyledPlay isLoading={isLoading}>
      <i className="ion-play" />
    </StyledPlay>
  );
}

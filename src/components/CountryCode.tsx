import React from "react";
import styled from "styled-components";

import { Img } from "./Img";

interface CountryCodeProps {
  code: string;
  isLoading?: boolean;
  style?: React.CSSProperties;
}

const StyledImg = styled(Img)`
  height: 12px;
  margin-right: 5px;
  border: 1px solid #fff;
`;

export const CountryCode: Function = function CountryCode(
  props: CountryCodeProps
) {
  if (!props.code || props.code === "") return null;

  return (
    <StyledImg
      isLoading={props.isLoading || false}
      src={`https://lipis.github.io/flag-icon-css/flags/4x3/${props.code.toLowerCase()}.svg`}
      alt="country-flag"
    />
  );
};

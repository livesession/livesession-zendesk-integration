import React from "react";
import styled from "styled-components";

interface HrefProps {
  isLoading?: boolean;
  href: string;
  target: "_blank" | "_self" | "_parent" | "_top";
  children: React.ReactElement;
  textDecoration?: "none";
}

const StyledHref = styled.a`
  ${(props: HrefProps) => (props.isLoading ? "cursor: not-allowed" : "")}
  ${(props: HrefProps) =>
    props.textDecoration ? `text-decoration: ${props.textDecoration}` : ""}
`;

export function Href(props: HrefProps) {
  return <StyledHref {...props} />;
}

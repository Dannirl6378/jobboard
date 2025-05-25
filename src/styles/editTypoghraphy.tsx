import styled from "styled-components";
import { Typography } from "@mui/material";

const Heading = styled(Typography)`
  && {
    font-size: 2rem;
    font-weight: bold;
    color: #1976d2;
    margin-bottom: 16px;
  }
`;

const SubHeading = styled(Typography)`
  && {
    font-size: 1.2rem;
    color: black;
    font-style: italic;
    margin-bottom: 12px;
  }
`;
const Text = styled(Typography)`
  && {
    font-size: 1rem;
    color: black;
    margin-bottom: 8px;
  }
`;

export { Heading, SubHeading, Text };
import React from "react";

import { InfinitySpin } from "react-loader-spinner";
import styled from "styled-components";

const Loader = () => (
  <Stack>
    <InfinitySpin color="red" />
  </Stack>
);

export default Loader;

const Stack = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

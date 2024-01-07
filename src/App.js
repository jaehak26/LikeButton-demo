import React from 'react';
import './style.css';
import LikeButton from './LikeButton.js';
import styled from 'styled-components';

const StyledLikeButton = styled(LikeButton)`
  margin: 30px;
`;

export default function App() {
  return (
    <div>
      <h1>Hello StackBlitz!</h1>
      <p>Start editing to see some magic happen :)</p>
      <StyledLikeButton size={6} />
    </div>
  );
}

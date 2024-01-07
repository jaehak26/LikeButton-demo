import React, { useState, useRef } from 'react';
// import './LikeButton.css';

import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  margin: 0;
  padding: 0;

`;
const Label = styled.label`
  cursor: pointer;
`;

const Span = styled.span`
  display: block;
  width: ${(prop) => prop.size / 20}rem;
  height: ${(prop) => prop.size / 20}rem;
  background-color: transparent;
  border-radius: 50%;
  position: relative;
  right:${(prop) => (prop.size * 65) / 600}rem;
  top: ${(prop) =>
    -0.0001 * prop.size ** 3 +
    0.0063 * prop.size ** 2 -
    0.0486 * prop.size +
    0.7429}rem;

  transform: translate(-50%, -50%) scale(0);
  box-shadow: 0 -${(prop) => prop.size / 3}rem 0 ${(prop) => prop.color}, 
    0 ${(prop) => prop.size / 3}rem 0 ${(prop) => prop.color}, 
    -${(prop) => prop.size / 3}rem 0 0 ${(prop) => prop.color},
    ${(prop) => prop.size / 3}rem 0 0 ${(prop) => prop.color}, 
    -${(prop) => prop.size / 4}rem 
    -${(prop) => prop.size / 4}rem 0 ${(prop) => prop.color}, 
    ${(prop) => prop.size / 4}rem 
    -${(prop) => prop.size / 4}rem 0 ${(prop) => prop.color},
    ${(prop) => prop.size / 4}rem 
    ${(prop) => prop.size / 4}rem 0 ${(prop) => prop.color}, 
    -${(prop) => prop.size / 4}rem 
    ${(prop) => prop.size / 4}rem 0 ${(prop) => prop.color};
`;

const Svg = styled.svg`
  width: ${(prop) => prop.size / 5}rem;
  position: relative;
  z-index: 10;
`;

const Heart = styled.path`
  stroke: ${(prop) => prop.color};
  stroke-width: 40px;
  stroke-dasharray: 3000;
  stroke-dashoffset: 3000;
  stroke-linecap: round;
`;

const LikeContainer = styled(Label)`
  display: flex;
  justify-content: center;
  padding: 0.3rem;
  border-radius: 6px;
  width: fit-content;
  min-width: 3rem;
`;

function LikeButton({
  className,
  clicked = false,
  like = 0,
  size = 6,
  heartColor = '#ff6b81',
}) {
  const [click, setClick] = useState(clicked);
  const [likeCount, setLikeCount] = useState(like);
  const heart = useRef();
  const svg = useRef();
  const span = useRef();
  const checkbox = useRef();
  const disabledColor = '#eee';

  const animateHeart = () => {
    heart.current.animate(
      [
        { strokeDashoffset: 2600, fill: disabledColor },
        { strokeDashoffset: 0, fill: disabledColor, offset: 0.8 },
        {
          strokeDashoffset: 0,
          // fill: '#ff6b81'
        },
      ],
      {
        duration: 1000,
        fill: 'forwards',
        easing: 'linear',
      }
    );
  };

  const animateBeats = () => {
    svg.current.animate(
      [
        { transform: 'scale(1)' },
        { transform: 'scale(1)', offset: 0.7 },
        { transform: 'scale(1.2)', offset: 0.8 },
        { transform: 'scale(1)' },
      ],
      {
        duration: 1000,
        fill: 'forwards',
        easing: 'linear',
      }
    );
  };

  const animateBlinks = () => {
    span.current.animate(
      [
        { transform: 'translate(-50%, -50%) scale(0.5)', opacity: 0.8 },
        {
          transform: 'translate(-50%, -50%) scale(1)',
          opacity: 1,
          offset: 0.8,
        },
        { transform: 'translate(-50%, -50%) scale(1.1)', opacity: 0 },
      ],
      {
        duration: 2000,
        fill: 'forwards',
        easing: 'ease-in-out',
        delay: 800,
      }
    );
  };

  const clickLikeCount = () => {
    if (!click) {
      setClick(true);
      setLikeCount(likeCount + 1);

      span.current.style.transform = 'translate(-50%, -50%) scale(0)';
      span.current.style.opacity = '0.8';
      span.current.style.backgroundColor = heartColor;
      heart.current.style.fill = heartColor;
      heart.current.style.stroke = heartColor;

      checkbox.current.setAttribute('disabled', true);
      // 1.1초 후에 버튼을 다시 활성화합니다.
      setTimeout(function () {
        checkbox.current.removeAttribute('disabled');
      }, 1100); // 1.1초 후

      animateHeart();
      animateBeats();
      animateBlinks();
    } else {
      setClick(false);
      setLikeCount(likeCount - 1);
      heart.current.style.fill = disabledColor;
      heart.current.style.strokeDashoffset = '3000';
      heart.current.style.stroke = disabledColor;
    }
  };

  return (
    <>
      <GlobalStyle />
      <LikeContainer
        htmlFor="checkbox"
        className={`like-container ${className}`}
      >
        <input
          type="checkbox"
          id="checkbox"
          hidden
          onClick={clickLikeCount}
          ref={checkbox}
        />
        <Svg
          ref={svg}
          t="1689815540548"
          className="icon "
          viewBox="0 0 1024 1024"
          xmlns="http://www.w3.org/2000/svg"
          p-id="2271"
          size={size}
        >
          <Heart
            d="M742.4 101.12A249.6 249.6 0 0 0 512 256a249.6 249.6 0 0 0-230.72-154.88C143.68 101.12 32 238.4 32 376.32c0 301.44 416 546.56 480 546.56s480-245.12 480-546.56c0-137.92-111.68-275.2-249.6-275.2z"
            fill={click ? heartColor : disabledColor}
            p-id="2272"
            id="heart"
            ref={heart}
            color={heartColor}
          ></Heart>
        </Svg>
        <Span ref={span} size={size} color={heartColor}></Span>
        {likeCount}
      </LikeContainer>
    </>
  );
}

export default LikeButton;

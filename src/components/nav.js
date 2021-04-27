import React from 'react';

const Nav = (props) => {
  const dots = [];
  for (let i = 1; i <= props.totalSteps; i += 1) {
    const isActive = props.currentStep === i;
    dots.push(
      <span
        key={`step-${i}`}
        className={`navDot ${isActive ? 'active-step' : ''}`}>
        {'Step ' + i}
      </span>,
    );
  }

  return <div className={'registerNav'}>{dots}</div>;
};

export default Nav;

import React from 'react';
import Enzyme from "enzyme";
import { render, screen } from '@testing-library/react';
import { shallow, configure} from 'enzyme';
import { Button } from './components/Button';
import App from './App';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import '@testing-library/jest-dom'

configure({ adapter: new Adapter() })
const handleClick = () => {
  return <p>Hello</p>
}

const handleMouseLeave = () => {
  return <p>Bye</p>
}

test('Test Button component', () => {
  const button = shallow((<Button text={"Hello"} onClick={handleClick} onML={handleMouseLeave}>Ok!</Button>));
  //button.find('button').simulate('click');
  expect(button).toBeDefined();
  expect(button).toBeTruthy();
});


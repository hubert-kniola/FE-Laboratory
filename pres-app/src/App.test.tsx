import { render, screen } from '@testing-library/react';
import { shallow } from 'enzyme';
import { Button } from './components/Button';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

const handleClick = () => {
  return <p>Hello</p>
}

const handleMouseLeave = () => {
  return <p>Bye</p>
}

describe('Test Button component', () => {
  it('Test click event', () => {
    const button = shallow((<Button text={"Hello"} onClick={handleClick} onML={handleMouseLeave}>Ok!</Button>));
    //button.find('button').simulate('click');
    expect(button).toBeInTheDocument();
  });
});

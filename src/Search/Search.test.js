import React from 'react';
import ReactDOM from 'react-dom';
import { Search } from './Search';
import { configure, shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import toJson from "enzyme-to-json";

configure({ adapter : new Adapter() })

describe("<Search />", () => {
  const wrapper = shallow(<Search />); 

  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Search />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('should match snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should not submit form when enter key pressed inside username input', () => {
    const event = { preventDefault: jest.fn(), stopPropagation: jest.fn() };
    const form = wrapper.find('Form').first();
    form.simulate('submit', event);
    expect(event.preventDefault).toHaveBeenCalledTimes(1);
  });

  it('should route to repositories page', () => {
    //TODO using state
    //TODO replace state with redux
    const historyMock = { push : jest.fn() };
    const wrapper = mount(<Search history={historyMock} />);
    const input = wrapper.find('Input#username[required]').first();
    input.instance().value = 'test';
    input.simulate('change');
    const button = wrapper.find('Button').first();
    //set state here instead of value
    button.simulate('click', { value : 'test' });
    expect(historyMock.push.mock.calls[0]).toBe('/test-user/repositories');
  });

});


//test pressing find with text in textbox will navigate away from page
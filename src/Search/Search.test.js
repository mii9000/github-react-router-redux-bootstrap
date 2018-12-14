import React from 'react';
import ReactDOM from 'react-dom';
import { Search } from './Search';
import { configure, shallow } from "enzyme";
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

  it('should not redirect on keypress', () => {
    wrapper.find('Input').instance() = 'new value';
    //wrapper.find("Input").instance().value = "abc";
    expect(wrapper.find("Input").length).toBe(1);
  });

});


//test pressing enter on the textbox does not do anything
//test pressing find without entering anything will fire validation error
//test pressing find with text in textbox will navigate away from page
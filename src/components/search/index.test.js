import React from 'react'
import ReactDOM from 'react-dom'
import Search from './index'
import { configure, shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import toJson from 'enzyme-to-json'

configure({ adapter : new Adapter() })

describe('<Search />', () => {

  it('should render without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Search />, div)
    ReactDOM.unmountComponentAtNode(div)
  })

  it('should match snapshot', () => {
    const wrapper = shallow(<Search />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('should not submit form when enter key pressed inside username input', () => {
    const wrapper = shallow(<Search />)
    const event = { preventDefault: jest.fn(), stopPropagation: jest.fn() }
    const form = wrapper.find('Form').first()
    form.simulate('submit', event)
    expect(event.preventDefault).toHaveBeenCalledTimes(1)
  })

  it('should route to repositories page', () => {
    const historyMock = { push : jest.fn() }
    const wrapper = shallow(<Search history={historyMock} />)
    const button = wrapper.find('Button').first()
    wrapper.setState({ 
      value: 'test-user',
      valid: true
    })
    button.simulate('click')
    expect(historyMock.push.mock.calls[0][0]).toBe('/test-user/repositories')
  });

  it('should not route to repositories page if username empty', () => {
    const historyMock = { push : jest.fn() }
    const wrapper = shallow(<Search history={historyMock} />)
    const button = wrapper.find('Button').first()
    wrapper.setState({ 
      value: '',
      valid: true
    })
    button.simulate('click')
    expect(wrapper.find('.gh-error').length).toBe(1)
    expect(historyMock.push.mock.calls.length).toBe(0)
  });

});


//test pressing find with text in textbox will navigate away from page
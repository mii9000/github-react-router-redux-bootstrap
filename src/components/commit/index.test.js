import React from 'react'
import ReactDOM from 'react-dom'
import { configure, shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import toJson from 'enzyme-to-json'
import { BrowserRouter } from 'react-router-dom'
import { Commit } from './index'

configure({ adapter : new Adapter() })

const match = { params: { username: 'test', repo: 'test-repo' } }

describe('<Commit />', () => {

    it('should render without crashing', () => {
        const div = document.createElement('div')
        const mockGetCommits = jest.fn()
        const mockResetCommits = jest.fn()
        const mockSetError = jest.fn()
        ReactDOM.render(
        <BrowserRouter>
            <Commit error={''} 
                commitContainer={ {repo: '', commits: []} }
                match={ match }
                getCommits={mockGetCommits}
                resetCommits={mockResetCommits}
                setError={mockSetError} />
        </BrowserRouter>, div)
        // expect(mockGetCommits).toHaveBeenCalledTimes(1)
        // expect(mockResetCommits).toHaveBeenCalledTimes(1)
        ReactDOM.unmountComponentAtNode(div)
    })

})
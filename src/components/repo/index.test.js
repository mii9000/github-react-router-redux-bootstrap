import React from 'react'
import ReactDOM from 'react-dom'
import { configure, shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import toJson from 'enzyme-to-json'
import { BrowserRouter } from 'react-router-dom'
import {Repo} from './index'

configure({ adapter : new Adapter() })

const match = { params: { username: 'test' } }
const repos = [
    {
        id: 1,
        name: 'some-project',
        link: 'https://github.com',
        desc: 'mock desc',
        lang: 'js',
        date: 'date'
    }
]
const pageInfo = {
    endCursor: '',
    hasNextPage: true
}

describe('<Repo />', () => {
    
    it('should render without crashing', () => {
        const div = document.createElement('div')
        const mockGetRepos = jest.fn()
        ReactDOM.render(
        <BrowserRouter>
            <Repo error={''} 
                repoContainer={ {repos: []} }
                match={ match }
                getRepos={mockGetRepos} />
        </BrowserRouter>, div)
        expect(mockGetRepos).toHaveBeenCalledTimes(1)
        ReactDOM.unmountComponentAtNode(div)
    })
    
    it('should match snapshot', () => {
        const mockGetRepos = jest.fn()
        const wrapper = shallow(
        <Repo error={''} 
            repoContainer={ {repos} }
            match={ match }
            getRepos={mockGetRepos} />
        )
        expect(toJson(wrapper)).toMatchSnapshot()
        expect(mockGetRepos).toHaveBeenCalledTimes(1)
        expect(wrapper.find('Table').length).toBe(1)
    })

    it('should show alert if has error', () => {
        const mockGetRepos = jest.fn()
        const wrapper = mount(
            <BrowserRouter>
                <Repo error={ 'error' } 
                    repoContainer={ { repos } }
                    match={ match }
                    getRepos={ mockGetRepos } />            
            </BrowserRouter>
        )
        expect(wrapper.find('Alert').length).toBe(1)
        expect(wrapper.find('Table').length).toBe(0)
        expect(wrapper.find('div#preloader').length).toBe(0)
        wrapper.unmount()
    })

    it('should show loading', () => {
        const mockGetRepos = jest.fn()
        const wrapper = mount(
        <BrowserRouter>
            <Repo error={ 'error' } 
                repoContainer={ { repos } }
                match={ match }
                getRepos={ mockGetRepos }
                showLoading={ true } />
        </BrowserRouter>
        )
        expect(wrapper.find('div#preloader').length).toBe(1)
        wrapper.unmount()
    })

    it('should get more repos if scrolled to bottom', () => {
        const mockGetRepos = jest.fn()
        
        const map = {};
        window.addEventListener = jest.fn((event, cb) => {
            map[event] = cb;
        });
        
        const wrapper = mount(<BrowserRouter>
            <Repo error={ 'error' } 
                repoContainer={ { repos, pageInfo } }
                match={ match }
                getRepos={ mockGetRepos }
                showLoading={ false } />
        </BrowserRouter>)

        global.innerHeight = 0
        map.scroll()
        
        expect(mockGetRepos).toHaveBeenCalledTimes(2)
        wrapper.unmount()
    })


})
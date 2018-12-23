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
        expect(mockResetCommits).toHaveBeenCalledTimes(1)
        ReactDOM.unmountComponentAtNode(div)
    })

    it('should match snapshot', () => {
        const mockGetCommits = jest.fn()
        const mockResetCommits = jest.fn()
        const mockSetError = jest.fn()
        const wrapper = shallow(
        <Commit error={''} 
            commitContainer={ {repo: '', commits: [{
                id: 1,
                headline: 'headline',
                message: 'message',
                date: 'date'
            }]} }
            match={ match }
            getCommits={mockGetCommits}
            resetCommits={mockResetCommits}
            setError={mockSetError} />
        )
        expect(toJson(wrapper)).toMatchSnapshot()
    })

    it('should show alert if has error', () => {
        const mockGetCommits = jest.fn()
        const mockResetCommits = jest.fn()
        const mockSetError = jest.fn()
        const wrapper = mount(
            <BrowserRouter>
                <Commit error={ 'error '} 
                    commitContainer={ {repo: '', commits: [{
                        id: 1,
                        headline: 'headline',
                        message: 'message',
                        date: 'date'
                    }]} }
                    match={ match }
                    getCommits={mockGetCommits}
                    resetCommits={mockResetCommits}
                    setError={mockSetError} />         
            </BrowserRouter>
        )
        expect(wrapper.find('Alert').length).toBe(1)
        expect(wrapper.find('Table').length).toBe(0)
        expect(wrapper.find('div#preloader').length).toBe(0)
        wrapper.unmount()
    })

    it('should show loading', () => {
        const mockGetCommits = jest.fn()
        const mockResetCommits = jest.fn()
        const mockSetError = jest.fn()
        const wrapper = mount(
        <BrowserRouter>
            <Commit error={ 'error '} 
                commitContainer={ {repo: '', commits: [{
                    id: 1,
                    headline: 'headline',
                    message: 'message',
                    date: 'date'
                }]} }
                match={ match }
                getCommits={mockGetCommits}
                resetCommits={mockResetCommits}
                setError={mockSetError}
                showLoading={true} />    
        </BrowserRouter>
        )
        expect(wrapper.find('div#preloader').length).toBe(1)
        wrapper.unmount()
    })

    it('should get more commits if scrolled to bottom', () => {
        const mockGetCommits = jest.fn()
        const mockResetCommits = jest.fn()
        const mockSetError = jest.fn()
        
        const map = {};
        window.addEventListener = jest.fn((event, cb) => {
            map[event] = cb;
        });
        
        const wrapper = shallow(<Commit 
                error={''} 
                commitContainer={ 
                    {
                        repo: '', 
                        pageInfo: { 
                            hasNextPage: true
                        },
                        commits: [{
                            id: 1,
                            headline: 'headline',
                            message: 'message',
                            date: 'date'
                        }] 
                    } 
                }
                match={ match }
                getCommits={mockGetCommits}
                resetCommits={mockResetCommits}
                setError={mockSetError} />)

        global.innerHeight = 0
        map.scroll()
        
        expect(wrapper.state()).toEqual({
            isSearching: false,
            commits: [{ id: 1, headline: 'headline', message: 'message', date: 'date' }]
        })
        expect(wrapper.find('CommitItem').length).toBe(1)
        expect(mockResetCommits).toHaveBeenCalledTimes(1)
        expect(mockGetCommits).toHaveBeenCalledTimes(1)
    })

    it('should show filtered commits when searched', () => {
        const mockGetCommits = jest.fn()
        const mockResetCommits = jest.fn()
        const mockSetError = jest.fn()
        const commitContainer = {
            repo: '', 
            pageInfo: { 
                hasNextPage: true
            },
            commits: [{
                id: 1,
                headline: 'headline one',
                message: 'message one',
                date: 'date one'
            },{
                id: 2,
                headline: 'headline 2',
                message: 'message 2',
                date: 'date 2'
            }] 
        }

        const wrapper = shallow(<Commit 
            error={''} 
            commitContainer={ commitContainer }
            match={ match }
            getCommits={mockGetCommits}
            resetCommits={mockResetCommits}
            setError={mockSetError} />)

        expect(wrapper.find('CommitItem').length).toBe(2)

        const searchInput = wrapper.find('Input.gh-search').first()

        const event = {
            target: {
                value: 'headline 2'
            }
        }

        searchInput.simulate('change', event)
        
        const commitItems = wrapper.find('CommitItem') 
        expect(commitItems.length).toBe(1)
        expect(commitItems.first().prop('headline')).toEqual('headline 2');
        expect(wrapper.state()).toEqual({ isSearching: true,
            commits:[ 
                { id: 2,
                 headline: 'headline 2',
                 message: 'message 2',
                 date: 'date 2' 
            } 
        ]})
    })

})
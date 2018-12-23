import React, { Component } from 'react'
import { Table, Breadcrumb, BreadcrumbItem, Alert } from 'reactstrap'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getRepos, setUsername } from '../../state/actionCreators'
import './index.css'
import Loader from '../loading'


const RepoItem = (props) => (
    <tr onClick={props.onClick}>
        <th scope="row">
            <a href={props.link}>{props.name}</a>
        </th>
        <td>{props.desc}</td>
        <td>{props.lang}</td>
    </tr>            
)

export class Repo extends Component {

    componentDidMount(){
        const username = this.props.match.params.username
        if (username !== this.props.username) {
            this.props.getRepos(username)
            this.props.setUsername(username)
        }
        window.addEventListener('scroll', this._handleOnScroll)
    }

    componentWillUnmount(){
        window.removeEventListener('scroll', this._handleOnScroll)
    }

    _handleOnScroll = () => {
        if(this.props.showLoading || !this.props.repoContainer.pageInfo.hasNextPage) return
        
        if (window.innerHeight + document.documentElement.scrollTop
            === document.documentElement.offsetHeight) {
            this.props.getRepos(this.props.match.params.username, 
               this.props.repoContainer.pageInfo.endCursor)
        }
    }

    _handleOnClick = (repo) => {
        this.props.history.push(`/${this.props.match.params.username}/repositories/${repo.name}/commits`)
    }

    render() {
        return (
            <div>               
                <div className="gh-table-body">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <Breadcrumb>
                                    <BreadcrumbItem>
                                        <Link to='/'><strong>&larr;</strong></Link>
                                    </BreadcrumbItem>
                                    <BreadcrumbItem>
                                        { this.props.match.params.username }
                                    </BreadcrumbItem>
                                    <BreadcrumbItem active>Repositories</BreadcrumbItem>
                                </Breadcrumb>
                                {
                                    this.props.error.length > 0
                                    ?       
                                    <Alert color="danger">
                                        {this.props.error}
                                    </Alert>
                                    :
                                    <Table hover>
                                        <tbody>
                                            { this.props.repoContainer.repos
                                                .map(repo => <RepoItem onClick={_ => this._handleOnClick(repo)} key={repo.id} {...repo} />) }
                                        </tbody>
                                    </Table>
                                }
                                { this.props.showLoading 
                                    ? 
                                    <Loader /> 
                                    : 
                                    null 
                                }
                            </div>
                        </div>
                    </div>
                </div>                
            </div>
        );
    }
}

export default connect(
    (state) => ({repoContainer: state.repoContainer, 
        showLoading: state.showLoading, error: state.error, username: state.username}),
    {getRepos, setUsername}
  )(Repo)
  
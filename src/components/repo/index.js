import React, { Component } from 'react'
import { Table, Breadcrumb, BreadcrumbItem, Alert } from 'reactstrap'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { getRepos, showLoader } from '../../state/actionCreators'
import './index.css'
import Loader from '../loading'


const RepoItem = ({link, name, desc, lang, date}) => (
    <tr>
        <th scope="row">
            <a href={link}>{name}</a>
        </th>
        <td>{desc}</td>
        <td>{lang}</td>
        <td>{date}</td>
    </tr>
)

class Repo extends Component {

    componentDidMount(){
        this.props.getRepos(this.props.match.params.username)
    }

    render() {
        return (
            <div>               
                { this.props.showLoading ? <Loader /> : null }
                <div className="gh-table-body">
                    <div className="container">
                        <Breadcrumb>
                            <BreadcrumbItem>
                                <Link to='/'><strong>&larr;</strong></Link>
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
                                    { this.props.repos.map(repo => <RepoItem key={repo.id} {...repo} />) }
                                </tbody>
                            </Table>
                        }
                    </div>
                </div>                
            </div>
        );
    }
}

export default connect(
    (state) => ({repos: state.repos, showLoading: state.showLoading, error: state.error}),
    {getRepos, showLoader}
  )(Repo)
  
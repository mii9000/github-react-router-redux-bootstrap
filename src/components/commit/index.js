import React, { Component } from 'react'
import './index.css'
import { Breadcrumb, 
    BreadcrumbItem, 
    ListGroup,
    ListGroupItem,
    ListGroupItemHeading,
    ListGroupItemText,
    Input
 } from 'reactstrap'
 import { Link } from 'react-router-dom'

// const CommitItem = (props) =  (
//     <ListGroupItem>
//         <ListGroupItemHeading>
//             List group item heading
//         </ListGroupItemHeading>
//         <ListGroupItemText className="list-text">
//             <label className="list-text-left">Some text............................................</label>
//             <label className="list-text-right">Date</label>
//         </ListGroupItemText>
//     </ListGroupItem>
// )

class Commit extends Component {

    render() {
        return (
            <div className="gh-table-body">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <Breadcrumb>
                                <BreadcrumbItem>
                                    <Link to="/">Search</Link>
                                </BreadcrumbItem>
                                <BreadcrumbItem>
                                    <Link to={`/${this.props.match.params.username}/repositories`}>Repositories</Link>
                                </BreadcrumbItem>
                                <BreadcrumbItem active>
                                    Commits
                                </BreadcrumbItem>
                            </Breadcrumb>                    
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-8">
                            <h3>Name of the repo</h3>
                        </div>
                        <div className="col-lg-4">
                            <Input className="gh-search" placeholder="Enter text to search...." />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <ListGroup>

                            </ListGroup>
                        </div>
                    </div>
                </div>
            </div>
        );
      }    
}

export default Commit

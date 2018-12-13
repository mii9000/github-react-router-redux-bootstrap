import React, { Component } from 'react';
import './Commit.css';
import { Breadcrumb, 
    BreadcrumbItem, 
    ListGroup,
    ListGroupItem,
    ListGroupItemHeading,
    ListGroupItemText
 } from 'reactstrap';

class Commit extends Component {
    render() {
        return (
            <div className="gh-table-body">
                <div className="container">
                    <Breadcrumb>
                        <BreadcrumbItem><a href="#">Ibrahim-Islam</a></BreadcrumbItem>
                        <BreadcrumbItem><a href="#">cli</a></BreadcrumbItem>
                        <BreadcrumbItem active>Commits - master</BreadcrumbItem>
                    </Breadcrumb>
                    <ListGroup>
                        <ListGroupItem>
                            <ListGroupItemHeading>
                                List group item heading
                            </ListGroupItemHeading>
                            <ListGroupItemText className="list-text">
                                <div class="list-text-left">Some text............................................</div>
                                <div class="list-text-right">Date</div>
                            </ListGroupItemText>
                        </ListGroupItem>
                        <ListGroupItem>
                            <ListGroupItemHeading>
                                List group item heading
                            </ListGroupItemHeading>
                            <ListGroupItemText className="list-text">
                                <div class="list-text-left">Some text............................................</div>
                                <div class="list-text-right">Date</div>
                            </ListGroupItemText>
                        </ListGroupItem>                        
                </ListGroup>
                </div>
            </div>
        );
      }    
}

export default Commit;
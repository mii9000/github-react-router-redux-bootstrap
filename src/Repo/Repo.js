import React, { Component } from 'react';
import { Table, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import './Repo.css';

class Repo extends Component {
  render() {
    return (
        <div className="gh-table-body">
            <div className="container">
                <Breadcrumb>
                    <BreadcrumbItem><a href="#">Ibrahim-Islam</a></BreadcrumbItem>
                    <BreadcrumbItem active>Repositories</BreadcrumbItem>
                </Breadcrumb>
                <Table hover>
                    <tbody>
                        <tr>
                            <th scope="row">
                                <a href="#">cli</a>
                            </th>
                            <td>This repo contains the .NET Core command-line (CLI) tools...</td>
                            <td>C#</td>
                            <td>Updated on Nov 13</td>
                        </tr>
                        <tr>
                            <th scope="row">
                                <a href="#">this-not-that</a>
                            </th>
                            <td>MongoDB Stitch Hacktoberfest</td>
                            <td>CSS</td>
                            <td>Updated on Oct 31</td>
                        </tr>
                        <tr>
                        <th scope="row">
                            <a href="#">UmbracoDocs</a>
                        </th>
                        <td>The official Umbraco Documentation</td>
                        <td></td>
                        <td>Updated on Oct 18</td>
                    </tr>
                    </tbody>
                </Table>
            </div>
        </div>
    );
  }
}

export default Repo;

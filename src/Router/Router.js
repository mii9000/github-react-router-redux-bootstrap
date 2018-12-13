import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Search from "../Search/Search";
import Repo from "../Repo/Repo";
import Commit from "../Commit/Commit";

const Router = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path = "/" component = {Search} />
            <Route path = "/repositories" component = {Repo} />
            <Route path = "/repositories/:name/commits" component = {Commit} />
            {/* <Route component = {NotFound} /> */}
        </Switch>
    </BrowserRouter>
);

export default Router;
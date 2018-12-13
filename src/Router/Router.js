import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Search from "../Search/Search";
import Repo from "../Repo/Repo";
import Commit from "../Commit/Commit";

const Router = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path = "/" component = {Search} />
            <Route exact path = "/:username/repositories" component = {Repo} />
            <Route exact path = "/:username/repositories/:name/commits" component = {Commit} />
            <Route render={() => (
                //TODO Render a component here with not found gif
                <div>No Have!!!</div>
            )} />
        </Switch>
    </BrowserRouter>
);

export default Router;

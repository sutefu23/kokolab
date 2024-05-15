import React, { Fragment } from "react";
import LeftMenu from "../LeftMenu/LeftMenu";
import TopMenu from "../TopMenu/TopMenu";
import { Switch, Route } from "react-router";
import Orders from "../Orders/Orders";
import Reports from "../Reports/Reports";

const Admin: React.FC = () => {
    return (
        <Fragment>
            <LeftMenu />
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                    <TopMenu />
                    <div className="container-fluid">
                        <Switch>
                            <Route exact path={`/admin`}>
                                <Orders />
                            </Route>
                            <Route exact path={`/admin/reports`}>
                                <Reports />
                            </Route>
                        </Switch>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Admin;

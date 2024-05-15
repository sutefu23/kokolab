import React from "react";
import "./App.css";
import "./styles/sb-admin-2.css";
import {
    BrowserRouter as Router,
    Switch,
    Redirect,
    Route,
} from "react-router-dom";
import Login from "./pages/Account/Login";
import Admin from "./pages/Admin/Admin";
import { PrivateRoute } from "./common/components/PrivateRoute";
import { AccountRoute } from "./common/components/AccountRoute";
import { useQueryClient } from "react-query";
import useGetUserQuery from "./hooks/user/useGetUserQuery";
import Loading from "./common/components/Loading";
import { RecoilRoot } from "recoil";

const App: React.FC = () => {
    const queryClient = useQueryClient();
    const {
        isLoading,
        isError,
        data: user,
    } = useGetUserQuery({
        retry: 0,
        initialData: undefined,
        onError: () => {
            queryClient.setQueryData("user", null);
        },
    });

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className="App" id="wrapper">
            <Router>
                <Switch>
                    <PrivateRoute path="/admin">
                        <RecoilRoot>
                            <Admin />
                        </RecoilRoot>
                    </PrivateRoute>
                    <AccountRoute path="/login" exact>
                        <Login />
                    </AccountRoute>
                    {/* Catch-all route to handle non-existing paths */}
                    <Route path="*">
                        {user ? (
                            <Redirect to="/admin" />
                        ) : (
                            <Redirect to="/login" />
                        )}
                    </Route>
                </Switch>
            </Router>
        </div>
    );
};

export default App;

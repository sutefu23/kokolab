import { Route, Redirect, RouteProps } from "react-router";
import React from "react";
import Login from "../../pages/Account/Login";
import useCurrentUser from "../../hooks/user/useCurrentUser";


export function AccountRoute({ children, ...rest }: RouteProps): JSX.Element {
    const isLogin: boolean = useCurrentUser() ? true : false;

    return (
        <Route
            {...rest}
            render={() =>
                isLogin ? (
                    <Redirect
                        to={{
                            pathname: "/admin/home"
                        }}
                    />
                ) : <Login />
            }
        />
    );
}
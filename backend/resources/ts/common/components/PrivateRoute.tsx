import React from "react";
import { Route, RouteProps, Redirect } from "react-router-dom"; // Redirectをインポートする
import useCurrentUser from "../../hooks/user/useCurrentUser";

export function PrivateRoute({ children, ...rest }: RouteProps): JSX.Element {
    const isLogin: boolean = useCurrentUser() ? true : false;

    return (
        <Route
            {...rest}
            render={(routeProps) =>
                isLogin ? (
                    (children as React.ReactNode)
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: routeProps.location },
                        }}
                    /> // ログインページへのリダイレクト
                )
            }
        />
    );
}

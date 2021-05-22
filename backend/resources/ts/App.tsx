import React from "react";
import "./App.css";
import "./styles/sb-admin-2.min.css";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import Login from "./pages/Account/Login";
import Admin from "./pages/Admin/Admin";
import { PrivateRoute } from "./common/components/PrivateRoute";
import { AccountRoute } from "./common/components/AccountRoute";
import { useQueryClient } from "react-query";
import useGetUserQuery from "./hooks/user/useGetUserQuery";
import Loading from "./common/components/Loading";


const App: React.FC = () => {
  const queryClient = useQueryClient();
  const { isLoading } = useGetUserQuery({
    retry: 0,
    initialData: undefined,
    onError: () => {
      queryClient.setQueryData('user', null);
    },
  });

  if (isLoading) {
    return <Loading/>
  }

  return (
    <div className="App" id="wrapper">
      <Router>
        <Switch>
          <PrivateRoute path="/">
            <Admin />
          </PrivateRoute>
          <AccountRoute path="/login"><Login /></AccountRoute>
        </Switch>
      </Router>
    </div>
  );
};

export default App;

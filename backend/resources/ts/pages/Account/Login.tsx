import React, { useState, useCallback } from "react";
import { useHistory , useLocation } from 'react-router-dom';
import TextInput from "../../common/components/TextInput";
import { useLogin } from "../../hooks/auth";
const Login: React.FC = () => {

  const { error, isLoading, mutate } = useLogin();

  const statusCode = error?.response?.status;

  const history = useHistory();
  const location = useLocation();
  
  const { from } = (location.state as { from: string }) || {
    from: { pathname: '/'}
  }
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChangeEmail = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(event.target.value);
    }
  ,[])

  const handleChangePassword = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(event.target.value)
    }
  ,[])

  const submit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(!password || !email) {
      return;
    }
    mutate(
      {email, password },
      {
        onSuccess: () => {
          history.replace(from)
        }
      }
    );
    },
    [email, password, history, from , mutate],
  );
  function isFormInvalid() {
    return (!email || !password);
  }

  function getDisabledClass(): string {
    const isError: boolean = isFormInvalid() ;
    return isError ? "disabled" : "";
  }

  return (

    <div className="container">
      <div className="row justify-content-center">
        <div className="col-xl-10 col-lg-12 col-md-9">
          <div className="card o-hidden border-0 shadow-lg my-5">
            <div className="card-body p-0">
              <div className="row">
                <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                <div className="col-lg-6">
                  <div className="p-5">
                    <div className="text-center">
                      <h1 className="h4 text-gray-900 mb-4">Kokolab!</h1>
                    </div>
                    <form className="user" onSubmit={submit}>
                      <div className="form-group">

                        <TextInput id="input_email"
                          field="email"
                          value={email}
                          onChange={handleChangeEmail}
                          required={true}
                          maxLength={100}
                          label="Email"
                          placeholder="Email" />
                      </div>
                      <div className="form-group">
                        <TextInput id="input_password"
                          field="password"
                          value={password}
                          onChange={handleChangePassword}
                          required={true}
                          maxLength={100}
                          type="password"
                          label="Password"
                          placeholder="Password" />
                      </div>
                      <div className="form-group">
                        <div className="custom-control custom-checkbox small">
                          <input type="checkbox" className="custom-control-input" id="customCheck" />
                          <label className="custom-control-label"
                            htmlFor="customCheck">Remember Me</label>
                        </div>
                      </div>
                      <button
                        className={`btn btn-primary btn-user btn-block ${getDisabledClass()}`}
                        type="submit">
                        Login
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

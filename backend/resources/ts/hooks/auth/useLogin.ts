import { useQueryClient, UseMutationResult, useMutation } from 'react-query'
import axios, { AxiosError } from 'axios'
import { User } from '../../models/user'
import { ErrorResponse } from "../../error/response";

type LoginRequest = {
  email: string ,
  password: string
}

const login = async (formData: LoginRequest): Promise<User> => {
  const { data } = await axios.post<User>('/api/login', formData);
  return data;
}

const useLogin = (): UseMutationResult<
  User,
  AxiosError<ErrorResponse>,
  LoginRequest,
  undefined
> => {
  const queryClient = useQueryClient();
  return useMutation(login, {
    onSuccess: (data) => {
      queryClient.setQueryData('user', data);
    }
  });
}

export default useLogin;
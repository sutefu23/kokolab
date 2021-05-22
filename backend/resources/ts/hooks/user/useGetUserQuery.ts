import { QueryObserverResult, useQuery, UseQueryOptions } from 'react-query';
import axios, { AxiosError } from 'axios';
import { User } from '../../models/user';

const getLoginUser = async (): Promise<User> => {
  const { data } = await axios.get<User>('/api/users/me');
  return data;
}

const useGetUserQuery = <TData = User>(
  options?: UseQueryOptions<User, AxiosError, TData>
): QueryObserverResult<TData, AxiosError> => 
  useQuery('user', getLoginUser, options);



export default useGetUserQuery;
import { useQueryClient } from 'react-query';
import { User } from '../../models/user';

const useCurrentUser = (): User | null | undefined => {
  const queryClient = useQueryClient();
  return queryClient.getQueryData('user');
}
export default useCurrentUser;
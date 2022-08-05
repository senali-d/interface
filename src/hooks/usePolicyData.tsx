import { AddressZero } from '@ethersproject/constants';
import { useMemo } from 'react';
import { useAccount } from 'wagmi';
import { usePolicyDataQuery } from './graphql/user-data-provider/hooks';

export function usePolicyData() {
  const { address } = useAccount();

  const { data } = usePolicyDataQuery({
    variables: { account: address?.toLowerCase() || AddressZero },
    pollInterval: 2000,
    fetchPolicy: 'network-only',
  });

  const ownedPolicies = data?.policies;

  return useMemo(() => ({ ownedPolicies }), [ownedPolicies]);
}
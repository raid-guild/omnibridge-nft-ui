import { useBridgeContext } from 'contexts/BridgeContext';
import { useWeb3Context } from 'contexts/Web3Context';
import { useBridgeDirection } from 'hooks/useBridgeDirection';
import { fetch721TokenList, fetch1155TokenList } from 'lib/tokenList';
import { useCallback, useEffect, useState } from 'react';

const tokenSearchFilter = searchText => ({
  name,
  symbol,
  address,
  tokenId,
}) => {
  const nameSearch = name ? name.toLowerCase().indexOf(searchText) >= 0 : false;
  const symbolSearch = symbol
    ? symbol.toLowerCase().indexOf(searchText) >= 0
    : false;
  const addressSearch = address
    ? address.toLowerCase().indexOf(searchText) >= 0
    : false;
  const tokenIdSearch = tokenId
    ? tokenId.toLowerCase().indexOf(searchText) >= 0
    : false;
  return nameSearch || symbolSearch || addressSearch || tokenIdSearch;
};

export const useUserTokens = () => {
  const {
    getEIP721GraphEndpoint,
    getEIP1155GraphEndpoint,
  } = useBridgeDirection();
  const { searchText, txHash } = useBridgeContext();
  const { account, providerChainId } = useWeb3Context();
  const [fetching, setFetching] = useState(false);
  const [{ allEIP721Tokens, allEIP1155Tokens }, setAllTokens] = useState({
    allEIP721Tokens: [],
    allEIP1155Tokens: [],
  });
  const [{ eip721Tokens, eip1155Tokens }, setTokens] = useState({
    eip721Tokens: [],
    eip1155Tokens: [],
  });

  const loadTokens = useCallback(async () => {
    if (!providerChainId || !account) {
      setAllTokens({ allEIP721Tokens: [], allEIP1155Tokens: [] });
      return;
    }
    setFetching(true);
    const [tokens721, tokens1155] = await Promise.all([
      fetch721TokenList(
        providerChainId,
        account,
        getEIP721GraphEndpoint(providerChainId),
      ),
      fetch1155TokenList(
        providerChainId,
        account,
        getEIP1155GraphEndpoint(providerChainId),
      ),
    ]);
    setAllTokens({ allEIP721Tokens: tokens721, allEIP1155Tokens: tokens1155 });
    setFetching(false);
  }, [
    account,
    providerChainId,
    getEIP721GraphEndpoint,
    getEIP1155GraphEndpoint,
  ]);

  useEffect(() => {
    loadTokens();
  }, [loadTokens, txHash]);

  useEffect(() => {
    setTokens({
      eip721Tokens: allEIP721Tokens.filter(tokenSearchFilter(searchText)),
      eip1155Tokens: allEIP1155Tokens.filter(tokenSearchFilter(searchText)),
    });
  }, [searchText, allEIP721Tokens, allEIP1155Tokens]);

  return { fetching, eip721Tokens, eip1155Tokens };
};

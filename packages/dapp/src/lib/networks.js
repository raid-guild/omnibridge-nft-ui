export const GUSANDBOX_GOERLI_DEV_BRIDGE = 'gusandbox-goerli-dev';
export const GUSANDBOX_GOERLI_TEST_BRIDGE = 'gusandbox-goerli-test';

const GUSANDBOX_GOERLI_BRIDGE_DEV_CONFIG = {
  label: 'G.U.Sandbox⥊Görli',
  homeChainId: 99999,
  foreignChainId: 5,
  foreignMediatorAddress:
    '0xB9f181f0154808c62A600d35217Be79F677FC5b8'.toLowerCase(),
  homeMediatorAddress:
    '0x84B67EBa0362cD118A2Fe1c8ad5173ACc781B371'.toLowerCase(),
  foreignAmbAddress: '0x0F806D8dd8bb02Ad9dd9bA0e8e351B4319cc45e4'.toLowerCase(),
  homeAmbAddress: '0xc39eAbae09273F00Ec7e56B6a8C189437a61C9C8'.toLowerCase(),
  ambLiveMonitorPrefix: 'http://alm.dev.nft-bridge.gu.net',
  foreignBridgeSubgraph: 'cuonghx1108/goerli-gusandbox-nft-dev',
  homeBridgeSubgraph: 'cuonghx1108/gusandbox-goerli-nft-dev',
  home721Subgraph: 'cuonghx1108/gu-bridge-eip721-dev-1',
  foreign721Subgraph: 'cuonghx1108/gu-bridge-eip721-dev-1',
  home1155Subgraph: 'gulabs/erc1155-subgraph',
  foreign1155Subgraph: 'cuonghx1108/eip1155-goerli',
  claimDisabled: false,
  tokensClaimDisabled: [],
  tokenFactoryAddress: '0x3fD323734104Bf4FdE0E60E620B94051787F14A3',
};

const GUSANDBOX_GOERLI_BRIDGE_TEST_CONFIG = {
  label: 'G.U.Sandbox⥊Görli',
  homeChainId: 99999,
  foreignChainId: 5,
  foreignMediatorAddress:
    '0x29fe06459E15426704C3c58F849d74aB3f7F636c'.toLowerCase(),
  homeMediatorAddress:
    '0x002FDE085C6cc481C16d4929034eEEd6B6486Cac'.toLowerCase(),
  foreignAmbAddress: '0x3Bc43B44FB8ab97a75b080D1B05c2439A98788B4'.toLowerCase(),
  homeAmbAddress: '0xbD6D4E96e34546473c62C49D12a4B2EAdc55235A'.toLowerCase(),
  ambLiveMonitorPrefix: 'https://alm.test.nft-bridge.gu.net',
  foreignBridgeSubgraph: 'cuonghx1108/goerli-gu-nft-test-1',
  homeBridgeSubgraph: 'cuonghx/gusandbox-goerli-omnibridge-nft-test-1',
  home721Subgraph: 'cuonghx1108/gu-bridge-eip721-test',
  foreign721Subgraph: 'cuonghx1108/gu-bridge-eip721-test-1',
  home1155Subgraph: 'gulabs/erc1155-subgraph',
  foreign1155Subgraph: 'cuonghx1108/eip1155-goerli',
  claimDisabled: false,
  tokensClaimDisabled: [],
  tokenFactoryAddress: '0xcBcEB313701faA8Bd102D9fa34cbf4D8b5fCcfbD',
};

const ENABLED_BRIDGES = process.env.REACT_APP_ENABLED_BRIDGES.split(' ').map(
  b => b.toLowerCase(),
);

const bridgeInfo = {
  [GUSANDBOX_GOERLI_DEV_BRIDGE]: GUSANDBOX_GOERLI_BRIDGE_DEV_CONFIG,
  [GUSANDBOX_GOERLI_TEST_BRIDGE]: GUSANDBOX_GOERLI_BRIDGE_TEST_CONFIG,
};

const getNetworkConfig = bridges => {
  if (bridges && bridges.length > 0 && bridgeInfo) {
    return bridges.reduce((t, b) => ({ ...t, [b]: bridgeInfo[b] }), {});
  }
  return bridgeInfo;
};

export const networks = getNetworkConfig(ENABLED_BRIDGES);

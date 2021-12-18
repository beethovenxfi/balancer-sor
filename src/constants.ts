import { Zero } from '@ethersproject/constants';
import { ZERO } from './utils/bignumber';
import { SwapInfo } from './types';

export const WETHADDR: { [chainId: number]: string } = {
    1: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    3: '0xdFCeA9088c8A88A76FF74892C1457C17dfeef9C1',
    4: '0x80dD2B80FbcFB06505A301d732322e987380EcD6',
    5: '0x9A1000D492d40bfccbc03f413A48F5B6516Ec0Fd',
    42: '0xdFCeA9088c8A88A76FF74892C1457C17dfeef9C1',
    137: '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270', // For Polygon this is actually wrapped MATIC
    42161: '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1',
    250: '0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83', // For Fantom this is actually wrapped WFTM
};

export const MULTIADDR: { [chainId: number]: string } = {
    1: '0xeefba1e63905ef1d7acba5a8513c70307c1ce441',
    3: '0x53c43764255c17bd724f74c4ef150724ac50a3ed',
    4: '0x3BA06277e9c51971F99Ab3b46a1E6374B66d7aeF',
    5: '0x3b2A02F22fCbc872AF77674ceD303eb269a46ce3',
    42: '0x2cc8688C5f75E365aaEEb4ea8D6a480405A48D2A',
    137: '0xa1B2b503959aedD81512C37e9dce48164ec6a94d',
    42161: '0x269ff446d9892c9e19082564df3f5e8741e190a1',
    250: '0x09523Acc78Dd297Ae5Da00DdeBE6f10ebF784565',
};

export const VAULTADDR: { [chainId: number]: string } = {
    1: '0xBA12222222228d8Ba445958a75a0704d566BF2C8',
    3: '0xBA12222222228d8Ba445958a75a0704d566BF2C8',
    4: '0xF07513C68C55A31337E3b58034b176A15Dce16eD',
    5: '0x65748E8287Ce4B9E6D83EE853431958851550311',
    42: '0xBA12222222228d8Ba445958a75a0704d566BF2C8',
    137: '0xBA12222222228d8Ba445958a75a0704d566BF2C8',
    42161: '0xBA12222222228d8Ba445958a75a0704d566BF2C8',
    250: '0x20dd72Ed959b6147912C2e529F0a0C651c33c9ce',
};

// Currently only used for Polygon
// ID of USDC Connecting Pool & USDC token address
export const USDCCONNECTINGPOOL: {
    [chainId: number]: { id: string; usdc: string };
} = {
    99: {
        id: 'usdcConnecting',
        usdc: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174',
    },
};

// Currently only used for Polygon
// Address of staBAL3 pool
export const STABALADDR: { [chainId: number]: string } = {
    99: '0x0000000000000000000000000000000000000001',
};

export const EMPTY_SWAPINFO: SwapInfo = {
    tokenAddresses: [],
    swaps: [],
    swapAmount: Zero,
    swapAmountForSwaps: Zero,
    tokenIn: '',
    tokenOut: '',
    returnAmount: Zero,
    returnAmountConsideringFees: Zero,
    returnAmountFromSwaps: Zero,
    marketSp: Zero.toString(),
};

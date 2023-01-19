
export type NetworkName = 'mainnet' | 'goerli';

export enum ChainId {
  Mainnet = 1,
	Goerli = 5,
}

export const ChainIdToNetworkName: Record<ChainId, NetworkName> = {
	[1]: 'mainnet',
	[5]: 'goerli',
};

export interface ContractAddresses {
	crawlerToken: string;
	cardsMinter: string;
}

export interface SomeData {
	data1: number;
	data2: string;
}



// interface CatInfo {
// 	age: number;
// 	breed: string;
// }
// type CatName = 'miffy' | 'boris' | 'mordred';
// const cats: Record<CatName, CatInfo> = {
// 	miffy: { age: 10, breed: 'Persian' },
// 	boris: { age: 5, breed: 'Maine Coon' },
// 	mordred: { age: 16, breed: 'British Shorthair' },
// };

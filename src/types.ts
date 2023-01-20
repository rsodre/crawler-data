
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

export interface Compass {
	north?: number;
	east?: number;
	west?: number;
	south?: number;
}

export interface Coords {
	compass: Compass;
	coord: string;
}

export interface StaticChamberData {
	compass: Compass;
	coord: string;
	seed: string;
	tokenId: number;
	yonder: number;
	name: string;
	chapter: number;
	terrain: number;
	entryDir: number;
	gemPos: number;
	gemType: number;
	coins: number;
	worth: number;
	doors: number[];
	locks: boolean[];
	locksCount: number;
}


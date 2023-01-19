import { ChainId } from '../types';
import data from './data.json';

/**
 * Get the address of the contract of cached data
 * @param chainId The desired chainId
 */
export const getAddress = (chainId: ChainId): string => {
	return data[chainId]?.address ?? null;
}

export const getTokenCount = (chainId: ChainId): number => {
	return Object.keys(data[chainId]?.tokenIdToCoord ?? {}).length;
}

export const getTokenIdToCoord = (chainId: ChainId, tokenId: number): object => {
	return data[chainId]?.tokenIdToCoord?.[tokenId] ?? null;
}

export const getStaticChamberData = (chainId: ChainId, coord: string): object => {
	return data[chainId]?.staticChamberData?.[coord] ?? null;
}

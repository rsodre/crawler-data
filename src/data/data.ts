import { ChainId, Coords, StaticChamberData } from '../types'
import data from './data.json'

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

export const getTokenIdToCoords = (chainId: ChainId, tokenId: number): Coords => {
	const _data: Record<string, Coords> = data[chainId]?.tokenIdToCoord;
	return _data?.[tokenId] ?? null;
}

export const getStaticChamberData = (chainId: ChainId, coord: string): StaticChamberData => {
	const _data: Record<string, StaticChamberData> = data[chainId]?.staticChamberData;
	return _data?.[coord] ?? null;
}

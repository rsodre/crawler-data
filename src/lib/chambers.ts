import data from '../data/chambers.json'
import {
	ChainId,
	Address,
	BNString,
	RawData,
	NetworkData,
	TokenIdToCoordsView,
	ChamberCoords,
	ChamberDataView,
	ChamberData,
} from './types'


/**
 ** @returns the full raw data of a network
 */
export const getRawData = (): RawData => {
	return data
}

/**
 ** @param chainId the network chain id (1 or 5)
 ** @returns the full raw data of a network
 */
export const getNetworkData = (chainId: ChainId = ChainId.Mainnet): NetworkData => {
	return data[chainId] ?? null
}

// export const getAddress = (chainId: ChainId): Address => {
// 	return data[chainId]?.address ?? null
// }

/**
 ** @param chainId the network chain id (1 or 5)
 ** @returns total minted chambers count
 */
export const getTokenCount = (chainId: ChainId = ChainId.Mainnet): number => {
	return Object.keys(data[chainId]?.tokenIdToCoord ?? {}).length
}

/**
 ** @param chainId the network chain id (1 or 5)
 ** @returns all minted chambers coordinates, by token id
 */
export const getTokenIdToCoordsView = (chainId: ChainId = ChainId.Mainnet): TokenIdToCoordsView => {
	return data[chainId]?.tokenIdToCoord ?? null
}

/**
 ** @param chainId the network chain id (1 or 5)
 ** @param tokenId the token id
 ** @returns the coordinates of the chamber
 */
export const getTokenIdToCoords = (tokenId: number, chainId: ChainId = ChainId.Mainnet): ChamberCoords => {
	const _data: TokenIdToCoordsView = data[chainId]?.tokenIdToCoord
	return _data?.[tokenId] ?? null
}

/**
 ** @param chainId the network chain id (1 or 5)
 ** @returns all minted chambers data, by {Coord} (BN)
 */
export const getChamberDataView = (chainId: ChainId = ChainId.Mainnet): ChamberDataView => {
	return data[chainId]?.chamberData ?? null
}

/**
 ** @param chainId the network chain id (1 or 5)
 ** @param coord chamber coordinate (BN)
 */
export const getChamberData = (coord: BNString, chainId: ChainId = ChainId.Mainnet): ChamberData => {
	const _data: ChamberDataView = data[chainId]?.chamberData
	return _data?.[coord] ?? null
}



//------------------------------
// Constants
//
export enum Tile {
	Void = 0x00,
	Entry = 0x01,
	Exit = 0x02,
	LockedExit = 0x03,
	Gem = 0x04,
	HatchClosed = 0x05,
	HatchDown = 0x06,
	HatchUp = 0x07,
	Empty = 0xfe,
	Path = 0xff,
}

export enum Terrain {
	Empty = 0,
	Earth = 1,
	Water = 2,
	Air = 3,
	Fire = 4,
}
export const OppositeTerrain = {
	[Terrain.Empty]: Terrain.Empty,
	[Terrain.Earth]: Terrain.Air,
	[Terrain.Water]: Terrain.Fire,
	[Terrain.Air]: Terrain.Earth,
	[Terrain.Fire]: Terrain.Water,
}
export const TerrainNames = {
	[Terrain.Empty]: '',
	[Terrain.Earth]: 'Earth',
	[Terrain.Water]: 'Water',
	[Terrain.Air]: 'Air',
	[Terrain.Fire]: 'Fire',
}

export enum Gem {
	Silver = 0,
	Gold = 1,
	Sapphire = 2,
	Emerald = 3,
	Ruby = 4,
	Diamond = 5,
	Ethernite = 6,
	Kao = 7,
	// not a gem!
	Coin = 8,
	// gem count
	Count = 8,
}
export const GemNames = {
	[Gem.Silver]: 'Silver',
	[Gem.Gold]: 'Gold',
	[Gem.Sapphire]: 'Sapphire',
	[Gem.Emerald]: 'Emerald',
	[Gem.Ruby]: 'Ruby',
	[Gem.Diamond]: 'Diamond',
	[Gem.Ethernite]: 'Ethernite',
	[Gem.Kao]: 'Kao',
	[Gem.Coin]: 'Coin',
}

export enum Dir {
	North = 0,
	East = 1,
	West = 2,
	South = 3,
}
export const FlippedDir = {
	[Dir.North]: Dir.South,
	[Dir.East]: Dir.West,
	[Dir.West]: Dir.East,
	[Dir.South]: Dir.North,
}
export const DirNames = {
	[Dir.North]: 'North',
	[Dir.East]: 'East',
	[Dir.West]: 'West',
	[Dir.South]: 'South',
}


//-----------------------------------
// Directions
//

export const flipDir = (dir: Dir): Dir => {
	return FlippedDir[dir]
}

// Opposite terrains cannot connect to each other
// Earth <> Air / Water <> Fire
// equals to Crawl.getOppositeTerrain()
export const getOppositeTerrain = (terrain: Terrain): Terrain => {
	return OppositeTerrain[terrain]
}


//-----------------------------------
// coord (uint256)
//

// The maximum value in any Compass direction
export const CompassMax = BigInt('0xffffffffffffffff') // 64-bit, 18446744073709551615n, 18_446_744_073_709_551_615

// coord bit mask for each Compass direction
export const Mask = {
	// the basic direction mask (uint64)
	Dir: CompassMax,
	// mask of each directin inside uint256
	North: (CompassMax << 192n),
	East: (CompassMax << 128n),
	West: (CompassMax << 64n),
	South: CompassMax,
	// Inverted Masks
	InvNorth: ~(CompassMax << 192n),
	InvEast: ~(CompassMax << 128n),
	InvWest: ~(CompassMax << 64n),
	InvSouth: ~CompassMax,
}

// The number 1 in each Compass direction
export const CompassOne = {
	North: (1n << 192n),
	East: (1n << 128n),
	West: (1n << 64n),
	South: 1n,
}

export const offsetCoord = (coord: bigint, dir: Dir): bigint => {
	if (dir == Dir.North) {
		if ((coord & Mask.South) > CompassOne.South) return coord - CompassOne.South // --South
		if ((coord & Mask.North) != Mask.North) return (coord & Mask.InvSouth) + CompassOne.North // ++North
	} else if (dir == Dir.East) {
		if ((coord & Mask.West) > CompassOne.West) return coord - CompassOne.West // --West
		if ((coord & Mask.East) != Mask.East) return (coord & Mask.InvWest) + CompassOne.East // ++East
	} else if (dir == Dir.West) {
		if ((coord & Mask.East) > CompassOne.East) return coord - CompassOne.East // --East
		if ((coord & Mask.West) != Mask.West) return (coord & Mask.InvEast) + CompassOne.West // ++West
	} else if (dir == Dir.South) {
		if ((coord & Mask.North) > CompassOne.North) return coord - CompassOne.North // --North
		if ((coord & Mask.South) != Mask.South) return (coord & Mask.InvNorth) + CompassOne.South // ++South
	}
	return coord
}



//-----------------------------------
// Compass, slug, converters
//

export type AbsentDir = 0 | null | undefined
export interface CompassNE {
	north: number
	east: number
	west?: AbsentDir
	south?: AbsentDir
}
export interface CompassNW {
	north: number
	east?: AbsentDir
	west: number
	south?: AbsentDir
}
export interface CompassSE {
	north?: AbsentDir
	east: number
	west?: AbsentDir
	south: number
}
export interface CompassSW {
	north?: AbsentDir
	east?: AbsentDir
	west: number
	south: number
}
export type Compass = CompassNE | CompassNW | CompassSE | CompassSW


export const validateCompass = (compass: Compass | null): boolean => {
	if (!compass) return false
	const hasNorth = (compass.north && compass.north > 0)
	const hasSouth = (compass.south && compass.south > 0)
	const hasEast = (compass.east && compass.east > 0)
	const hasWest = (compass.west && compass.west > 0)
	if ((hasNorth && hasSouth)
		|| (!hasNorth && !hasSouth)
		|| (hasEast && hasWest)
		|| (!hasEast && !hasWest)
	) return false
	return true
}

export const validateCoord = (coord: bigint): boolean => {
	return validateCompass(coordToCompass(coord))
}

export const validateSlug = (slug: string | null): boolean => {
	return validateCompass(slugToCompass(slug))
}

export const compassEquals = (a: Compass | null, b: Compass | null): boolean => {
	if (!a || !b) return false
	if (!validateCompass(a) || !validateCompass(b)) return false
	if (a.north && a.north > 0 && a.north !== b.north) return false
	if (a.east && a.east > 0 && a.east !== b.east) return false
	if (a.west && a.west > 0 && a.west !== b.west) return false
	if (a.south && a.south > 0 && a.south !== b.south) return false
	return true
}

export const coordToCompass = (coord: bigint): Compass | null => {
	if (coord == 0n) return null
	const result = {
		north: Number((coord >> 192n) & Mask.Dir),
		east: Number((coord >> 128n) & Mask.Dir),
		west: Number((coord >> 64n) & Mask.Dir),
		south: Number(coord & Mask.Dir),
	} as Compass
	return validateCompass(result) ? result : null
}

export const compassToCoord = (compass: Compass | null): bigint => {
	let result = 0n
	if (compass) {
		if (compass.north && compass.north > 0) result += BigInt(compass.north) << 192n
		if (compass.east && compass.east > 0) result += BigInt(compass.east) << 128n
		if (compass.west && compass.west > 0) result += BigInt(compass.west) << 64n
		if (compass.south && compass.south > 0) result += BigInt(compass.south)
	}
	return result
}

const defaultSlugSeparator = ','
export type SlugSeparator = null | ','
export const compassToSlug = (compass: Compass | null, separator: SlugSeparator = defaultSlugSeparator): string | null => {
	if (!compass || !validateCompass(compass)) return null
	let result = ''
	if (compass.north && compass.north > 0) result += `N${compass.north}`
	if (compass.south && compass.south > 0) result += `S${compass.south}`
	if (separator) result += separator
	if (compass.east && compass.east > 0) result += `E${compass.east}`
	if (compass.west && compass.west > 0) result += `W${compass.west}`
	return result
}

export const slugToCompass = (slug: string | null): Compass | null => {
	if (!slug) return null
	if (!/^[NnSs]\d+[,?][EeWw]\d+$/g.exec(slug)) return null
	const north = /[Nn]\d+/g.exec(slug)
	const east = /[Ee]\d+/g.exec(slug)
	const west = /[Ww]\d+/g.exec(slug)
	const south = /[Ss]\d+/g.exec(slug)
	let result: any = {}
	if (north) result.north = parseInt(north[0].substring(1))
	if (east) result.east = parseInt(east[0].substring(1))
	if (west) result.west = parseInt(west[0].substring(1))
	if (south) result.south = parseInt(south[0].substring(1))
	// console.log(`slugToCompass(${slug}):`, result)
	return validateCompass(result) ? result : null
}

export const coordToSlug = (coord: bigint): string | null => {
	return compassToSlug(coordToCompass(coord))
}

export const slugToCoord = (slug: string | null): bigint => {
	return compassToCoord(slugToCompass(slug))
}



//-----------------------------------
// Bitmap
//

type uint4 = number
type uint8 = number

type BitmapPos = uint8
type BitmapXY = {
	x: uint4
	y: uint4
}

export const bitmapPosToXY = (pos: BitmapPos): BitmapXY => {
	return {
		x: (pos / 16),
		y: (pos % 16),
	}
}

export const bitmapXYToPos = (xy: BitmapXY): BitmapPos => {
	return (xy.y * 16 + xy.x)
}

export const flipDoorPositionXY = (xy: BitmapXY) => {
	if (xy.x === 0) return { x: 15, y: xy.y }
	if (xy.x == 15) return { x: 0, y: xy.y }
	if (xy.y === 0) return { x: xy.x, y: 15 }
	if (xy.y == 15) return { x: xy.x, y: 0 }
	console.warn(`flipDoorPositionXY() not a door:`, xy)
	return xy
}

export const flipDoorPosition = (pos: BitmapPos) => {
	return flipDoorPositionXY(bitmapPosToXY(pos))
}



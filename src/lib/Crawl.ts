
//------------------------------
// Constsnts
//
export enum Tiles {
  Tile_Void = 0x00,
  Tile_Entry = 0x01,
  Tile_Exit = 0x02,
  Tile_LockedExit = 0x03,
  Tile_Gem = 0x04,
  Tile_HatchClosed = 0x05,
  Tile_HatchDown = 0x06,
  Tile_HatchUp = 0x07,
  Tile_Empty = 0xfe,
  Tile_Path = 0xff,
}

export const Terrain = {
  Empty: 0,
  Earth: 1,
  Water: 2,
  Air: 3,
  Fire: 4,
}
export const TerrainNames = {
  [Terrain.Empty]: '',
  [Terrain.Earth]: 'Earth',
  [Terrain.Water]: 'Water',
  [Terrain.Air]: 'Air',
  [Terrain.Fire]: 'Fire',
}

export const Gem = {
  Silver: 0,
  Gold: 1,
  Sapphire: 2,
  Emerald: 3,
  Ruby: 4,
  Diamond: 5,
  Ethernite: 6,
  Kao: 7,
  Coin: 8, // not a gem!
  // gem count
  Count: 8,
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

export const Dir = {
  North: 0,
  East: 1,
  West: 2,
  South: 3,
}
export const DirNames = {
  [Dir.North]: 'North',
  [Dir.East]: 'East',
  [Dir.West]: 'West',
  [Dir.South]: 'South',
}


const uint64_max = BigInt('18446744073709551615') //new BN('0xffffffffffffffff', 16)
export const mask_Dir = uint64_max
export const mask_North = (mask_Dir << 192n)
export const mask_East = (mask_Dir << 128n)
export const mask_West = (mask_Dir << 64n)
export const mask_South = mask_Dir

// export type Absent = 0 | null | undefined
// export interface CompassNE {
//   north: number
//   east: number
//   west: Absent
//   south: Absent
// }
// export interface CompassNW {
//   north: number
//   east: Absent
//   west: number
//   south: Absent
// }
// export interface CompassSE {
//   north: Absent
//   east: number
//   west: Absent
//   south: number
// }
// export interface CompassSW {
//   north: Absent
//   east: Absent
//   west: number
//   south: number
// }
// export type CompassShort = CompassNE | CompassNW | CompassSE | CompassSW

export interface Compass {
  north: number
  east: number
  west: number
  south: number
}

export const validateCompass = (compass: Compass): boolean => {
	const hasNorth = (compass.north > 0)
	const hasSouth = (compass.south > 0)
	const hasEast = (compass.east > 0)
	const hasWest = (compass.west > 0)
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

export const validateSlug = (slug: string): boolean => {
	return validateCompass(slugToCompass(slug) ?? {} as Compass)
}

export const coordToCompass = (coord: bigint): Compass => {
  return {
    north: Number((coord >> 192n) & mask_Dir),
    east: Number((coord >> 128n) & mask_Dir),
    west: Number((coord >> 64n) & mask_Dir),
    south: Number(coord & mask_Dir),
  }
}

export const compassToCoord = (compass: Compass | null): bigint => {
  let result = 0n
	if(compass && compass.north > 0) result += BigInt(compass.north) << 192n
	if(compass && compass.east > 0) result += BigInt(compass.east) << 128n
	if(compass && compass.west > 0) result += BigInt(compass.west) << 64n
	if(compass && compass.south > 0) result += BigInt(compass.south)
	return result
}

const slugSeparator = ','
export const compassToSlug = (compass: Compass, separator = slugSeparator): string => {
  let result = ''
	if (validateCompass(compass)) {
		if (compass.north > 0) result += `N${compass.north}`
		if (compass.south > 0) result += `S${compass.south}`
		if (separator) result += separator
		if (compass.east > 0) result += `E${compass.east}`
		if (compass.west > 0) result += `W${compass.west}`
	}
  return result
}

export const slugToCompass = (slug: string): Compass | null => {
	const north = /[Nn]\d+/g.exec(slug)
	const east = /[Ee]\d+/g.exec(slug)
	const west = /[Ww]\d+/g.exec(slug)
	const south = /[Ss]\d+/g.exec(slug)
	const result = {
		north: north ? parseInt(north[0].substring(1) ?? 0) : undefined,
		east: east ? parseInt(east[0].substring(1) ?? 0) : undefined,
		west: west ? parseInt(west[0].substring(1) ?? 0) : undefined,
		south: south ? parseInt(south[0].substring(1) ?? 0) : undefined,
	} as Compass
	// console.log(`slugToCompass(${slug}):`, result)
	return validateCompass(result) ? result : null
}

export const coordToSlug = (coord: bigint): string => {
  return compassToSlug(coordToCompass(coord))
}

export const slugToCoord = (slug: string): bigint => {
  return compassToCoord(slugToCompass(slug))
}

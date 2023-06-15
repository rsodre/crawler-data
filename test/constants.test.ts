import 'jest-expect-message'
import {
	Mask,
	Dir,
	CompassMax,
	flipDir,
	getOppositeTerrain,
	Terrain
} from '../src/lib/Crawl'


const _max = 18446744073709551615n

describe('* constants', () => {

	it('CompassMax', () => {
		expect(CompassMax).toBe(_max)
		// expect(Number(CompassMax >> 1n)).toBe(Number.MAX_SAFE_INTEGER)
	})

	it('Mask', () => {
		expect(Mask.Dir).toBe(_max)
		expect(Mask.Dir).toBe(BigInt('0xffffffffffffffff'))
		expect(Mask.North).toBe(_max << 192n)
		expect(Mask.East).toBe(_max << 128n)
		expect(Mask.West).toBe(_max << 64n)
		expect(Mask.South).toBe(_max)
	})

	it('Dir', () => {
		expect(flipDir(Dir.North)).toBe(Dir.South)
		expect(flipDir(Dir.South)).toBe(Dir.North)
		expect(flipDir(Dir.East)).toBe(Dir.West)
		expect(flipDir(Dir.West)).toBe(Dir.East)
	})

	it('Terrain', () => {
		expect(getOppositeTerrain(Terrain.Empty)).toBe(Terrain.Empty)
		expect(getOppositeTerrain(Terrain.Earth)).toBe(Terrain.Air)
		expect(getOppositeTerrain(Terrain.Air)).toBe(Terrain.Earth)
		expect(getOppositeTerrain(Terrain.Water)).toBe(Terrain.Fire)
		expect(getOppositeTerrain(Terrain.Fire)).toBe(Terrain.Water)
	})

})

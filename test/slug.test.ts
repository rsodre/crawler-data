import 'jest-expect-message'
import {
	Compass,
	slugToCompass,
	slugToCoord,
	validateCompass,
	compassEquals,
	compassToCoord,
	CompassMax,
} from '../src/lib/Crawl'

type TestPair = { slug: string | null, compass: Compass | null }

const _max = CompassMax.toString()
const _maxn = Number(CompassMax)
const _slugs: TestPair[] = [
	// invalids
	{ slug: null, compass: null },
	{ slug: '', compass: null },
	{ slug: 'N0,E0', compass: null },
	{ slug: 'N0,W0', compass: null },
	{ slug: 'S0,E0', compass: null },
	{ slug: 'S0,W0', compass: null },
	{ slug: 'N0,E1', compass: null },
	{ slug: 'N0,W1', compass: null },
	{ slug: 'S0,E1', compass: null },
	{ slug: 'S0,W1', compass: null },
	{ slug: 'N1,E0', compass: null },
	{ slug: 'N1,W0', compass: null },
	{ slug: 'S1,E0', compass: null },
	{ slug: 'S1,W0', compass: null },
	{ slug: 'N1,S1,E1,W1', compass: null },
	{ slug: 'N1,S1,E1', compass: null },
	{ slug: 'N1,S1,W1', compass: null },
	{ slug: 'N1,E1,W1', compass: null },
	{ slug: 'S1,E1,W1', compass: null },
	{ slug: 'N1,E1 ', compass: null },
	{ slug: ' N1,E1', compass: null },
	{ slug: ' N1,E1 ', compass: null },
	{ slug: 'NN1,E1', compass: null },
	{ slug: 'N1,EE1', compass: null },
	{ slug: 'ASDN1,E1', compass: null },
	{ slug: 'N1,E1E', compass: null },
	// valids
	{ slug: 'N1,E1', compass: { north: 1, east: 1 } },
	{ slug: 'N1,W1', compass: { north: 1, west: 1 } },
	{ slug: 'S1,E1', compass: { south: 1, east: 1 } },
	{ slug: 'S1,W1', compass: { south: 1, west: 1 } },
	{ slug: 'N2,E3', compass: { north: 2, east: 3 } },
	{ slug: 'N4,W5', compass: { north: 4, west: 5 } },
	{ slug: 'S6,E7', compass: { south: 6, east: 7 } },
	{ slug: 'S8,W9', compass: { south: 8, west: 9 } },
	{ slug: 'N111,E218', compass: { north: 111, east: 218 } },
	{ slug: 'N9999,W1', compass: { north: 9999, west: 1 } },
	{ slug: 'S1,E238422', compass: { south: 1, east: 238422 } },
	{ slug: 'S73236032230,W7723692223', compass: { south: 73236032230, west: 7723692223 } },
	// max
	{ slug: `N${_max},E${_max}`, compass: { north: _maxn, east: _maxn } },
	{ slug: `N${_max},W${_max}`, compass: { north: _maxn, west: _maxn } },
	{ slug: `S${_max},E${_max}`, compass: { south: _maxn, east: _maxn } },
	{ slug: `S${_max},W${_max}`, compass: { south: _maxn, west: _maxn } },
	// zero padding is ok
	{ slug: 'N01,E01', compass: { north: 1, east: 1 } },
	{ slug: 'N01,W01', compass: { north: 1, west: 1 } },
	{ slug: 'S01,E01', compass: { south: 1, east: 1 } },
	{ slug: 'S01,W01', compass: { south: 1, west: 1 } },
]

describe('* slug', () => {
	it('slugToCompass()', () => {
		_slugs.forEach((pair) => {
			const slug = pair.slug
			const compass = pair.compass
			if (compass == null) {
				// Invalid slugs
				expect(validateCompass(compass)).toBe(false)
				expect(slugToCompass(slug), `Slug [${slug}] should be invalid`).toBe(null)
				expect(slugToCoord(slug), `Slug [${slug}] should be invalid`).toBe(0n)

			} else {
				// Valid slugs
				expect(validateCompass(compass)).toBe(true)
				
				const _compass = slugToCompass(slug)
				expect(_compass, `Slug [${slug}] fail`).not.toBe(null)
				expect(compassEquals(compass, _compass), `Slug [${slug}] compass [${JSON.stringify(_compass)}] is not [${JSON.stringify(compass)}]`).toBe(true)

				const _coord = slugToCoord(slug)
				expect(_coord, `Slug [${slug}] fail`).not.toBe(0n)
				expect(_coord, `Slug [${slug}] fail`).toBe(compassToCoord(compass))

				// TODO: remove separator

				// TODO: other valid separators

				// TODO: invalid separators

			}

		})
	})
})

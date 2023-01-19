// import { NounsTokenFactory } from '@nouns/contracts';

export enum ChainId {
  Mainnet = 1,
  // Ropsten = 3,
  // Rinkeby = 4,
	Goerli = 5,
  Local = 31337,
}

export interface ContractAddresses {
	crawlerToken: string;
	cardsMinter: string;
}


// interface CatInfo {
// 	age: number;
// 	breed: string;
// }
// type CatName = "miffy" | "boris" | "mordred";
// const cats: Record<CatName, CatInfo> = {
// 	miffy: { age: 10, breed: "Persian" },
// 	boris: { age: 5, breed: "Maine Coon" },
// 	mordred: { age: 16, breed: "British Shorthair" },
// };

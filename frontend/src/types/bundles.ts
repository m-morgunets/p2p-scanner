export interface IBundles {
	id: number;
	datetime: Date;
	exchange_buy: string;
	asset_buy: string;
	payTypes_buy: string;
	price_buy: number;
	exchange_sell: string;
	asset_sell: string;
	payTypes_sell: string;
	price_sell: number;
	liquidity: number;
}

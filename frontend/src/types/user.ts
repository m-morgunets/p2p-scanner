export interface IUser {
	id: number;
	dateRegistration: Date;
	name: string;
	email: string;
	access: boolean;
	subscription: "standart" | "pro" | "business" | null;
	lastPayDate: Date | null;
	nextPayDate: Date | null;
	isActivatedEmail: boolean;
}


export interface IRespUser {
	accessToken: string;
	refreshToken: string;
	user: IUser;
}
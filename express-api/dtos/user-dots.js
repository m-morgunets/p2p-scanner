module.exports = class UserDto {
	id;
	dateRegistration;
	name;
	email;
	isActivatedEmail;
	access;
	subscription;
	lastPayDate;
	nextPayDate;

	constructor(model) {
		this.id = model.id;
		this.dateRegistration = model.dateRegistration;
		this.name = model.name;
		this.email = model.email;
		this.isActivatedEmail = model.isActivatedEmail;
		this.access = model.access;
		this.subscription = model.subscription;
		this.lastPayDate = model.lastPayDate;
		this.nextPayDate = model.nextPayDate;
	}
};

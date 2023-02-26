import React from "react";
import { useAppSelector } from "../../hooks/useAppSelector";
import Subscription from "./Subscription/Subscription";
import styles from "./Profile.module.scss";
import User from "./User/User";
import Safety from "./Safety/Safety";
import PaySub from "./PaySub/PaySub";
import Partner from "./Partner/Partner";

const Profile = () => {
	const { access } = useAppSelector((store) => store.user);

	return (
		<div className={styles.profile}>
			<div className={styles.profile_inner}>
				<div className={styles.profile_box}>
					{!access && <PaySub />}
					<div className={styles.profile_info}>
						<Subscription />
						<Partner />
						<Safety />
					</div>
				</div>
				<div className={styles.profile_box}>
					<User />
				</div>
			</div>
		</div>
	);
};

export default Profile;

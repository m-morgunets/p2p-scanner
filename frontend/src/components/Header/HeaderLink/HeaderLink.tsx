import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./../Header.module.scss";

const HeaderLink = ({ title, link }: { title: string; link: string }) => {
	return (
		<NavLink
			className={({ isActive }) =>
				isActive ? `${styles.header_link} ${styles.active}` : styles.header_link
			}
			to={link}
		>
			<p>{title}</p>
		</NavLink>
	);
};

export default HeaderLink;

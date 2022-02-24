import { FC } from 'react';
import { Link } from 'react-router-dom'; 
import { Path } from '../../../../../constants/enums/path.enum';

import {  LayoutProps } from '../../../routes/routes';
import styles from './styles.module.css';

interface CustomLinkProps {
	to?: Path,
	layoutProps? : LayoutProps
}

const CustomLink: FC<CustomLinkProps> = ({to, layoutProps}) => {
	return <Link to={to} className={styles.link}>
		{layoutProps?.icon}
		{layoutProps?.name}
	</Link>;
};

export default CustomLink;

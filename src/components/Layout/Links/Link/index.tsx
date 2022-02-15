import { FC } from 'react';
import { Route } from '../../../../routes/routes';
import styles from './styles.module.css';

interface Props {
	route: Route;
}

const Link: FC<Props> = ({ route }) => {
	return <div className={styles.link}>{route.layoutProps.name}</div>;
};

export default Link;

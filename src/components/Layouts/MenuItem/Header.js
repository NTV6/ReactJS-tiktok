import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';

import styles from './MenuItem.module.scss'
import Button from '../Button';

const cx = classNames.bind(styles)

function Header({ title, onBack }) {
    return (
        <div className={cx('header')}>
            <Button onClick={onBack} leftIcon={<FontAwesomeIcon icon={faChevronLeft}/>}></Button>
            <span>{title}</span>
        </div>
    );
}

export default Header;

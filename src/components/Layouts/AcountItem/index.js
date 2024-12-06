import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './AcountItem.module.scss'

const cx = classNames.bind(styles)

function AccountItem({ data }) {
    return (
        <Link to={`/@${data.nickname}`} className={cx('wrapper')}>
            <img src={data.avatar} alt='avatar' onError={e => {
                e.target.onerror = null
                e.target.src = 'https://phunuvietnam.mediacdn.vn/media/news/33abffcedac43a654ac7f501856bf700/anh-profile-tiet-lo-g-ve-ban-1.jpg'
            }} />
            <div className={cx('info')}>
                <div className={cx('body-name')}>
                    <h4 className={cx('user-name')}>{data.nickname}</h4>
                    <div className={cx('icon-check')}>{data.tick && <FontAwesomeIcon icon={faCircleCheck} />}</div>
                </div>
                <div className={cx('name')}>{data.full_name}</div>
            </div>
        </Link>
    );
}

export default AccountItem;
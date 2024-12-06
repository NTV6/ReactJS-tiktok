import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';

import styles from './MenuItem.module.scss'
import Popper from '../Popper'
import Button from '../Button';
import Header from './Header';
import { useState } from 'react';

const cx = classNames.bind(styles)

function MenuItem({ children, items = [], onChange = () => { } }) {

    const [levelMenu, setLevelMenu] = useState([{ data: items }])
    const current = levelMenu[levelMenu.length - 1]

    const menuItem = current.data.map((item, index) => {
        const classes = cx('menu-item', { separate: item.separate })

        return (
            <Button key={index} className={classes} leftIcon={item.icon} to={item.to} onClick={() => {

                const checkChildren = !!item.children

                if (checkChildren) {
                    setLevelMenu(prev => [...prev, item.children])
                } else {
                    onChange(item)
                }

            }}>{item.title}</Button>
        )
    })
    return (
        < Tippy
            delay={[0, 500]}
            interactive
            placement='bottom-end'
            render={attrs => (
                <div className={cx('menu-items')} tabIndex='-1'{...attrs}>
                    <Popper className={cx('menu-popper')}>
                        {levelMenu.length > 1 && <Header title='Language' onBack={() => setLevelMenu(prev => prev.slice(0, prev.length - 1))} />}
                        {menuItem}
                    </Popper>
                </div>
            )}

            onHide={() => setLevelMenu(prev => prev.slice(0, 1))}
        >
            {children}
        </ Tippy>
    );
}

export default MenuItem;

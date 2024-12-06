import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import styles from './Button.module.scss'

const cx = classNames.bind(styles)

function Button({
    //class mac dinh
    to, href, children, onClick,

    //class button
    btnLoginHeader, btnFollow, btnUpload, btnGetApp,

    //class style button
    small,
    large,
    disabled,
    leftIcon,
    rightIcon,

    //className
    className,

    //class mac dinh
    ...otherProps
}) {
    let Component = 'button'
    const props = {
        onClick,
        ...otherProps
    }

    if (to) {
        props.to = to
        Component = Link
    } else
        if (href) {
            props.href = href
            Component = 'a'
        }

    //Remove event listener when btn is disabled
    if (disabled) {
        Object.keys(props).forEach((key) => {
            if (key.startsWith('on') && typeof props[key] === 'function') {
                delete props[key]
            }
        })
    }

    const classes = cx('wrapper', {
        //class button
        btnLoginHeader,
        btnFollow,
        btnUpload,
        btnGetApp,

        //class style button
        small,
        large,
        disabled,

        //className
        [className]: className,
    })

    return (
        <Component className={classes} {...props}>
            {leftIcon && <span className={cx("icon")}>{leftIcon}</span>}
            <span className={cx("title")}>{children}</span>
            {rightIcon && <span className={cx("icon")}>{rightIcon}</span>}
        </Component>
    );
}

export default Button;
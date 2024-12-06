import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faSpinner, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';

import styles from './Search.module.scss'
import Popper from '../Popper'
import AccountItem from '../AcountItem';

const cx = classNames.bind(styles)

function Search() {
    const [searchValue, setSearchValue] = useState('')
    const [searchResult, setSearchResult] = useState([])
    const [showSearchResult, setShowSearchResult] = useState(true)
    const [loading, setLoading] = useState(false)
    const inputRef = useRef()

    useEffect(() => {
        if (!searchValue.trim()) {
            return
        }

        setLoading(true)

        fetch(`https://tiktok.fullstack.edu.vn/api/users/search?q=${encodeURIComponent(searchValue)}&type=less`)
            .then(response => response.json())
            .then(json => {
                setSearchResult(json.data)
                setLoading(false)
            })
    }, [searchValue])

    return (
        <Tippy
            interactive
            visible={showSearchResult && searchResult.length > 0}
            render={attrs => (
                <div className={cx('search-result')} tabIndex='-1'{...attrs}>
                    <Popper>
                        <h4 className={cx('search-title')}>Accounts</h4>
                        {searchResult.map(result =>
                            <AccountItem key={result.id} data={result} />
                        )}
                    </Popper>
                </div>
            )}
            onClickOutside={() => setShowSearchResult(false)}
            
        >
            <div className={cx('search')}>
                <input onFocus={() => setShowSearchResult(true)} ref={inputRef} value={searchValue} className={cx('search-input')} placeholder='Search accounts and videos' spellCheck={false} onChange={e => { setSearchValue(e.target.value) }} />

                {!!searchValue && !loading && (
                    <button className={cx('clear-btn')} onClick={() => {
                        setSearchValue('')
                        inputRef.current.focus()
                    }}>
                        <FontAwesomeIcon icon={faCircleXmark} />
                    </button>
                )}

                {loading && <FontAwesomeIcon className={cx('loading-icon')} icon={faSpinner} />}

                <button className={cx('search-btn')}>
                    <FontAwesomeIcon className={cx('icon-search')} icon={faMagnifyingGlass} />
                </button>
            </div>
        </Tippy>
    );
}

export default Search;
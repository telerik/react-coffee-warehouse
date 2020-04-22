
import * as React from 'react';
import * as PropTypes from 'prop-types';

import headerBg from '../assets/header-bg.png';
import userAvatar from '../assets/user-avatar.jpg';

import { DropDownList } from '@progress/kendo-react-dropdowns';
import { Avatar } from '@progress/kendo-react-layout';

import { languages } from './../resources/languages';
import { AppContext } from './../AppContext'

export const Header = (props) => {
    const { onButtonClick, page } = props;

    const {languageId, onLanguageChange} = React.useContext(AppContext);

    const currentLanguage = languages.find(item => item.languageId === languageId);

    return (
        <header className="header" style={{ backgroundImage: `url(${headerBg})` }}>
            <div className="nav-container">
                <div className="menu-button">
                    <span className={'k-icon hamburger-icon'} onClick={onButtonClick}/>
                </div>

                <div className="title">
                    <h1>Coffee Warehouse</h1>
                    <span className="vl"></span>
                    <h2>{page}</h2>
                </div>
                <div className="settings">
                    <span>Language</span>
                    <DropDownList
                        textField={'language'}
                        dataItemKey={'languageId'}
                        data={languages}
                        value={currentLanguage}
                        onChange={onLanguageChange}
                    />
                </div>
                <Avatar type={'image'} shape={'circle'}>
                    <img src={userAvatar} alt="user-avatar"/>
                </Avatar>
            </div>
        </header>
    );
}

Header.displayName = 'Header';
Header.propTypes = {
    page: PropTypes.string,
    onButtonClick: PropTypes.func
};

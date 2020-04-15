
import * as React from 'react';
import headerBg from '../assets/header-bg.png';
import userAvatar from '../assets/user-avatar.jpg';

import { DropDownList } from '@progress/kendo-react-dropdowns';
import { Avatar } from '@progress/kendo-react-layout';

const Header = (props) => {
    const { onButtonClick, page } = props;
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
                    <DropDownList data={[ "Eng", "Bg", "Gb" ]} defaultValue="Eng"/>
                </div>
                <Avatar type={'image'} shape={'circle'}>
                    <img src={userAvatar} alt="user-avatar"/>
                </Avatar>
            </div>
        </header>
    );
}

export default Header;


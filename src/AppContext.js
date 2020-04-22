import React from 'react';

export const AppContext = React.createContext({
    language: 'en',
    firstname: '',
    lastname: '',
    middleName: '',
    email: '',
    phoneNumber: '',
    avatar: null,
    country: null,
    isInPublicDirectory: false,
    biography: '',
    teamId: null,
    onLanguageChange: () => {},
    onProfileChange: () => {}
});

AppContext.displayName = 'AppContext';
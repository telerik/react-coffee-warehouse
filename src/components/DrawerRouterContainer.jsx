
import React from 'react';
import { withRouter } from 'react-router-dom';

import { Drawer, DrawerContent, DrawerNavigation, DrawerItem } from '@progress/kendo-react-layout';
import Header from './Header.jsx';

const items = [
    { text: 'Dashboard', iconSvg: 'dashboard-icon', selected: true , route: '/' },
    { text: 'Planning', iconSvg: 'planning-icon', route: '/planning' },
    { text: 'Profile', iconSvg: 'profile-icon', route: '/profile' },
    { separator: true },
    { text: 'Info', iconSvg: 'info-icon', route: '/info' }
];

const CustomDrawerItem = (props) => {
    const { iconSvg, text, ...others } = props;
    return (
        <DrawerItem {...others}>
            <span className={'k-icon ' + iconSvg} />
            <span className="k-item-text">{text}</span>
        </DrawerItem>
    );
};

class DrawerRouterContainer extends React.Component {
    state = {
        expanded: true,
        selectedId: items.findIndex(x => x.selected === true),
        isSmallerScreen: window.innerWidth < 768
    }

    componentDidMount() {
        window.addEventListener('resize', this.resizeWindow)
        this.resizeWindow()
    }
  
    componentWillUnmount() {
        window.removeEventListener('resize', this.resizeWindow)
    }
  
    resizeWindow = () => {
        this.setState({ isSmallerScreen: window.innerWidth < 768 })
    }

    handleClick = () => {
        this.setState((e) => ({expanded: !e.expanded}));
    }


    handleSelect = (e) => {
        this.setState({selectedId: e.itemIndex, expanded: false});
        this.props.history.push(e.itemTarget.props.route);
    }

    setSelectedItem = (pathName) => {
        let currentPath = items.find(item => item.route === pathName);
        if (currentPath.text) {
            return currentPath.text;
        }
    }
    render() {
        let selected = this.setSelectedItem(this.props.location.pathname);
        return (
             <React.Fragment>
                <Header onButtonClick={this.handleClick} page={selected}/>

                <Drawer
                    expanded={this.state.expanded}
                    items={items.map(
                        (item) => ({ ...item, selected: item.text === selected }))}
                    item={CustomDrawerItem}
                    position='start'
                    mode={this.state.isSmallerScreen ? 'overlay' : 'push'}
                    mini={this.state.isSmallerScreen ? false : true}
                    
                    onOverlayClick={this.handleClick}
                    onSelect={this.handleSelect}
                >
                    <DrawerContent>
                        {this.props.children}
                    </DrawerContent>
                </Drawer>
        </React.Fragment>
        );
    }
};

export default withRouter(DrawerRouterContainer);


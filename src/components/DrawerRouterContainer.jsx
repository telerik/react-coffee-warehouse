
import React from 'react';
import { withRouter } from 'react-router-dom';

import { Drawer, DrawerContent, DrawerItem } from '@progress/kendo-react-layout';
import Header from './Header.jsx';

const items = [
    { text: 'Dashboard', iconSvg: 'dashboard-icon', selected: true , route: '/' },
    { text: 'Planning', iconSvg: 'planning-icon', route: '/planning' },
    { text: 'Profile', iconSvg: 'profile-icon', route: '/profile' },
    { separator: true },
    { text: 'Info', iconSvg: 'info-icon', route: '/info' }
];

const CustomDrawerItem = (props) => {
    return (
        <DrawerItem {...props}>
            <span className={'k-icon ' + props.iconSvg} />
            <span className="k-item-text">{props.text}</span>
        </DrawerItem>
    );
};

class DrawerRouterContainer extends React.Component {
    state = {
        expanded: true,
        selectedId: items.findIndex(x => x.selected === true),
    }
    
    handleClick = () => {
        this.setState((e) => ({expanded: !e.expanded}));
    }

    onSelect = (e) => {
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
                    mode='push'
                    mini={true}

                    onSelect={this.onSelect}
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


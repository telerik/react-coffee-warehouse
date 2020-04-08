
import React from 'react';
import { withRouter } from 'react-router-dom';

import { Drawer, DrawerContent } from '@progress/kendo-react-layout';
import { Button } from '@progress/kendo-react-buttons';

const items = [
    { text: 'Dashboard', icon: 'k-i-inbox', selected: true , route: '/' },
    { text: 'Planning', icon: 'k-i-bell', route: '/planning' },
    { text: 'Profile', icon: 'k-i-calendar', route: '/profile' },
    { separator: true },
    { text: 'Info', icon: 'k-i-hyperlink-email', route: '/info' }
];

class DrawerRouterContainer extends React.Component {
    state = {
        expanded: true,
        selectedId: items.findIndex(x => x.selected === true)
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
        <div>
            <div className="custom-toolbar">
                <Button icon="menu" look="flat" onClick={this.handleClick}/>
                <span className="mail-box">Coffee Warehouse</span>
            </div>
            <Drawer
                expanded={this.state.expanded}
                items={items.map(
                (item) => ({ ...item, selected: item.text === selected }))}
                position='start'
                mode='push'
                mini={true}

                onSelect={this.onSelect}
            >
                <DrawerContent>
                    {this.props.children}
                </DrawerContent>
            </Drawer>
        </div>
        );
    }
};

export default withRouter(DrawerRouterContainer);


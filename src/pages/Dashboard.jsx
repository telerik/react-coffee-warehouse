
import * as React from 'react';
import * as PropTypes from 'prop-types';

export default class Dashboard extends React.Component {
    static propTypes = {
        children: PropTypes.element
    };

    render() {
        const text = (
            <div id="Dashboard" className="page dashboard-page">
                Dashboard page
            </div>
        );

        return (
            <div>
                {this.props.children ? this.props.children : text}
            </div>
        );
    }
}


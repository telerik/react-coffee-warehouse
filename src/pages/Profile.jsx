
import * as React from 'react';
import * as PropTypes from 'prop-types';

export default class Profile extends React.Component {
    static propTypes = {
        children: PropTypes.element
    };

    render() {
        const text = (
            <div id="Profile" className="page profile-page">
                Profile page
            </div>
        );

        return (
            <div>
                {this.props.children ? this.props.children : text}
            </div>
        );
    }
}


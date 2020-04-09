
import * as React from 'react';
import * as PropTypes from 'prop-types';

export default class Profile extends React.Component {
    static propTypes = {
        children: PropTypes.element
    };

    render() {
        const text = (
            <div id="Profile" className="main-content">
                <div className="card-container">
                    <div className="card-component">FORM HERE:</div>
                </div>
            </div>
        );

        return (
            <div>
                {this.props.children ? this.props.children : text}
            </div>
        );
    }
}


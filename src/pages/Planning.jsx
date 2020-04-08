
import * as React from 'react';
import * as PropTypes from 'prop-types';

export default class Planning extends React.Component {
    static propTypes = {
        children: PropTypes.element
    };

    render() {
        const text = (
            <div id="Planning" className="page planning-page">
                Planning page
            </div>
        );

        return (
            <div>
                {this.props.children ? this.props.children : text}
            </div>
        );
    }
}


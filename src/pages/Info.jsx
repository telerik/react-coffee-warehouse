
import * as React from 'react';
import * as PropTypes from 'prop-types';

export default class Info extends React.Component {
    static propTypes = {
        children: PropTypes.element
    };

    render() {
        const text = (
            <div id="Info" className="page info-page">
                Info page
            </div>
        );

        return (
            <div>
                {this.props.children ? this.props.children : text}
            </div>
        );
    }
}


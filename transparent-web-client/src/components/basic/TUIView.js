import React from 'react';

export default class TUIView extends React.Component {
    render() {
        return (
        <div>
            {this.props.children}
        </div>
        );
    }
}
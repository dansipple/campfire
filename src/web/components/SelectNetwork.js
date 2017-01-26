import React, { Component, PropTypes } from 'react';

import { Modal, Button } from 'react-bootstrap';

import CreateNetworkModal from './CreateNetworkModal';

export default class SelectNetwork extends Component {
    render() {
        const { networks, showCreateNetworkModal } = this.props.appState;
        return (
            <div>
                <div className="network-header">
                    <h2 className="text-center">Select a network</h2>
                </div>
                <div className="container select-network">
                    <ul id="network-list">
                        <li className="row network">
                            <h3>Convos Beta</h3>
                        </li>
                        <li className="row network">
                            <h3>Convos Beta</h3>
                        </li>
                        <li className="row network">
                            <h3>Convos Beta</h3>
                        </li>
                        <li className="row network">
                            <h3>Convos Beta</h3>
                        </li>
                        <li className="row network">
                            <h3>Convos Beta</h3>
                        </li>
                        <li className="row network">
                            <h3>Convos Beta</h3>
                        </li>
                    </ul>
                    <a href="#" className="row create-network">Create New Network</a>
                </div>
                <CreateNetworkModal show={showCreateNetworkModal} />
            </div>
        );
    }
}

SelectNetwork.propTypes = {

};
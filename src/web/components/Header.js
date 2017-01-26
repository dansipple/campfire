import React, { Component } from 'react';

export default class Header extends Component {
    render() {
        return (
            <div className="header container">
                <div className="row">
                    <div className="col-xs-6">
                        <img src="/img/logo.png"/>
                    </div>
                    <div className="col-xs-6 text-right">
                        <a href="#">Sign out</a>
                    </div>
                </div>
            </div>
        );
    }
}
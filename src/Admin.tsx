import React, { Component } from 'react'
import instance from './api/api';

interface IAdminPageState {
    
}

export class Admin extends Component<{},IAdminPageState> {
    /**
     *
     */
    constructor({}) {
        super({});
        this.state = {}
        
    }

    render() {
        return (
            <div>
                Admin
            </div>
        )
    }
}

export default Admin

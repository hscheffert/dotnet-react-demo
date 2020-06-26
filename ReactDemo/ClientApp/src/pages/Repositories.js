import React, { Component } from 'react';
import { Button, Space, Typography, Spin } from 'antd';

export class Repositories extends Component {
    constructor(props) {
        super(props);
        this.state = {
            repos: [],
            loading: true
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    getDateTimeString = dateString => {
        const dateTime = new Date(dateString);

        return `${dateTime.toLocaleDateString()} at ${dateTime.toLocaleTimeString()}`;
    }

    renderTable() {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Homepage</th>
                        <th>Last Push</th>
                        <th>Watchers</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.repos.map(repo =>
                        <tr key={repo.lastPush}>
                            <td>{repo.name}</td>
                            <td>{repo.homepage ? <a href={repo.homepage}>Link</a> : ''}</td>
                            <td>{this.getDateTimeString(repo.lastPush)}</td>
                            <td>{repo.watchers}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        return (
            <Spin spinning={this.state.loading}>
                <Typography.Title level={1}>Github Repositories</Typography.Title>
                {this.renderTable()}
           </Spin>
        );
    }

    async fetchData() {
        try {
            const response = await fetch('api/repositories');
            const data = await response.json();

            this.setState({
                repos: data,
                loading: false
            });
        } catch (err) {
            this.setState({
                loading: false
            });
            console.error(err);
        }
    }
}

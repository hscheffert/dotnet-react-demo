import React, { Component } from 'react';

export const authEndpoint = 'https://accounts.spotify.com/authorize';
const clientId = 'abc52fe1958c4015a2642c5ed78be886';
const redirectUri = 'http://localhost:5001/spotify';
const scopes = [
    'user-read-private',
    'user-read-email',
];

// Get the hash of the url
const hash = window.location.hash
    .substring(1)
    .split('&')
    .reduce(function (initial, item) {
        if (item) {
            var parts = item.split('=');
            initial[parts[0]] = decodeURIComponent(parts[1]);
        }
        return initial;
    }, {});

window.location.hash = '';

export class Spotify extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: false
        };
    }

    async componentDidMount() {
        // Set token
        const _token = hash.access_token;
        if (_token) {
            // Set token
            this.setState({
                token: _token
            });

            console.log('logged in');
        }
    }

    // login = async () => {
    //     try {
    //         const url = `${authEndpoint}?client_id=${clientId}&scope=${scopes.join('%20')}&response_type=token&show_dialog=true&`;
    //         const result = await fetch(url);

    //         console.log(result);
    //     } catch (err) {
    //         console.error(err);
    //     }       
    // }

    renderTable() {
        return (
            <table className='table table-striped' aria-labelledby='tabelLabel'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Homepage</th>
                        <th>Last Push</th>
                        <th>Watchers</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.data.map(repo =>
                        <tr key={repo.lastPush}>
                            <td>{repo.name}</td>
                            <td>{repo.homepage ? <a href={repo.homepage}>Link</a> : ''}</td>
                            <td>{repo.watchers}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        if (this.state.loading) {
            return <p><em>Loading...</em></p>;
        }

        return (
            <div>
                {/* <h1 id='tabelLabel'>Spotify</h1> */}
                {/* {this.renderTable()} */}
                {!this.state.token && (<a
                    className='btn btn--loginApp-link'
                    href={`${authEndpoint}?response_type=token&show_dialog=true&client_id=${clientId}&scope=${scopes.join('%20')}&redirect_uri=${redirectUri}`}>
                    Login to Spotify
                </a>
                )}
            </div>
        );
    }

    async fetchData() {
        try {
            const response = await fetch('spotify');
            const data = await response.json();

            this.setState({
                data: data,
                loading: false
            });
        }
        catch (err) {
            this.setState({
                loading: false
            });
            console.error(err);
        }
    }
}

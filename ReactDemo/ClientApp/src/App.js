import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { FetchData } from './pages/FetchData';
import { Counter } from './pages/Counter';
import { Repositories } from './pages/Repositories';
import { Spotify } from './pages/Spotify';
import { TodoItems } from './pages/TodoItems';
import './custom.css'
import './App.css';

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Layout>
                <Route exact path='/' component={Home} />
                <Route path='/counter' component={Counter} />
                <Route path='/fetch-data' component={FetchData} />
                <Route path='/repositories' component={Repositories} />
                <Route path='/spotify' component={Spotify} />
                <Route path='/todo-items' component={TodoItems} />
            </Layout>
        );
    }
}

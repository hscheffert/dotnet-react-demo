import React, { Component } from 'react';

export class Movies extends Component {
  //static displayName = Movies.name;

  constructor(props) {
    super(props);
      this.state = {
          movies: [],
          loading: true
      };
  }

  componentDidMount() {
    this.fetchData();
  }

  renderTable() {
    return (
      <table className='table table-striped' aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>Name</th>
            <th>Release Year</th>
          </tr>
        </thead>
        <tbody>
          {this.state.movies.map(movie =>
              <tr key={movie.id}>
                  <td>{movie.title}</td>
                  <td>{movie.releaseYear}</td>
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
            <h1 id="tabelLabel">Movies</h1>
            {this.renderTable()}
      </div>
    );
  }

  async fetchData() {
    const response = await fetch('movies');
    //const response = await fetch('http://example.com/movies.json');
    const data = await response.json();

      console.log(data);

      this.setState({
          movies: data,
          loading: false
      });
  }
}

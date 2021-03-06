import React, { Component } from 'react';

import './App.css';
import Modal from './components/Modal';
import Header from './components/Header';
import Search from './components/Search';
import Articles from './components/Articles';
import Footer from './components/Footer';

const url = 'https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&list=search&srsearch=';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userQuery: '',
      articles: [],
      footer: 'footer'
    }

    this.getUserQuery = this.getUserQuery.bind(this);
    this.fetchQuery = this.fetchQuery.bind(this);
  }

  getUserQuery(e) {
    this.setState({
      userQuery: e.target.value
    });
  }

  fetchQuery() {
    fetch(url + this.state.userQuery)
      .then(response => response.json())
      .then(data => this.setState({
        articles: data.query.search,
        footerClass: 'footer not-fixed'
      }))

      .catch(function(error) {
        console.log('Something went wrong');
      })
  }

  render() {
    return (
      <div className='app'>
        <Modal />
        <Header />
        <Search userQuery={this.getUserQuery} search={this.fetchQuery} />
        <Articles articles={this.state.articles} />
        <Footer footerClass={this.state.footerClass} />
      </div>
    );
  }
}

export default App;

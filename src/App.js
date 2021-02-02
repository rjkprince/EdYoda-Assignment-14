import React, { Component } from 'react';
import classes from './App.module.css';
import Layout from './Components/Layout/Layout';
import axios from 'axios';
import AccountsPage from './Components/Accounts/Accounts';
import DashboardPage from './Components/Dashboard/Dashboard';
import Error404 from './Components/Error404/Error404';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

class App extends Component {
  componentDidMount() {
    if (
      localStorage.getItem('accountsPage') === null ||
      localStorage.getItem('productsPage') === null ||
      localStorage.getItem('dashboardPage') === null
    ) {
      axios
        .get('https://reactmusicplayer-ab9e4.firebaseio.com/project-data.json')
        .then((res) => {
          const data = res.data;
          const { accountsPage, productsPage, dasbhoardPage } = data;
          if (localStorage.getItem('accountsPage') === null) {
            localStorage.setItem('accountsPage', JSON.stringify(accountsPage));
          }
          if (localStorage.getItem('productsPage') === null) {
            localStorage.setItem('productsPage', JSON.stringify(productsPage));
          }
          if (localStorage.getItem('dashboardPage') === null) {
            localStorage.setItem(
              'dashboardPage',
              JSON.stringify(dasbhoardPage)
            );
          }
          window.location.reload();
        })
        .catch((err) => console.log('GET call to API failed. ' + err));
    }
  }
  render() {
    return (
      <BrowserRouter>
        <Layout>
          <div className={classes.App}>
            <Switch>
             
              <Route path='/Accounts' component={AccountsPage} />
              <Route path='/Dashboard' component={DashboardPage} />
              <Route component={Error404} />
            </Switch>
          </div>
        </Layout>
      </BrowserRouter>
    );
  }
}

export default App;

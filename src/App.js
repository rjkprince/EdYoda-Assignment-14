import React, { Component } from 'react';
import classes from './App.module.css';
import Layout from './Components/Layout/Layout';
import axios from 'axios';
export default class App extends Component {
  componentDidMount() {
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
          localStorage.setItem('dashboardPage', JSON.stringify(dasbhoardPage));
        }
      })
      .catch((err) => console.log('GET call to API failed. ' + err));
  }
  render() {
    return (
      <Layout>
        <div className={classes.App}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima amet
          velit, esse tempore similique pariatur dolore! Rerum ipsa ex molestiae
          officiis! Accusamus libero ratione assumenda quia harum, minima,
          impedit, laboriosam veritatis temporibus obcaecati exercitationem
          rerum inventore modi incidunt doloremque quam commodi culpa quasi
          necessitatibus? Culpa, eligendi illo. Fugit dolores quod quos iusto
          dicta non veniam dolorem labore! Excepturi saepe, blanditiis
          architecto iste, ut sunt sit natus dignissimos rerum veritatis
          recusandae minus! Maiores soluta vitae esse dignissimos, dolorem
          laboriosam earum quibusdam incidunt exercitationem delectus veniam
          facere libero animi nihil quaerat illum, corporis repellat corrupti
          similique minus? Maxime, autem recusandae nemo tenetur facere optio
          ipsa adipisci voluptatibus explicabo, nam quis at error modi quaerat
          facilis iusto odit qui dolore sit nobis! Nam molestiae a pariatur non
          perferendis. Ipsum illum vel modi blanditiis.
        </div>
      </Layout>
    );
  }
}

import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';
import Loading from '../../widgets/Loading';
import AppPreview from './AppPreview';

export default class MyApps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      isLoading: false,
      isLoaded: false,
      apps: [],
    };
  }

  componentWillMount() {
    this.setState({ isLoading: true });
    fetch('/api/apps')
      .then(res => res.json())
      .then(apps => {
        this.setState({
          apps,
          isLoading: false,
          isLoaded: true,
        });
      });
  }

  render() {
    const { apps, isLoading, isLoaded } = this.state;
    return (
      <div>
        <h2>Apps</h2>
        {isLoading && <Loading/>}
        {isLoaded &&
          <div>
            {apps.map((app, key) =>
              <AppPreview app={app} key={key} />
            )}
          </div>
        }
      </div>
    );
  }
};

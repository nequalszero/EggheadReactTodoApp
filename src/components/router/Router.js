import React, {Component} from 'react';

const getCurrentPath = () => {
  const path = document.location.pathname;
  return path.substring(path.lastIndexOf('/'));
}

export class Router extends Component {
  state = {
    route: getCurrentPath()
  }

  handleLinkClick = (route) => {
    this.setState({route});
    history.pushState(null, '', route);
  }

  static childContextTypes = {
    route: React.PropTypes.string,
    linkHandler: React.PropTypes.func
  };

  // Provides context for child components to access so you don't need to
  //   pass props down the tree
  getChildContext() {
    return {
      route: this.state.route,
      linkHandler: this.handleLinkClick
    };
  }

  componentDidMount() {
    // Fires any time we use the back/forward buttons in browser.
    window.onpopstate = () => {
      this.setState({route: getCurrentPath()})
    }
  }

  render() {
    return <div>{this.props.children}</div>;
  }
}

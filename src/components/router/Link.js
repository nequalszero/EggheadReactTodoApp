import React, {Component} from 'react';

export class Link extends Component {
  static contextTypes = {
    route: React.PropTypes.string,
    linkHandler: React.PropTypes.func
  };

  handleClick = (e) => {
    e.preventDefault();
    this.context.linkHandler(this.props.to);
  }

  // The context for this.context is coming from the Router.
  render() {
    const activeClass = this.context.route === this.props.to ? 'active' : '';
    return <a href='#'
      className={activeClass}
      onClick={this.handleClick}>{this.props.children}
    </a>;
  }
}

Link.propTypes = {
  to: React.PropTypes.string.isRequired
};

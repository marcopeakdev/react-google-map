"use strict";

var React = require("react/addons"),
    {PropTypes} = React,
    {update} = React.addons,
    cx = React.addons.classSet,

    actionPropType = PropTypes.shape({
        key: PropTypes.string.isRequired,
        displayName: PropTypes.string.isRequired,
        path: PropTypes.string.isRequired,
      });

function noop () {}

module.exports = React.createClass({
  displayName: "NavHeaderBar",

  mixins: [require("./ReactFutureMixin")],

  propTypes: {
    activeActionKey: PropTypes.string.isRequired,
    onNavigateTo: PropTypes.func,
    actions: PropTypes.arrayOf(actionPropType).isRequired,
    dropdownActions: PropTypes.arrayOf(
        PropTypes.oneOfType([actionPropType, PropTypes.bool])
      ),
  },

  getInitialState () {
    return {
      dropdownOpen: false,
    };
  },

  getDefaultProps () {
    return {
      onNavigateTo: noop,
      dropdownActions: [],
    };
  },

  _handle_click () {
    this.setState({dropdownOpen: !this.state.dropdownOpen});
  },

  _handle_navigate (action, event) {
    event.preventDefault();
    event.stopPropagation();
    this.props.onNavigateTo(action);
  },

  _render (props, state) {
    var {activeActionKey} = props,
        dropdownClassSet = {dropdown: true};
    dropdownClassSet.open = state.dropdownOpen;

    return <nav className="navbar navbar-default" role="navigation">
      <div className="container-fluid">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <a className="navbar-brand" href="#">React Google Maps</a>
        </div>

        <div className="collapse navbar-collapse">
          <ul className="nav navbar-nav">
            <li><a href="https://github.com/tomchentw" target="_blank">by @tomchentw</a></li>
            {props.actions.map(actionToMenuItem, this)}
            <li className={cx(dropdownClassSet)}>
              <a href="#" className="dropdown-toggle" onClick={this._handle_click}>Samples <span className="caret"></span></a>
              <ul className="dropdown-menu" role="menu">
                {props.dropdownActions.map(actionToMenuItem, this)}
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>;

    function actionToMenuItem (action) {
      var classSet = {};
      if (false === action) {
        return <li className="divider"></li>;
      } else {
        classSet.active = activeActionKey === action.key;

        return <li key={action.key} className={cx(classSet)} onClick={this._handle_navigate.bind(this, action)}>
          <a href={action.path}>{action.displayName}</a>
        </li>;
      }
    }
  }
});

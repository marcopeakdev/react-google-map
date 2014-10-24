/** @jsx React.DOM */
"use strict";
var React = require("react/addons");

var ChildMixin = require("./mixins/ChildMixin");


module.exports = React.createClass({
  displayName: "Marker",

  mixins: [ChildMixin],

  getInitialState () {
    return {
      marker: null
    };
  },

  contextTypes: {
    getMap: React.PropTypes.func,
    getApi: React.PropTypes.func,
    hasMap: React.PropTypes.func,
  },

  componentDidMount () {
    this._init_marker(this.context);
  },

  componentDidUpdate () {
    this._init_marker(this.context);
  },

  render () {
    return this._render(this.props, this.state);
  },

  _init_marker (context) {
    if (this.state.marker || !context.hasMap() || !context.getApi()) {
      return;
    }
    var {Marker} = context.getApi();
    var marker = new Marker(this.props);
    marker.setMap(context.getMap());

    this.setState({ marker });
  },

  _render (props, state) {
    return null;
  }
});

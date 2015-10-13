import {
  default as React,
  Component,
} from "react";

import {
  canUseDOM,
} from "fbjs/lib/ExecutionEnvironment";

import {
  default as InfoBoxCreator,
  infoBoxDefaultPropTypes,
  infoBoxControlledPropTypes,
  infoBoxEventPropTypes,
} from "./addonsCreators/InfoBoxCreator";

/*
 * Original author: @wuct
 * Original PR: https://github.com/tomchentw/react-google-maps/pull/54
 */
export default class InfoBox extends Component {
  static propTypes = {
    // Uncontrolled default[props] - used only in componentDidMount
    ...infoBoxDefaultPropTypes,
    // Controlled [props] - used in componentDidMount/componentDidUpdate
    ...infoBoxControlledPropTypes,
    // Event [onEventName]
    ...infoBoxEventPropTypes,
  }

  // Public APIs
  //
  // http://google-maps-utility-library-v3.googlecode.com/svn/trunk/infobox/docs/reference.html
  getContent () { /* TODO: children */ }

  getPosition () { return this.state.infoBox.getPosition(); }

  getVisible () { return this.state.infoBox.getVisible(); }

  getZIndex () { return this.state.infoBox.getZIndex(); }
  // END - Public APIs
  //
  // http://google-maps-utility-library-v3.googlecode.com/svn/trunk/infobox/docs/reference.html

  state = {
  }

  componentWillMount () {
    if (!canUseDOM) {
      return;
    }
    const {mapHolderRef, ...infoBoxProps} = this.props;
    const infoBox = InfoBoxCreator._createInfoBox(mapHolderRef, infoBoxProps);

    this.setState({ infoBox });
  }

  render () {
    if (this.state.infoBox) {
      return (
        <InfoBoxCreator infoBox={this.state.infoBox} {...this.props}>
          {this.props.children}
        </InfoBoxCreator>
      );
    } else {
      return (<noscript />);
    }
  }
}

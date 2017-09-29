/* global google */
import React from "react"
import ReactDOM from "react-dom"
import PropTypes from "prop-types"

import {
  construct,
  componentDidMount,
  componentDidUpdate,
  componentWillUnmount,
} from "../../utils/MapChildHelper"

import { SEARCH_BOX } from "../../constants"

/**
 * @url https://developers.google.com/maps/documentation/javascript/3.exp/reference#SearchBox
 */
class SearchBox extends React.PureComponent {
  static displayName = "StandaloneSearchBox"

  static propTypes = {
    /**
     * @type LatLngBounds|LatLngBoundsLiteral
     */
    defaultBounds: PropTypes.any,

    /**
     * @type LatLngBounds|LatLngBoundsLiteral
     */
    bounds: PropTypes.any,

    /**
     * function
     */
    onPlacesChanged: PropTypes.func,
  }

  state = {
    [SEARCH_BOX]: null,
  }

  componentDidMount() {
    const element = ReactDOM.findDOMNode(this)
    /*
     * @url https://developers.google.com/maps/documentation/javascript/3.exp/reference#SearchBox
     */
    const searchBox = new google.maps.places.SearchBox(element)
    construct(SearchBox.propTypes, updaterMap, this.props, searchBox)

    componentDidMount(this, searchBox, eventMap)
    this.setState({
      [SEARCH_BOX]: searchBox,
    })
  }

  componentDidUpdate(prevProps) {
    componentDidUpdate(
      this,
      this.state[SEARCH_BOX],
      eventMap,
      updaterMap,
      prevProps
    )
  }

  componentWillUnmount() {
    componentWillUnmount(this)
  }

  render() {
    return React.Children.only(this.props.children)
  }

  /**
   * Returns the bounds to which query predictions are biased.
   * @type LatLngBounds
   * @public 
   */
  getBounds() {
    return this.state[SEARCH_BOX].getBounds()
  }

  /**
   * Returns the query selected by the user, or null if no places have been found yet, to be used with places_changed event.
   * @type Array<PlaceResult>nullplaces_changed
   * @public 
   */
  getPlaces() {
    return this.state[SEARCH_BOX].getPlaces()
  }
}

export const StandaloneSearchBox = SearchBox

export default StandaloneSearchBox

const eventMap = {
  onPlacesChanged: "places_changed",
}

const updaterMap = {
  bounds(instance, bounds) {
    instance.setBounds(bounds)
  },
}

import {
  default as React,
  PropTypes,
  Component,
} from "react";

import { default as HeatmapLayerEventList } from "../eventLists/HeatmapLayerEventList";
import { default as eventHandlerCreator } from "../utils/eventHandlerCreator";
import { default as defaultPropsCreator } from "../utils/defaultPropsCreator";
import { default as composeOptions } from "../utils/composeOptions";
import { default as componentLifecycleDecorator } from "../utils/componentLifecycleDecorator";

import { default as GoogleMapHolder } from "./GoogleMapHolder";

export const heatmapLayerControlledPropTypes = {
// NOTICE!!!!!!
//
// Only expose those with getters & setters in the table as controlled props.
//
// https://developers.google.com/maps/documentation/javascript/3.exp/reference#HeatmapLayer
  data: PropTypes.any,
  options: PropTypes.object,
};

export const heatmapLayerDefaultPropTypes = defaultPropsCreator(heatmapLayerControlledPropTypes);

const heatmapLayerUpdaters = {
  data(data, component) { component.getHeatmapLayer().setData(data); },
  options(options, component) { component.getHeatmapLayer().setOptions(options); },
};

const { eventPropTypes, registerEvents } = eventHandlerCreator(HeatmapLayerEventList);

export const heatmapLayerEventPropTypes = eventPropTypes;

class HeatmapLayerCreator extends Component {

  static propTypes = {
    mapHolderRef: PropTypes.instanceOf(GoogleMapHolder).isRequired,
    heatmapLayer: PropTypes.object.isRequired,
  }

  static _createHeatmapLayer(heatmapLayerProps) {
    const { mapHolderRef } = heatmapLayerProps;
    // https://developers.google.com/maps/documentation/javascript/3.exp/reference#HeatmapLayer
    const heatmapLayer = new google.maps.visualization.HeatmapLayer(
      composeOptions(heatmapLayerProps, heatmapLayerControlledPropTypes)
    );

    heatmapLayer.setMap(mapHolderRef.getMap());

    return heatmapLayer;
  }

  getHeatmapLayer() {
    return this.props.heatmapLayer;
  }

  render() {
    return (<noscript />);
  }
}


export default componentLifecycleDecorator({
  registerEvents,
  instanceMethodName: `getHeatmapLayer`,
  updaters: heatmapLayerUpdaters,
})(HeatmapLayerCreator);


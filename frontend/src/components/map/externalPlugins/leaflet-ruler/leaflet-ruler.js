import L from "leaflet";
import calculateDistance from "../../../../services/calculateDistance";

/*
* Original source code: https://github.com/gokertanrisever/leaflet-ruler
* A simple leaflet plugin to measure true bearing and distance between clicked points. Extends L.Control.
* @autor: Göker Tanrısever (https://github.com/gokertanrisever)
*
* My changes:
* - changed length unit to nautical miles,
* - removed bearing functionality and label "distance"
* - changed var to const/let,
* - used another function to calculate distance
* - changed position and circleMarker's color
*
*/
(function(factory, window){
    if (typeof exports === 'object') {
        module.exports = factory(require('leaflet'));
    }
    if (typeof window !== 'undefined' && window.L) {
        window.L.Ruler = factory(L);
    }
}(function (L) {
    L.Control.Ruler = L.Control.extend({
        options: {
            position: 'bottomleft',
            circleMarker: {
                color: 'grey',
                radius: 2
            },
            lineStyle: {
                color: 'grey',
                dashArray: '1,6'
            },
            lengthUnit: {
                factor: 0.539956803, //  from km to nm
                display: 'nm',
                decimal: 2
            }
        },
        onAdd: function(map) {
            this._map = map;
            this._container = L.DomUtil.create('div', 'leaflet-bar');
            this._container.classList.add('leaflet-ruler');
            L.DomEvent.disableClickPropagation(this._container);
            L.DomEvent.on(this._container, 'click', this._toggleMeasure, this);
            this._choice = false;
            this._defaultCursor = this._map._container.style.cursor;
            this._allLayers = L.layerGroup();
            return this._container;
        },
        onRemove: function() {
            L.DomEvent.off(this._container, 'click', this._toggleMeasure, this);
        },
        _toggleMeasure: function() {
            this._choice = !this._choice;
            this._clickedLatLong = null;
            this._clickedPoints = [];
            this._totalLength = 0;
            if (this._choice){
                this._map.doubleClickZoom.disable();
                L.DomEvent.on(this._map._container, 'keydown', this._escape, this);
                L.DomEvent.on(this._map._container, 'dblclick', this._closePath, this);
                this._container.classList.add("leaflet-ruler-clicked");
                this._clickCount = 0;
                this._tempLine = L.featureGroup().addTo(this._allLayers);
                this._tempPoint = L.featureGroup().addTo(this._allLayers);
                this._pointLayer = L.featureGroup().addTo(this._allLayers);
                this._polylineLayer = L.featureGroup().addTo(this._allLayers);
                this._allLayers.addTo(this._map);
                this._map._container.style.cursor = 'crosshair';
                this._map.on('click', this._clicked, this);
                this._map.on('mousemove', this._moving, this);
            }
            else {
                this._map.doubleClickZoom.enable();
                L.DomEvent.off(this._map._container, 'keydown', this._escape, this);
                L.DomEvent.off(this._map._container, 'dblclick', this._closePath, this);
                this._container.classList.remove("leaflet-ruler-clicked");
                this._map.removeLayer(this._allLayers);
                this._allLayers = L.layerGroup();
                this._map._container.style.cursor = this._defaultCursor;
                this._map.off('click', this._clicked, this);
                this._map.off('mousemove', this._moving, this);
            }
        },
        _clicked: function(e) {
            this._clickedLatLong = e.latlng;
            this._clickedPoints.push(this._clickedLatLong);
            L.circleMarker(this._clickedLatLong, this.options.circleMarker).addTo(this._pointLayer);
            if(this._clickCount > 0 && !e.latlng.equals(this._clickedPoints[this._clickedPoints.length - 2])){
                if (this._movingLatLong){
                    L.polyline([this._clickedPoints[this._clickCount-1], this._movingLatLong], this.options.lineStyle).addTo(this._polylineLayer);
                }
                let text;
                this._totalLength += this._result.Distance;
                if (this._clickCount > 1){
                    text = this._totalLength.toFixed(this.options.lengthUnit.decimal) + '&nbsp;' +  this.options.lengthUnit.display;
                }
                else {
                    text = this._result.Distance.toFixed(this.options.lengthUnit.decimal) + '&nbsp;' +  this.options.lengthUnit.display;
                }
                L.circleMarker(this._clickedLatLong, this.options.circleMarker).bindTooltip(text, {permanent: true, className: 'result-tooltip'}).addTo(this._pointLayer).openTooltip();
            }
            this._clickCount++;
        },
        _moving: function(e) {
            if (this._clickedLatLong){
                L.DomEvent.off(this._container, 'click', this._toggleMeasure, this);
                this._movingLatLong = e.latlng;
                if (this._tempLine){
                    this._map.removeLayer(this._tempLine);
                    this._map.removeLayer(this._tempPoint);
                }
                let text;
                this._addedLength = 0;
                this._tempLine = L.featureGroup();
                this._tempPoint = L.featureGroup();
                this._tempLine.addTo(this._map);
                this._tempPoint.addTo(this._map);
                this._calculateDistance();
                this._addedLength = this._result.Distance + this._totalLength;
                L.polyline([this._clickedLatLong, this._movingLatLong], this.options.lineStyle).addTo(this._tempLine);
                if (this._clickCount > 1){
                    text = this._addedLength.toFixed(this.options.lengthUnit.decimal) + '&nbsp;' +  this.options.lengthUnit.display + '<br><div className="plus-length">(+' + this._result.Distance.toFixed(this.options.lengthUnit.decimal) + ')</div>';
                }
                else {
                    text = this._result.Distance.toFixed(this.options.lengthUnit.decimal) + '&nbsp;' +  this.options.lengthUnit.display;
                }
                L.circleMarker(this._movingLatLong, this.options.circleMarker).bindTooltip(text, {sticky: true, offset: L.point(0, -40) ,className: 'moving-tooltip'}).addTo(this._tempPoint).openTooltip();
            }
        },
        _escape: function(e) {
            if (e.keyCode === 27){
                if (this._clickCount > 0){
                    this._closePath();
                }
                else {
                    this._choice = true;
                    this._toggleMeasure();
                }
            }
        },
        _calculateDistance: function() {
            const f1 = this._clickedLatLong.lat, l1 = this._clickedLatLong.lng, f2 = this._movingLatLong.lat, l2 = this._movingLatLong.lng;
            this._result = {
                Distance: calculateDistance(f1, l1, f2, l2)
            };
        },
        _closePath: function() {
            this._map.removeLayer(this._tempLine);
            this._map.removeLayer(this._tempPoint);
            if (this._clickCount <= 1) this._map.removeLayer(this._pointLayer);
            this._choice = false;
            L.DomEvent.on(this._container, 'click', this._toggleMeasure, this);
            this._toggleMeasure();
        },
    });
    L.control.ruler = function(options) {
        return new L.Control.Ruler(options);
    };
}, window));
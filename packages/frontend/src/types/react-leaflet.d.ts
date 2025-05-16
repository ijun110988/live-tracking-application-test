declare module 'react-leaflet' {
    import { Map as LeafletMap, LatLngExpression } from 'leaflet';
    import * as React from 'react';

    export interface MapContainerProps {
        children?: React.ReactNode;
        center?: LatLngExpression;
        zoom?: number;
        style?: React.CSSProperties;
    }

    export interface TileLayerProps {
        url: string;
    }

    export interface MarkerProps {
        children?: React.ReactNode;
        position: LatLngExpression;
    }

    export interface PopupProps {
        children?: React.ReactNode;
    }

    export const MapContainer: React.FC<MapContainerProps>;
    export const TileLayer: React.FC<TileLayerProps>;
    export const Marker: React.FC<MarkerProps>;
    export const Popup: React.FC<PopupProps>;
}

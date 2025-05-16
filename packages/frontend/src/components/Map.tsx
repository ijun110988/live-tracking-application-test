import { MapContainer, TileLayer, Popup, Marker } from 'react-leaflet';
import { Tracker } from '@live-tracking/shared';
import 'leaflet/dist/leaflet.css';
import { useEffect, useRef, useLayoutEffect } from 'react';
import L from 'leaflet';
import { LatLngTuple } from 'leaflet';
import { useMap } from 'react-leaflet';

// Check if Leaflet CSS is loaded
if (typeof document !== 'undefined') {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.css';
    document.head.appendChild(link);
}

interface MapProps {
    trackers: Tracker[];
    onTrackerSelect: (id: string) => void;
}

const Map = ({ trackers, onTrackerSelect }: MapProps) => {
    console.log('Map component received trackers:', trackers);
    console.log('Trackers count:', trackers.length);
    console.log('First tracker location:', trackers[0]?.lastLocation);
    console.log('Trackers array:', JSON.stringify(trackers, null, 2));
    
    if (!trackers || trackers.length === 0) {
        console.log('No trackers data available');
        return (
            <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <p>No tracker data available</p>
            </div>
        );
    }

    // Log tracker data
    console.log('Map received trackers:', JSON.stringify(trackers, null, 2));
    console.log('Trackers count:', trackers.length);
    console.log('First tracker location:', trackers[0]?.lastLocation);
    console.log('First tracker ID:', trackers[0]?.id);
    console.log('First tracker name:', trackers[0]?.name);
    console.log('First tracker timestamp:', trackers[0]?.lastLocation?.timestamp);

    const defaultPosition = [-6.2088, 106.8456] as LatLngTuple; // Jakarta coordinates
    const markerRefs = useRef<Record<string, L.Marker>>({});
    // Initialize map
    const mapRef = useRef<L.Map | null>(null);

    // Create map when component mounts
    useEffect(() => {
        if (!mapRef.current) {
            console.log('Creating new map instance');
            const map = L.map('map').setView(defaultPosition, 13);
            mapRef.current = map;

            // Add tile layer
            const tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            });
            tileLayer.addTo(map);
            console.log('Tile layer added to map');
        }
    }, []);

    // Update marker positions when trackers change
    useEffect(() => {
        console.log('Updating markers for trackers:', JSON.stringify(trackers, null, 2));
        console.log('Trackers length:', trackers.length);
        
        // Clear all existing markers first
        Object.values(markerRefs.current).forEach(marker => {
            if (marker) {
                marker.remove();
                console.log('Removed marker:', marker);
            }
        });
        markerRefs.current = {};
        console.log('Cleared all markers');

        // Create new markers for each tracker
        trackers.forEach((tracker) => {
            if (!tracker.lastLocation) return;
            
            const position = [tracker.lastLocation.latitude, tracker.lastLocation.longitude] as LatLngTuple;
            console.log(`Creating marker for tracker ${tracker.id} at position:`, position);
            console.log('Tracker data:', {
                id: tracker.id,
                name: tracker.name,
                latitude: tracker.lastLocation.latitude,
                longitude: tracker.lastLocation.longitude,
                timestamp: tracker.lastLocation.timestamp
            });
            
            // Create marker with popup
            const marker = L.marker(position).bindPopup(
                `<div>
                    <h3>${tracker.name}</h3>
                    <p>Location: ${tracker.lastLocation.latitude}, ${tracker.lastLocation.longitude}</p>
                    <p>Timestamp: ${new Date(tracker.lastLocation.timestamp).toLocaleString()}</p>
                </div>`
            ).on('click', () => {
                console.log('Marker clicked:', tracker.id);
                onTrackerSelect(tracker.id);
            });
            
            // Add marker to map
            if (mapRef.current) {
                marker.addTo(mapRef.current);
                console.log('Added marker to map:', marker);
                console.log('Map bounds:', mapRef.current.getBounds());
                console.log('Markers on map:', mapRef.current._layers);
            } else {
                console.log('Map reference not available yet');
            }
            
            markerRefs.current[tracker.id] = marker;
            console.log('Stored marker reference:', markerRefs.current[tracker.id]);
        });
    }, [trackers]);

    return (
        <div style={{
            width: '100%',
            height: '100vh',
            position: 'relative',
            backgroundColor: '#f0f0f0',
            border: '1px solid #ccc',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <div style={{
                width: '100%',
                height: '100%',
                position: 'relative',
                backgroundColor: '#fff'
            }}>
                <div
                    id="map"
                    style={{
                        height: '100%',
                        width: '100%',
                        position: 'relative',
                        zIndex: 0
                    }}
                >
                </div>
            </div>
        </div>
    );
};

export default Map;

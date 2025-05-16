import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Location } from '@live-tracking/shared';
import 'leaflet/dist/leaflet.css';

interface MapProps {
    trackers: Location[];
    onTrackerSelect: (id: string) => void;
}

const Map = ({ trackers, onTrackerSelect }: MapProps) => {
    const defaultPosition = [-6.2088, 106.8456]; // Jakarta coordinates

    return (
        <div style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            padding: 0,
            margin: 0,
        }}>
            <MapContainer
                center={defaultPosition}
                zoom={13}
                style={{
                    height: '100%',
                    width: '100%',
                    padding: 0,
                    margin: 0,
                }}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {trackers.map((tracker) => (
                    <Marker
                        key={tracker.id}
                        position={[tracker.latitude, tracker.longitude]}
                    >
                        <Popup>
                            <div>
                                <div>
                                    <h3>Tracker {tracker.id}</h3>
                                    <span>Terakhir dilihat: {new Date(tracker.timestamp).toLocaleString()}</span>
                                </div>
                                <button onClick={() => onTrackerSelect(tracker.id)}>Select</button>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default Map;

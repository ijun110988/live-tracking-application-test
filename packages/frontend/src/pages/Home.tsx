import { useEffect, useState, useMemo } from 'react';
import { io, Socket } from 'socket.io-client';
import { Location, Tracker } from '@live-tracking/shared';
import Map from '../components/Map';
import TrackerList from '../components/TrackerList';
import TrackerStatus from '../components/TrackerStatus';
import { Box, Typography, Button, List, ListItem, ListItemText } from '@mui/material';

const socket: Socket = io('http://localhost:5000', {
    transports: ['websocket', 'polling'],
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    timeout: 10000,
    path: '/socket.io'
});

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
    const [trackers, setTrackers] = useState<Tracker[]>([]);
    const [selectedTracker, setSelectedTracker] = useState<Tracker | null>(null);

    useEffect(() => {
        console.log('Trackers state updated:', trackers);
    }, [trackers]);

    useEffect(() => {
        socket.on('connect', () => {
            console.log('Connected to server');
            socket.emit('getTrackers');
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from server');
        });

        socket.on('trackersUpdate', (updatedTrackers: Tracker[]) => {
            console.log('Received trackers update event');
            console.log('Updated trackers:', JSON.stringify(updatedTrackers, null, 2));
            console.log('Trackers before update:', JSON.stringify(trackers, null, 2));
            
            // Log lokasi tracker pertama
            if (updatedTrackers.length > 0) {
                console.log('First tracker location:', {
                    latitude: updatedTrackers[0].lastLocation.latitude,
                    longitude: updatedTrackers[0].lastLocation.longitude,
                    timestamp: new Date(updatedTrackers[0].lastLocation.timestamp).toISOString()
                });
            }
            
            setTrackers(updatedTrackers);
            
            // Force re-render
            const newTrackers = [...updatedTrackers];
            console.log('Trackers after update:', JSON.stringify(newTrackers, null, 2));
            
            if (selectedTracker) {
                const tracker = updatedTrackers.find((t: Tracker) => t.id === selectedTracker.id);
                setSelectedTracker(tracker || null);
            }
        });

        // Fetch initial data
        fetch('http://localhost:5000/api/trackers')
            .then(response => response.json())
            .then(data => {
                console.log('Received initial data:', data);
                console.log('Setting trackers:', data);
                setTrackers(data);
            })
            .catch(error => console.error('Error fetching initial data:', error));

        return () => {
            socket.disconnect();
        };
    }, [selectedTracker]);

    const handleTrackerSelect = (id: string) => {
        const tracker = trackers.find((t: Tracker) => t.id === id);
        setSelectedTracker(tracker || null);
    };



    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <Box sx={{ p: 2 }}>
                <Typography variant="h4">Live Tracking</Typography>
            </Box>
            <Box sx={{ display: 'flex', flexGrow: 1 }}>
                <Box sx={{ flex: 1, position: 'relative' }}>
                    <Map
                        trackers={trackers}
                        onTrackerSelect={handleTrackerSelect}
                    />
                </Box>
                <Box sx={{ width: 300, p: 2 }}>
                    <TrackerList
                        trackers={trackers}
                        onTrackerSelect={handleTrackerSelect}
                    />
                </Box>
            </Box>
            {selectedTracker && (
                <TrackerStatus
                    location={selectedTracker.lastLocation}
                />
            )}
        </Box>
    );
};

export default Home;

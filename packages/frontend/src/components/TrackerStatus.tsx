import { Box, Typography, Chip } from '@mui/material';
import { Location } from '@live-tracking/shared';
import { formatTimestamp } from '@live-tracking/shared';
import { CheckCircle, Error } from '@mui/icons-material';

interface TrackerStatusProps {
    location: Location;
}

const TrackerStatus = ({ location }: TrackerStatusProps) => {
    return (
        <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="h6">Status Tracker</Typography>
            <Box sx={{ display: 'flex', gap: 2, flex: 1 }}>
                <Chip
                    label={`Latitude: ${location.latitude.toFixed(6)}`}
                    variant="outlined"
                />
                <Chip
                    label={`Longitude: ${location.longitude.toFixed(6)}`}
                    variant="outlined"
                />
                <Chip
                    label={`Speed: ${location.speed?.toFixed(2)} m/s`}
                    variant="outlined"
                />
                <Chip
                    label={`Heading: ${location.heading?.toFixed(0)}°`}
                    variant="outlined"
                />
                <Chip
                    label={`Battery: ${location.battery?.toFixed(0)}%`}
                    variant="outlined"
                />
            </Box>
            <Typography variant="body2" color="text.secondary">
                Last Updated: {formatTimestamp(location.timestamp)}
            </Typography>
        </Box>
    );
};

export default TrackerStatus;

import { Tracker } from '@live-tracking/shared';
import { Box, List, ListItem, ListItemText, ListItemAvatar, Avatar, Typography } from '@mui/material';

interface TrackerListProps {
    trackers: Tracker[];
    selectedTrackerId?: string;
    onTrackerSelect: (id: string) => void;
}

const TrackerList = ({ trackers, selectedTrackerId, onTrackerSelect }: TrackerListProps) => {
    return (
        <Box sx={{ width: '300px', height: '100vh', overflowY: 'auto', borderRight: 1 }}>
            <Typography variant="h6" sx={{ p: 2, borderBottom: 1 }}>Daftar Tracker</Typography>
            <List>
                {trackers.map((tracker) => (
                    <ListItem
                        key={tracker.id}
                        button
                        selected={tracker.id === selectedTrackerId}
                        onClick={() => onTrackerSelect(tracker.id)}
                    >
                        <ListItemAvatar>
                            <Avatar>
                                {tracker.id[0]}
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={tracker.name}
                            secondary={
                                <>
                                    <Typography
                                        variant="body2"
                                        color={tracker.isActive ? 'success.main' : 'error.main'}
                                    >
                                        {tracker.isActive ? 'Aktif' : 'Tidak Aktif'}
                                    </Typography>
                                    <Typography variant="body2">
                                        Terakhir dilihat: {new Date(tracker.lastUpdated).toLocaleTimeString()}
                                    </Typography>
                                </>
                            }
                        />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default TrackerList;

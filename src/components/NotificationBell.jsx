import { useState } from 'react';
import {
  Badge,
  IconButton,
  Menu,
  MenuItem,
  ListItemText,
  Typography,
  Box
} from '@mui/material';
import { Notifications as NotificationsIcon } from '@mui/icons-material';
import { useNotifications } from '../contexts/NotificationContext';

function NotificationBell() {
  const { notifications, markAsRead, clearNotifications } = useNotifications();
  const [anchorEl, setAnchorEl] = useState(null);
  const unreadCount = notifications.filter(n => !n.read).length;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationClick = (notification) => {
    markAsRead(notification.id);
  };

  return (
    <>
      <IconButton color="inherit" onClick={handleClick}>
        <Badge badgeContent={unreadCount} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: 300,
            width: 360,
          },
        }}
      >
        {notifications.length === 0 ? (
          <MenuItem>
            <ListItemText primary="No notifications" />
          </MenuItem>
        ) : (
          <>
            {notifications.map((notification) => (
              <MenuItem
                key={notification.id}
                onClick={() => handleNotificationClick(notification)}
                sx={{
                  backgroundColor: notification.read ? 'inherit' : 'action.hover',
                  borderLeft: notification.type === 'warning' ? '4px solid #f44336' : '4px solid #2196f3'
                }}
              >
                <Box>
                  <Typography variant="body1">{notification.message}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {new Date(notification.id).toLocaleString()}
                  </Typography>
                </Box>
              </MenuItem>
            ))}
            <MenuItem onClick={clearNotifications}>
              <Typography color="primary">Clear all notifications</Typography>
            </MenuItem>
          </>
        )}
      </Menu>
    </>
  );
}

export default NotificationBell; 
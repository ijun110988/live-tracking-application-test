"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatCoordinates = formatCoordinates;
exports.calculateDistance = calculateDistance;
exports.formatTimestamp = formatTimestamp;
exports.calculateSpeed = calculateSpeed;
function formatCoordinates(location) {
    return `${location.latitude.toFixed(6)}, ${location.longitude.toFixed(6)}`;
}
function calculateDistance(loc1, loc2) {
    const R = 6371e3; // Earth's radius in meters
    const φ1 = loc1.latitude * Math.PI / 180;
    const φ2 = loc2.latitude * Math.PI / 180;
    const Δφ = (loc2.latitude - loc1.latitude) * Math.PI / 180;
    const Δλ = (loc2.longitude - loc1.longitude) * Math.PI / 180;
    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in meters
}
function formatTimestamp(date) {
    return date.toLocaleString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
}
function calculateSpeed(loc1, loc2) {
    const distance = calculateDistance(loc1, loc2);
    const timeDiff = (loc2.timestamp.getTime() - loc1.timestamp.getTime()) / 1000; // seconds
    return distance / timeDiff; // meters per second
}

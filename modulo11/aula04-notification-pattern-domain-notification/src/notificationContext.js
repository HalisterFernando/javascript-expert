export default class NotificationContext {
    constructor() {
        this.notifications = []
    }

    haveNotifications() {
        return this.notifications.length > 0
    }

    addNotification(notification) {
        this.notifications.push(notification)
    }
}
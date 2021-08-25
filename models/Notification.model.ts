export interface Notification {
    groupId: string,
    title: string,
    description: string,
    icon: string,
    primaryAction: string,
    secondaryAction: string,
    isPersist: boolean,
    timestamp: string,
    priority: number
}

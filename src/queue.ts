import {Notification} from "../models/Notification.model";

function queueAdd (queue:any,notification:Notification){
  const notifications = queue.get(notification.priority)
  if(notifications && notifications.length > 0) {
    queue.set(notification.priority,[...notifications, notification])
  }else {
    queue.set(notification.priority,[notification])
  }
}

function getNotification(queue) {
  const keys = [];
  const arr = queue.keys();
  let count = queue.size;
  while (count !== 0) {
    keys.push(arr.next().value);
    count--;
  }
  if (keys.length !== 0) {
    const key = keys.sort().shift();
    const notifications = queue.get(key);
    const notification = notifications.shift();
    if (notifications.length === 0) {
      queue.delete(key);
    } else {
      queue.set(key, notifications);
    }
    return notification;
  }

}

module.exports = {getNotification, queueAdd}

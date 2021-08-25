import {Notification} from "../models/Notification.model";

const {getNotification, queueAdd} = require('../src/queue')

let queue
beforeEach(()=>{
  queue = new Map();
queue.set('1', [{ message: 'message self-broadcast' }]);
queue.set('2', [{ message: 'message self-private' }]);
queue.set('6', [{ message: 'message other-broadcast' }]);
queue.set('3', [
  { message: 'message self-restrict 1' },
  { message: 'message self-restrict 2' },
]);
queue.set('4', [{ message: 'message self-world' }]);
queue.set('5', [{ message: 'message self-payments' }]);
queue.set('7', [{ message: 'message other-event' }]);
queue.set('8', [{ message: 'message other-conversation' }]);

})

describe('Queue',()=>{
    let responses
  beforeEach(()=>{
    responses = []
    while (queue.size > 0) {
      responses.push(getNotification(queue))
    }
  })
  test('To return 9 times', () => {
    expect(responses.length).toBe(9);
  });
  test('To match return value', () => {
    expect(responses[3].message).toBe('message self-restrict 2')
  });
  test('Queue to be 0',()=>{
    expect(queue.size).toEqual(0)
  })
  test('To return 10 times',()=>{
    const notification:Notification = {
      groupId: 'self-payments',
      title: 'some title',
      description: 'a description',
      icon: 'icon thing goes here',
      primaryAction: 'Action 1',
      secondaryAction: 'action 2',
      isPersist: true,
      timestamp: '00:00:00',
      priority: 5
    }
    queueAdd(queue, notification)
    responses.push(getNotification(queue))
    expect(responses.length).toEqual(10)
    expect(responses[9].groupId).toBe('self-payments')
  })
})

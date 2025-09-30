import { Employee, Message, Chat } from '../types/chat';

export const mockEmployees: Employee[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.j@company.com',
    initials: 'SJ',
    isOnline: true,
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'michael.c@company.com',
    initials: 'MC',
    isOnline: true,
  },
  {
    id: '3',
    name: 'Emma Wilson',
    email: 'emma.w@company.com',
    initials: 'EW',
    isOnline: false,
    lastSeen: new Date(Date.now() - 3600000),
  },
  {
    id: '4',
    name: 'James Brown',
    email: 'james.b@company.com',
    initials: 'JB',
    isOnline: false,
    lastSeen: new Date(Date.now() - 7200000),
  },
  {
    id: '5',
    name: 'Lisa Anderson',
    email: 'lisa.a@company.com',
    initials: 'LA',
    isOnline: true,
  },
];

export const mockChats: Chat[] = [
  {
    employeeId: '1',
    isPinned: true,
    unreadCount: 2,
    messages: [
      {
        id: 'm1',
        senderId: '1',
        receiverId: 'me',
        content: 'Hey! Did you review the Q4 report?',
        timestamp: new Date(Date.now() - 3600000),
        status: 'read',
        type: 'text',
      },
      {
        id: 'm2',
        senderId: 'me',
        receiverId: '1',
        content: 'Yes, I just finished it. Looks great!',
        timestamp: new Date(Date.now() - 3000000),
        status: 'read',
        type: 'text',
      },
      {
        id: 'm3',
        senderId: '1',
        receiverId: 'me',
        content: 'Awesome! Can you share the final document?',
        timestamp: new Date(Date.now() - 600000),
        status: 'delivered',
        type: 'text',
      },
    ],
  },
  {
    employeeId: '2',
    isPinned: false,
    unreadCount: 0,
    messages: [
      {
        id: 'm4',
        senderId: 'me',
        receiverId: '2',
        content: 'Hi Michael, meeting at 3 PM today?',
        timestamp: new Date(Date.now() - 7200000),
        status: 'read',
        type: 'text',
      },
      {
        id: 'm5',
        senderId: '2',
        receiverId: 'me',
        content: 'Yes, confirmed! See you then.',
        timestamp: new Date(Date.now() - 7000000),
        status: 'read',
        type: 'text',
      },
    ],
  },
];
const task1Id = '375784c2-fda1-4a74-8316-21f076c5386a'
const task2Id = 'db397b49-a85f-4aca-9a28-ca9a155f8a72'
const task3Id = '4b8fa56d-c8d0-429f-9087-b9ec6a509d2b'

const initialData = {
  tasks: {
    [task1Id]: { id: task1Id, content: 'Take out the garbage' },
    [task2Id]: { id: task2Id, content: 'Watch my favorite show' },
    [task3Id]: { id: task3Id, content: 'Charge my phone' },
  },
  columns: {
    'unassigned': {
      id: 'unassigned',
      title: 'Unassigned Tasks',
      taskIds: [task1Id, task2Id, task3Id],
    },
    'john-doe': {
      id: 'john-doe',
      title: 'John Doe',
      taskIds: []
    },
    'jane-smith': {
      id: 'jane-smith',
      title: 'Jane Smith',
      taskIds: []
    },
    'hughbert-wonk': {
      id: 'hughbert-wonk',
      title: 'Hughbert Wonk',
      taskIds: []
    },
  },
  // Facilitate reordering of the columns
  columnOrder: ['unassigned', 'john-doe', 'jane-smith', 'hughbert-wonk'],
};

export default initialData;
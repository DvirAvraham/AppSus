import { utilService } from '../../../services/util-service.js';
import { storageService } from '../../../services/async-storage-service.js';
import noteTextCmp from '../cmps/note-text.cmp.js';

const NOTES_KEY = 'notes';
_createNotes();

export const noteService = {
  query,
  get,
  remove,
  save,
  update,
  getEmptyNote,
};

function query() {
  return storageService.query(NOTES_KEY);
}

function get(noteId) {
  return storageService.get(NOTES_KEY, noteId);
}

function remove(noteId) {
  return storageService.remove(NOTES_KEY, noteId);
}

function save(note) {
  return storageService.post(NOTES_KEY, note);
}

function update(note) {
  return storageService.put(NOTES_KEY, note);
}

function getEmptyNote() {
  return {
    id: _makeId(),
    type: 'noteTxt',
    title: '',
    isPinned: false,
    lastEdit: Date.now(),
    info: {
      txt: '',
    },
    bgColor: '#fff475',
  };
}

function _createNotes() {
  let notes = utilService.loadFromStorage(NOTES_KEY);

  if (!notes || !notes.length) {
    notes = [
      {
        id: 'n3165',
        title: 'Songi',
        type: 'noteTxt',
        isPinned: false,
        lastEdit: Date.now(),
        info: {
          txt: `Have you ever loved someone so much
          You'd give an arm for
          Not the expression, no
          Literally give an arm for
          When they know they're your heart
          And you know you are their armor
          And you will destroy anyone who would try to harm her
          But what happens when karma
          Turns right around and bites you
          `,
        },
        bgColor: '#f28b82',
      },
      {
        id: 'n11231234312',
        type: 'noteImg',
        title: 'Treehouse',
        isPinned: true,
        lastEdit: Date.now(),
        info: {
          url: 'https://images.unsplash.com/photo-1531966662811-c6501e46eda6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=830&q=80',
          title: 'Bobi and Me',
        },
        bgColor: '#aecbfa',
      },
      {
        id: 'n101',
        title: 'Remember',
        type: 'noteTxt',
        isPinned: true,
        lastEdit: Date.now(),
        info: {
          txt: 'Fullstack Me Baby!',
        },
        bgColor: '#d7aefb',
      },
      {
        id: 'n102',
        type: 'noteImg',
        title: 'my img',
        isPinned: false,
        lastEdit: Date.now(),
        info: {
          url: 'https://res.cloudinary.com/practicaldev/image/fetch/s--wJ0gYHgm--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://thepracticaldev.s3.amazonaws.com/i/d440mmj72v2vi7ad76ir.png',
          title: 'Bobi and Me',
        },
        bgColor: '#a7ffeb',
      },
      {
        id: 'n1123122',
        type: 'noteImg',
        title: 'Road to nowhere',
        isPinned: true,
        lastEdit: Date.now(),
        info: {
          url: 'https://media.istockphoto.com/photos/classic-highway-scene-in-the-american-west-picture-id924508948?k=20&m=924508948&s=612x612&w=0&h=VCCstrv1n15avc_lsyS-Oar9t9zgycEwZcrcJ6Lq33c=',
          title: 'Bobi and Me',
        },
        bgColor: '#f28b82',
      },
      {
        id: 'n103',
        type: 'noteList',
        title: 'Get my stuff together',
        isPinned: true,
        lastEdit: Date.now(),
        info: {
          todos: [
            { txt: 'Driving liscence', doneAt: null, id: 335 },
            { txt: 'Coding power', doneAt: 187111111, id: 531 },
            { txt: 'Vue', doneAt: 187112311, id: 531 },
            { txt: 'React', doneAt: 187116111, id: 531 },
          ],
        },
        bgColor: '#fff475',
      },
      {
        id: 'n104',
        title: 'Favorite song',
        type: 'noteVid',
        isPinned: false,
        lastEdit: Date.now(),
        info: {
          url: `https://www.youtube.com/watch?v=tgbNymZ7vqY`,
        },
        bgColor: '#bdea8a',
      },
      {
        id: 'n105',
        title: 'Canvas',
        type: 'noteCanvas',
        isPinned: false,
        lastEdit: Date.now(),
        info: {
          canvas: `data:image/png;base64,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`,
        },
        bgColor: '#e8eaed',
      },
    ];
    utilService.saveToStorage(NOTES_KEY, notes);
  }
  return notes;
}

function _makeId(length = 8) {
  var text = '';
  var possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

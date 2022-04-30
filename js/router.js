import homePage from './pages/app-home-page.cmp.js';
import emailPage from './apps/email/pages/email-app.js';
import emailDetails from './apps/email/pages/email-details.cmp.js';
import notesPage from './apps/notes/pages/notes-app.js';
import noteDetails from './apps/notes/pages/note-details.cmp.js';
import bookApp from './apps/books/views/book-app.cmp.js';
import bookDetails from './apps/books/views/book-details.cmp.js';
const routes = [
  {
    path: '/',
    component: homePage,
  },
  {
    path: '/email',
    component: emailPage,
  },
  {
    path: '/email/:emailId',
    component: emailDetails,
  },
  {
    path: '/notes',
    component: notesPage,
  },
  {
    path: '/notes/:noteId',
    component: noteDetails,
  },
  {
    path: '/book',
    component: bookApp,
  },
  {
    path: '/book/:bookId',
    component: bookDetails,
  },
];

export const router = VueRouter.createRouter({
  routes,
  history: VueRouter.createWebHashHistory(),
});

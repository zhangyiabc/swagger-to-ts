import { createBrowserRouter } from 'react-router';
import Home from 'src/pages/home/chatHome';
import CommentHome from 'src/pages/comment/commentHome';
import AppLayout from 'src/App';
import NotFound from 'src/pages/notFound';
import Token from 'src/pages/token/token';
import User from 'src/pages/user/user';
import Login from 'src/pages/Login';
import Prompt from 'src/pages/prompt/index';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: AppLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: '/comment',
        Component: CommentHome,
      },
      {
        path: '/token',
        Component: Token,
      },
      {
        path: '/user',
        Component: User,
      },
      {
        path: '/prompt',
        Component: Prompt,
      },
      {
        path: '*',
        Component: NotFound,
      },
    ],
  },
  {
    path: '/login',
    Component: Login,
  },
]);

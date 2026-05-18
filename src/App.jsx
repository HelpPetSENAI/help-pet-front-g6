import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ComingSoonPage from './pages/CommingSoonPage'
import NotFoundPage from './pages/NotFoundPage.jsx'
import GlobalStyle from './styles/GlobalStyle.js'
import ExamplePage from './pages/ExamplePage.jsx'
import MessagePageG6 from './pages/page-g6/MessagePageG6.jsx'
import Chat from './pages/page-g6/Chat.jsx'
import { MessagesProvider } from './pages/page-g6/context/MessagesContext.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <ComingSoonPage />,
    errorElement: <NotFoundPage />
  },
  {
    path: '/coming-soon',
    element: <ComingSoonPage />
  },
  {
    path: '/example',
    element: <ExamplePage />
  },
  {
    path: '/message',
    element: <MessagePageG6 />
  },
  {
    path: '/message/chat',
    element: <Chat />
  }
  
])

export default function App() {
  return (
    <MessagesProvider>
      <GlobalStyle />
      <RouterProvider router={router} />
    </MessagesProvider>
  )
}

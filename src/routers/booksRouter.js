import { Navigate, Outlet } from 'react-router-dom';

const App = () => {
  return (
    <div className="main-layout">
      <Outlet />
    </div>
  );
};

export const booksRouter = [
  {
    path: "/",
    element: <App />,
  },
];

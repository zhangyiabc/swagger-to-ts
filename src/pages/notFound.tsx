import React from 'react';
import { Link } from 'react-router';
const NotFound = () => {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link to="/">回到主页</Link>
    </div>
  );
};

export default NotFound;

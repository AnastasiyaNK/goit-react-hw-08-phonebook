import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div>
      <h1>Page not found 404 </h1>
      <Link to={'/'}>Go home</Link>
    </div>
  );
};

export default NotFoundPage;

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import BugList from '../components/bugs/BugList';
import BugDetail from '../components/bugs/BugDetail';
import BugForm from '../components/bugs/BugForm';

const BugsPage: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<BugList />} />
      <Route path="/new" element={<BugForm />} />
      <Route path="/:id" element={<BugDetail />} />
      <Route path="/:id/edit" element={<BugForm />} />
    </Routes>
  );
};

export default BugsPage;
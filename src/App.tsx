import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard';
import FileCreation from './pages/FileCreation';
import FileDetail from './pages/FileDetail';
import OfficerDashboard from './pages/OfficerDashboard';
import PublicStatusDisplay from './pages/PublicStatusDisplay';
import PublicStatusEntry from './pages/PublicStatusEntry';
import WorkflowEditor from './pages/WorkflowEditor';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <header className="App-header">
            <Routes>
              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/file-creation" element={<FileCreation />} />
              <Route path="/file-detail" element={<FileDetail />} />
              <Route path="/officer-dashboard" element={<OfficerDashboard />} />
              <Route
                path="/public-status-display"
                element={<PublicStatusDisplay />}
              />
              <Route
                path="/public-status-entry"
                element={<PublicStatusEntry />}
              />
              <Route path="/workflow-editor" element={<WorkflowEditor />} />
            </Routes>
          </header>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;

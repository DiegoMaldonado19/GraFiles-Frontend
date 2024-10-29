import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './views/Login';
import ViewAdministrador from './views/ViewAdministrador';
import ViewEmpleado from './views/ViewEmpleado';
import TextEditorPage from './components/TextEditorPage';
import DirectorySelect from './views/DirectorySelect';
import NewDocument from './components/NewDocument';
import Register from './views/Register';
import SharedFiles from './views/SharedFiles';
import PaperBin from './views/PaperBin';
import TextEditorReadPage from './components/TextEditorReadPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<ViewAdministrador />} />
        <Route path="/empleado" element={<ViewEmpleado />} />
        <Route path="/editor/:fileId/:userId/:filename" element={<TextEditorPage />} />
        <Route path="/directory/:directoryId/:directoryName" element={<DirectorySelect />} />
        <Route path="/editor/:directoryId/nuevo-documento" element={<NewDocument />} />
        <Route path="/sharedirectory" element={<SharedFiles />} />
        <Route path="/paperbin" element={<PaperBin />} />
        <Route path="/editorRead/:fileId/:userId/:filename" element={<TextEditorReadPage />} />
      </Routes>
    </Router>
  );
}

export default App;
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login';
import SavedJobs from './pages/SavedJobs.jsx';
import './App.css'; 

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/saved-jobs" element={<SavedJobs />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
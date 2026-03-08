import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import SavedJobs from './pages/SavedJobs';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/saved-jobs" element={<SavedJobs />}/>
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Providers from './modules/Providers';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Providers />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

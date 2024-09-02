import './App.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register'
import Todo from './pages/Todo';

function App() {
  return (
    <Router>      
      <div className="App">
        <Routes>
          <Route path='/Login' element={<Login/>}/>
          <Route path='/Register' element={<Register/>}/>
          <Route path='/' element={<Todo/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;

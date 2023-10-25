
import { Navbar } from './components/Navbar';
import { Home } from './components/Home';
import { About } from './components/About';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import NoteState from './context/notes/NoteState';
import { Signup } from './components/Signup';
import { Login } from './components/Login';
import Alert  from './components/Alert';
import { useState } from 'react';
import { LandingPage } from './components/LandingPage';

function App() {

  //alert functionality
  const [alert, setAlert] = useState(null)
  const showAlert = (message, type)=>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  }
 


  
  return (
    <div className="App">
    
    
    <NoteState>
      <Router>
          <Navbar />


          <Alert alert={alert}/>
            {/* <h2 >MY NOTES APP</h2>       */}
          <Routes>

          <Route exact path="/" element={<LandingPage/>}/>

            <Route exact path="/home" element={<Home showAlert={showAlert}/>}/>
            
            <Route exact path="/about" element={<About />}/>  

            <Route exact path="/login" element={<Login showAlert={showAlert}/>}/>  

            <Route exact path="/signup" element={<Signup />}/>  

          </Routes>
      </Router>
      </NoteState>
    
    
    
    </div>
  );
}

export default App;

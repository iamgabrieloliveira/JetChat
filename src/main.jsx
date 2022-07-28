import React from 'react';
import ReactDOM from 'react-dom/client';
import {Home} from "./pages/Home.jsx";
import { BrowserRouter as Router } from 'react-router-dom'
import Route from './routes';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Route/>
    </Router>
  </React.StrictMode>
)

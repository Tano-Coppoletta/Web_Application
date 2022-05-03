import logo from './logo.svg';
import './App.css';

import './App.css'

import {BrowserRouter, Routes, Route, Outlet, NavLink, useNavigate, useParams} from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route element={<Layout/>}>
        <Route path='/'>
          <Route index element={<h1>Home</h1>}/>
          <Route path='about' element={<h1>About page</h1>}/>
        </Route>
        <Route path='/help'>
          <Route index element={<h2>Help page</h2>}/>
          <Route path='contents' element={<h2>Content list of the help section</h2>}/>
          <Route path='*' element={<h2>Invalid topic</h2>}/>
          <Route path='topic/:topicName' element={<HelpByTopic/>}/>
        </Route>
      </Route>
    </Routes>
    </BrowserRouter>
  );
}

function Layout(props){
  const navigate=useNavigate();
  
  return <>
  <h1>Website title</h1>
  <hr/>
    <ul>
      <li><NavLink to='/about'>About</NavLink></li>
      <li><NavLink to='/help'>Help</NavLink></li>
    </ul>
    <button onClick={() => {navigate('/about')}}>About</button>
  <Outlet/>

  </>
}

function HelpByTopic(props){
  const params=useParams();

  return <>
  <h2>Help by topic</h2>
  <p>This is the topic: {params.topicName}</p>

  </>
}

export default App;

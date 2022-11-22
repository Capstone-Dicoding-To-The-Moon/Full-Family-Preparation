import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Artikel from './pages/Artikel';
import ForumDiskusi from './pages/ForumDiskusi';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarComponent from './components/NavbarComponent';
import FooterComponent from './components/FooterComponent';

function App() {
  return (
    <>
      <NavbarComponent />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/artikel" element={<Artikel />} />
        <Route path="/forumDiskusi" element={<ForumDiskusi />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
      <FooterComponent />
    </>
  );
}

export default App;

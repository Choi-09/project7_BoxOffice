import Boxoffice from './components/Boxoffice';
import BoxMv from './components/BoxMv';
import {Routes, Route} from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path = '/' element = {<Boxoffice/>} />
      <Route path = '/mvinfo' element = {<BoxMv/>} />
    </Routes>
  );
}

export default App;

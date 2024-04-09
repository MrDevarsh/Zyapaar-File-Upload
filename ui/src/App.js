import './App.css';
import ImageUpload from './Components/ImageUpload';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
      <div className="App">
       
      <ToastContainer />
       <div className="image-upload">
       
         <ImageUpload />
       </div>
       
   </div>
    </>
  );
}

export default App;

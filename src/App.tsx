import { BrowserRouter, Routes, Route } from 'react-router-dom';  
import HomePage      from './pages/HomePage';  
import ResultsPage   from './pages/ResultsPage';  
import CampaignPage  from './pages/CampaignPage';  
import NationalParkFacts from './pages/NationalParkFacts';  // ① NEW  
  
function App() {  
  return (  
    <BrowserRouter>  
      <Routes>  
        <Route path="/" element={<HomePage />} />  
        <Route path="/results/:zip" element={<ResultsPage />} />  
        <Route path="/campaign" element={<CampaignPage />} />  
        {/* ② NEW ROUTE */}  
        <Route path="/explore-the-parks" element={<NationalParkFacts />} />  
      </Routes>  
    </BrowserRouter>  
  );  
}  
  
export default App;
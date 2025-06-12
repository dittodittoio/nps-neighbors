import { useEffect, useState } from 'react';  
import { Line } from 'react-chartjs-2';  
import {  
  Chart as ChartJS,  
  CategoryScale,  
  LinearScale,  
  PointElement,  
  LineElement,  
  Tooltip,  
  Legend,  
  ChartData,  
} from 'chart.js';  
import NavBar from '../components/NavBar'; // <-- Add this import  
import resultsBg from '../images/resultspagebackground.png'; // Add this import  
  
// register the pieces Chart.js needs  
ChartJS.register(  
  CategoryScale,  
  LinearScale,  
  PointElement,  
  LineElement,  
  Tooltip,  
  Legend  
);  
  
type Fact = {  
  heading: string;  
  value: string | number;  
  blurb: string;  
};  
  
export default function NationalParkFacts() {  
  // -------------- state --------------  
  const [facts, setFacts] = useState<Fact[]>([]);  
  const [trend, setTrend] = useState<ChartData<'line'> | null>(null);  
  
  // -------------- load the facts JSON --------------  
  useEffect(() => {  
    fetch('/facts.json')  
      .then(r => r.json())  
      .then(setFacts);  
  }, []);  
  
  // -------------- load the visits CSV --------------  
  useEffect(() => {  
    fetch('/visitsTrend.csv')  
      .then(r => r.text())  
      .then(text => {  
        const rows = text.trim().split('\n').slice(1); // skip header  
        const labels = rows.map(r => r.split(',')[0]);           // years  
        const data   = rows.map(r => Number(r.split(',')[1]));    // visits  
  
        setTrend({  
          labels,  
          datasets: [  
            {  
              label: 'Recreational Visits',  
              data,  
              borderColor: '#047857',  
              backgroundColor: 'rgba(4,120,87,0.15)',  
              tension: 0.25,  
              pointRadius: 3  
            }  
          ]  
        });  
      });  
  }, []);  
  
  // -------------- page skeleton --------------  
  return (  
    <main  
      className="min-h-screen bg-gray-50 px-4 py-12 pt-20"  
      style={{  
        backgroundImage: `url(${resultsBg})`,  
        backgroundSize: 'cover',  
        backgroundPosition: 'center',  
        backgroundAttachment: 'fixed',  
      }}  
    >  
      <NavBar />  
      {/* title */}  
      <h1  
        className="text-center text-3xl md:text-5xl font-heading font-extrabold text-green-800 mb-12"  
        style={{ marginTop: '50px' }} // <-- Add this inline style  
      >  
        Why National Parks Matter  
      </h1>  
  
      {/* grid of fact cards */}  
      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">  
        {facts.map((f, i) => (  
          <article  
            key={i}  
            className="bg-white shadow-md rounded-xl p-6 border-t-4 border-green-700 flex flex-col"  
          >  
            <h2
              className="text-xl font-body font-semibold text-green-900 mb-1"
              style={{ fontFamily: '"Forest Trophy Textured", sans-serif' }}
            >
              {f.heading}
            </h2>
            <p className="text-3xl mb-2" style={{ fontFamily: '"Forest Trophy Rounded", sans-serif', fontWeight: 900, color: '#047857' }}>
              {f.value}
            </p>
            <p className="text-gray-600 font-body grow">{f.blurb}</p>  
          </article>  
        ))}  
      </section>  
  
      {/* line-chart block */}  
      <section className="mt-16 max-w-5xl mx-auto bg-white p-8 rounded-xl shadow">  
        <h2 className="text-2xl font-body font-semibold text-green-900 mb-4 text-center">  
          Recreational Visits (2014–2024)  
        </h2>  
        {trend && <Line data={trend} />}  
      </section>  
    </main>  
  );  
}
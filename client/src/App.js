import { Header } from './components';
import { Route } from 'react-router-dom';
import { Home, About, Doctors, Contacts, MainImg, Schedule, Ambulance, CallDoctor, Reception } from './pages';

function App() {
    return (
        <div className="wrapper">
            <Header />
            <div className="content">
                <Route path="/" component={MainImg} exact />
                <Route path="/" component={Home} exact />
                <Route path="/about" component={About} exact />
                <Route path="/doctors" component={Doctors} exact />
                <Route path="/schedule" component={Schedule} exact />
                <Route path="/reception" component={Reception} exact />
                <Route path="/ambulance" component={Ambulance} exact />
                <Route path="/call-doctor" component={CallDoctor} exact />
                <Route path="/contacts" component={Contacts} exact />
            </div>
        </div>
    );
}

export default App;

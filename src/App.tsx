import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import 'regenerator-runtime/runtime';
import Loader from './common/Loader';
import Terms from './pages/Terms';
import Overview from './pages/Dashboard/Overview';
import Faq from './pages/Faq';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import SignIn from './pages/Authentication/SignIn';
import PageTitle from './components/PageTitle';
import Ads from './pages/Dashboard/Ads'


function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Routes>

      <Route
        path="/login"
        element={
          <>
            <PageTitle title="Admin Sign In" />
            <SignIn />
          </>
        }
      />
        <Route
          path='/:userId'
          element={
            <>
              <PageTitle title="Ads Dashboard" />
              <Overview />
            </>
          }
        />
        <Route 
        path='/ads/:userId'
        element={
          <>
           <PageTitle title="Ads " />
            <Ads/>
          </>
        }
        />
        <Route
          path="/profile"
          element={
            <>
              <PageTitle title="Profile" />
              <Profile />
            </>
          }
        />
     <Route 
            path="/terms"
            element={
                <>
                <PageTitle title="Privacy Policy" />
                <Terms />
                </>
            }
     
      />
      <Route 
            path="/faq"
            element={
                <>
                <PageTitle title="Faq's" />
                <Faq />
                </>
            }
            />
      
      
        <Route
          path="/settings"
          element={
            <>
              <PageTitle title="Settings " />
              <Settings />
            </>
          }
        />
    
      
      
  
      </Routes>
    </>
  );
}

export default App;

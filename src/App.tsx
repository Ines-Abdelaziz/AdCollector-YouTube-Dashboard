import { useEffect, useState } from 'react';
import { Route, Routes, useLocation, useParams, Navigate } from 'react-router-dom';
import 'regenerator-runtime/runtime';
import Loader from './common/Loader';
import Terms from './pages/Terms';
import Overview from './pages/Dashboard/Overview';
import Faq from './pages/Faq';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import SignIn from './pages/Authentication/SignIn';
import PageTitle from './components/PageTitle';
import Ads from './pages/Dashboard/Ads';
import Analytics from './pages/Dashboard/Analytics';
import AdminOverview from './pages/Admin/Overview';
import AdminAnalytics from './pages/Admin/Analytics';
import AdminAds from './pages/Admin/Ads';

import { useSession } from './context/SessionContext'; // Import useSession hook

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
          path="/admin/overview"
          element={
            <>
              <PageTitle title="Overview " />
              <AdminOverview />
            </>
          }
        />
          <Route
          path="/admin/analytics"
          element={
            <>
              <PageTitle title="Analytics" />
              <AdminAnalytics />
            </>
          }
        />
      <Route
          path="/admin/ads"
          element={
            <>
              <PageTitle title="Ads" />
              <AdminAds />
            </>
          }
        />


        {/* Route for handling userId and redirect */}
        <Route path="/:userId" element={<HandleUserIdRedirect />} />

        <Route
          path="/overview"
          element={
            <>
              <PageTitle title="Ads Dashboard" />
              <Overview />
            </>
          }
        />

        <Route
          path="/ads"
          element={
            <>
              <PageTitle title="Ads " />
              <Ads />
            </>
          }
        />
        <Route
          path="/analytics"
          element={
            <>
              <PageTitle title="Analytics " />
              <Analytics />
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

// New component to handle userId and session
function HandleUserIdRedirect() {
  const { userId } = useParams<{ userId: string }>(); // Correctly typed useParams
  const { setSessionId } = useSession(); // Access setSessionId from context

  useEffect(() => {
    if (userId) {
      console.log("User ID:", userId); // Debug log to check userId
      setSessionId(userId); // Set session ID using the context setter
      localStorage.setItem('sessionId', userId); // Optionally, store in local storage for persistence
    }
  }, [userId, setSessionId]);

  return <Navigate to="/overview" replace />;
}

export default App;



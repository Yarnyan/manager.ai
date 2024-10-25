import { BrowserRouter, Routes, Route } from "react-router-dom"
import RootLayout from "./RootLayout"
import HomePage from "./pages/HomePage"
import ProfilePage from "./pages/ProfilePage"
import CreatePage from "./pages/CreatePage"
import ManagerPage from "./pages/ManagerPage"
import ChatPage from "./pages/ChatPage"
import TermsPage from "./pages/TermsPage"
import PrivacyPage from "./pages/PrivacyPage"
import TarrifsPage from "./pages/TarrifcPage"
import ProtectedRouter from "./helpers/router/ProtectedRouter"
import { createSignalRContext } from "react-signalr/signalr";
function App() {

  const SignalRContext = createSignalRContext();

  const token = localStorage.getItem('token')

  return (
    <SignalRContext.Provider
      connectEnabled={!!token}
      accessTokenFactory={() => token}
      dependencies={[token]}
      url={import.meta.env.VITE_API_URL + 'chat/hub'}
    >
      <BrowserRouter>
        <RootLayout>
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/terms" element={<TermsPage />}></Route>
            <Route path="/privacy" element={<PrivacyPage />}></Route>
            <Route path="/chat/:botName" element={<ProtectedRouter><ChatPage /></ProtectedRouter>}></Route>
            <Route path="/tarrifs" element={<ProtectedRouter><TarrifsPage /></ProtectedRouter>}></Route>
            <Route path="/profile" element={<ProtectedRouter><ProfilePage /></ProtectedRouter>}></Route>
            <Route path="/create" element={<ProtectedRouter><CreatePage /></ProtectedRouter>}></Route>
            <Route path="/manager/:name" element={<ProtectedRouter><ManagerPage /></ProtectedRouter>}></Route>
          </Routes>
        </RootLayout>
      </BrowserRouter>
    </SignalRContext.Provider>
  );
}

export default App

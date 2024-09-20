import { BrowserRouter, Routes, Route} from "react-router-dom"
import RootLayout from "./RootLayout"
import Home from "./pages/HomePage"
import ProfilePage from "./pages/ProfilePage"
import CreatePage from "./pages/CreatePage"
import ManagerPage from "./pages/ManagerPage"
import ChatPage from "./pages/ChatPage"
import ProtectedRouter from "./helpers/router/ProtectedRouter"
function App() {


  return (
    <BrowserRouter>
      <RootLayout>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/chat/:botName" element={<ProtectedRouter><ChatPage /></ProtectedRouter>}></Route>
          <Route path="/profile/:name" element={<ProtectedRouter><ProfilePage /></ProtectedRouter>}></Route>
          <Route path="/create" element={<ProtectedRouter><CreatePage /></ProtectedRouter>}></Route>
          <Route path="/manager/:name" element={<ProtectedRouter><ManagerPage /></ProtectedRouter>}></Route>
        </Routes>
      </RootLayout>
    </BrowserRouter>
  )
}

export default App

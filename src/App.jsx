import { Route, Routes } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Sign_up from "./pages/Sign_up"
import Sign_in from "./pages/Sign_in"

function App() {

  return (
    <>
      <Routes>
          <Route path = "/" element = {<Welcome />} />
          <Route path = "/sign_up" element = {<Sign_up />} />
          <Route path = "/sign_in" element = {<Sign_in />} />
      </Routes>
    </>
  )
}

export default App

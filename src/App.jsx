import { BrowserRouter, Route, Routes } from "react-router-dom"
import { BaseLayout } from "./pages/BaseLayout"
import { NotFound } from "./pages/notfound/NotFound"
import { useEffect } from "react";


function App() {

  useEffect(() => {
    document.documentElement.classList.add('dark');
    return () => {
      document.documentElement.classList.remove('dark');
    };
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/404"
          element={<NotFound />}
        />
        <Route path="/*" element={<BaseLayout />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

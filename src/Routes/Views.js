import { Route, Routes } from "react-router-dom"
import Welcome from "../Pages/Welcome"
import Rizni from '../Pages/Test/Rizni';
import Mathushiya from '../Pages/Test/Mathushiya';
import Sarujan from '../Pages/Test/Sarujan';
import NotFound from "../Pages/NotFound";

function Views() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="test">
        <Route path="Rizni/*" element={<Rizni />} />
        <Route path="Mathushiya" element={<Mathushiya />} />
        <Route path="Sarujan" element={<Sarujan />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default Views
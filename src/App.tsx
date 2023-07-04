import { Route, Routes } from "react-router-dom";
import MyLayout from "./components/MyLayout";
import ProductList from "./pages/productList";
import InfoInput from "./pages/infoInput";
import SettingsPage from "./pages/settingsPage";
import Document from "./pages/document";
import UsageList from "./pages/usageList";

function App() {
  return (
    <MyLayout>
      <Routes>
        <Route path="ProductList" element={<ProductList />} />
        <Route path="Document/:u_id" element={<Document />} />
        <Route path="UsageList/:u_p_id/:isTop?" element={<UsageList />} />
        <Route path="InfoInput" element={<InfoInput />} />
        <Route path="Settings" element={<SettingsPage />} />
      </Routes>
    </MyLayout>
  );
}

export default App;

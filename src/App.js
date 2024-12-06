import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Fragment } from "react";
import { publicRoutes} from './routes'
import DefaultLayout from "./components/Layouts/DefaultLayout";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {publicRoutes.map((route, index) => {
            const Layout = route.layout === null ? Fragment : DefaultLayout
            const Page = route.component
            return <Route key={index} path={route.path} element={
              <Layout>
                <Page />
              </Layout>
            } />
          })}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

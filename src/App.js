import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Main from "./pages/Main";
import ThemeContext from "./context/AppContext";
import { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./style/theme";
import { GlobalStyle } from "./style/GlobalStyle";
import axios from "axios";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Main />}>
      {/* <Route path="dashboard" element={<Dashboard />} /> */}
      {/* ... etc. */}
    </Route>
  )
);

function App() {
  const [selectedPost, setSelectedPost] = useState("");
  const [selectedTag, setSelectedTag] = useState(null);
  const [postData, setPostData] = useState([]);
  const [openPost, setOpenPost] = useState([]);
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    async function fetch() {
      const { data: responsePostdata } = await axios.get(
        "http://localhost:4000/post/all"
      );
      setPostData(responsePostdata);
    }
    fetch();
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        selectedPost,
        setSelectedPost,

        openPost,
        setOpenPost,

        postData,

        theme,
        setTheme,

        selectedTag,
        setSelectedTag,
      }}
    >
      <ThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
        <GlobalStyle />
        <RouterProvider router={router} />
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

export default App;

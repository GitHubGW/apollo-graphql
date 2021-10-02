import { HashRouter, Route } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import Detail from "../routes/Detail";
import Home from "../routes/Home";

const GlobalStyle = createGlobalStyle`
  ${reset};

  body{
    background: linear-gradient(to right, #c9d6ff, #e2e2e2);
    height: 100vh;
    font-family: 'Teko', sans-serif;
  }
`;

const App = () => {
  return (
    <>
      <GlobalStyle />
      <HashRouter>
        <Route exact path="/" component={Home}></Route>
        <Route path="/:id" component={Detail}></Route>
      </HashRouter>
    </>
  );
};

export default App;

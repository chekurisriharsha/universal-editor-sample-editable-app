import {React, useEffect} from "react";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import {HashRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./components/Home";
import AdventureDetail from "./components/AdventureDetail";
import Articles from "./components/Articles";
import ArticleDetail from "./components/ArticleDetail";
import About from "./components/About";
import {getAuthorHost, getProtocol, getService} from "./utils/fetchData";
import {getQueryStringForHashRouting} from "./utils/commons";
import logo from "./images/wknd-logo-dk.svg";
import "./App.scss";

const NavMenu = () => {
	const query = getQueryStringForHashRouting();
	return (
		<nav>
			<ul className="menu">
				<li><a href={`#/${query}`}>Adventures</a></li>
				<li><a href={`#/articles${query}`}>Magazine</a></li>
				<li><a href={`#/aboutus${query}`}>About Us</a></li>
			</ul>
		</nav>
	);
};

const Header = () => {
  return (
    <header className="header">        {/*<a href={sparkleAppUrl}><img src={logo} className="logo" alt="WKND Logo" /></a>*/}
        <img src={logo} className="logo" alt="WKND Logo" />
      <NavMenu />
      <button className="dark">Sign in</button>
    </header>
  );
};

const Footer = () => (
  <footer className="footer">
    <img src={logo} className="logo" alt="WKND Logo" />
    <NavMenu />
    <small>Copyright &copy; 2023 Adobe. All rights reserved</small>
  </footer>
);

function App() {
	// With hash routing, keep query params only in the hash to avoid duplication
	useEffect(() => {
		if (window.location.search) {
			const hash = window.location.hash || "#/";
			const newHash = hash + (hash.includes("?") ? "" : window.location.search);
			window.history.replaceState(null, "", window.location.pathname + newHash);
		}
	}, []);

	return (
		<HelmetProvider>
			<div className="App">
				<Helmet>
					<meta name="urn:adobe:aue:system:aemconnection" content={`${getProtocol()}:${getAuthorHost()}`}/>
					{ getService() && <meta name="urn:adobe:aue:config:service" content={getService()}/> }
				</Helmet>
				<Router>
          <Header />
          <hr/>
          <main>
            <Routes>
              <Route path="/adventure/:slug" element={<AdventureDetail />} />
              <Route path="/articles" element={<Articles />} />
              <Route path="/articles/article/:slug" element={<ArticleDetail />} />
              <Route path="/aboutus" element={<About />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </main>
        </Router>
        <hr/>
        <Footer/>
      </div>
    </HelmetProvider>
  );
}

export default App;

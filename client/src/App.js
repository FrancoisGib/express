import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from './components/register';
import { useEffect, useState } from 'react';
import Main from './components/main';
import Login from './components/login';
import Cookies  from 'js-cookie';
import SuggestionList from './components/suggList';

export default function App() {
  const path = "http://localhost:4000/api";

  const [user, setUser] = useState({username: "", userid: ""});
  const [conn, setConn] = useState(false);
  const [products, setProducts] = useState([]);

  const request = () => {
    let userCookie = Cookies.get("user");
    if (userCookie) {
      userCookie = JSON.parse(userCookie);
      const connOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({userid: userCookie.userid, connid: userCookie.connid})
      };
      fetch(`${path}/connection/check`, connOptions)
      .then(resp => resp.json())
      .then(connection => {
        if (connection.res) {
          const clientOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({userid: userCookie.userid})
          };
          fetch(`${path}/client/connect`, clientOptions)
          .then(resp => resp.json())
          .then(user => {
            setUser({username: user.username, userid: user.userid});
            setConn(true);
          });
        }
      });
    }
  }

  useEffect(() => {
    request();
    const userid = Cookies.get("user") != null ? JSON.parse(Cookies.get("user")).userid : null;
    const productsOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({userid: userid })
    };
    fetch("http://localhost:4000/api/product/get", productsOptions)
    .then(res => res.json()).then(products => setProducts(products));

    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogout = () => {
    if (user.username !== "" && user.userid !== "") {
      const connOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({connid: JSON.parse(Cookies.get("user")).connid})
      };
      fetch(`${path}/connection/logout`, connOptions);
      Cookies.remove("user");
      setUser({userid: "", username: ""});
      setConn(false);
    }
  }

  return (
    <div className="App">
      username : {user.username}, id : {user.userid}
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Main handleLogout={() => handleLogout()} />} userid={user.userid} serverPath={path} />
          <Route path='/register' element={<Register path={path} />} />
          <Route path='/login' element={<Login path={path} request={() => request()} />} />
        </Routes>
      </BrowserRouter>
      {conn && <SuggestionList path={path} userid={user.userid}/>}
      {products.map(product => <p>{product.name}</p>)}
    </div>
  );
}


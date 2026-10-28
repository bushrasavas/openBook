import {Routes, Route, BrowserRouter as Router} from "react-router-dom"
import App from "./App";
import Registration from "./components/Registration";
import Home from "./components/Home"
import Login from "./components/Login"
import About from "./components/About/About"
import Contact from "./components/Contact"
import MyBooks from "./components/MyBooks/MyBooks"
import BorrowedBooks from "./components/BorrowedBooks"
import Profile from "./components/UserProfile/Profile";
import Books from "./components/Books/Book";
import Revision from "./components/Revision/Revision";

export default function AppRouter(){
  return (
  <Router>
    <Routes>
        <Route path={'/'} element={<App/>}>
          <Route index element={<Home />} />
          <Route path={'/about'} element={<About />}/>
          <Route path={'/contact'} element={<Contact />}/>
          <Route path={'/register'} element={<Registration/>}/>
          <Route path={'/login'} element={<Login />}/>
          <Route path={'/mybooks'} element={<MyBooks />}/>
          <Route path={'/profile'} element={<Profile />}/>
          <Route path={'/book'} element={<Books />}/>
          <Route path={'/revision'} element={<Revision />}/>
        </Route>
      </Routes>
    </Router>
  )
}
import './App.css';
import {createBrowserRouter, RouterProvider, Route, createRoutesFromElements} from "react-router-dom"
import User from './components/getuser/User.jsx';
import Add from './components/adduser/Add.jsx';
import Update from './components/updateuser/Update.jsx';
function App() {

    const route = createBrowserRouter(
      createRoutesFromElements(
        <Route>
        <Route path='/' element={<User/>}/>
        <Route path='/add' element={<Add/>}/>
        <Route path='/edit/:id' element={<Update/>}/>
        </Route>
      )
    ) 

  // const route = createBrowserRouter([
  //   {
  //     path: "/",
  //     element:<fetchuser/>,
  //   },
  //   {
  //     path:"add",
  //     element:"User Add Page"
  //   },
  //   {
  //     path:"edit",
  //     element:"Update User Page"
  //   }
  // ])

  return (
    <div className="App">
    <RouterProvider router={route}></RouterProvider>
    </div>
  );
}

export default App;

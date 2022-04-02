import React,{useState} from 'react' 
import AddPerson from './Components/AddPerson';
import Connections from './Components/Connections';
import {Switch,Route} from 'react-router-dom'
import Navbar from './Components/Navbar';
import AddRelation from './Components/AddRelation';
import Relation from './Components/Relation'; 
function App() {
  if(!localStorage.getItem("users")){
    localStorage.setItem("users",JSON.stringify({}))
    localStorage.setItem("connections",JSON.stringify({}))
    localStorage.setItem("relations",JSON.stringify({}))
  }
  const [getData,setData]=useState({users:JSON.parse(localStorage.getItem("users")),connections:JSON.parse(localStorage.getItem("connections")),relations:JSON.parse(localStorage.getItem("relations"))})

  return(
    <>
    <Navbar getData={getData} setData={setData} />
    <Switch>
    <Route exact path={"/addperson"}>
      <AddPerson setData={setData} />
    </Route>
    <Route exact path={"/updaterelation"}>
      <AddRelation setData={setData} />
    </Route>
    <Route exact path={"/getrelationdegree"}>
      <Relation />
    </Route>
    <Route exact path="/">
    {localStorage.getItem("users")!=='{}'?<Connections users={getData.users} connections={getData.connections} relations={getData.relations}  />:<div style={{display:"flex",justifyContent:"center",alignItems:"center",fontSize:30,margin:10,height:"60%"}}>No Person Added</div>}
    </Route>
    </Switch>
    </>
  )
}

export default App;

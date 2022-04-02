import React,{useState} from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Multiselect from 'multiselect-react-dropdown';
import {Button, Grid} from "@mui/material"
import { useHistory } from 'react-router-dom';
export default function AddRelation(props) {
  const history=useHistory()
  let users=JSON.parse(localStorage.getItem("users"))
  const [getName,setName]=useState("")
  const [getRel,setRel]=useState({})
  const [getRelation,setRelation]=useState("friend")
  let options=[]
  for(let key of Object.keys(users)){
      if(key!==getName)
    options.push({name:users[key],id:key})
  }
  const handleChange=(e)=>{
      if(getName!==""){
          setRelation(e.target.value)
      }
      else{
          alert("Select Person First")
          setRelation("friend")
      }
  }
  const handleSelect=(a,b)=>{
      if(getName===""){
          alert("Select Person Name First")
      }
    let preResult=getRel
    let res={}
    for(let item of a){
      res[item.id]={name:item.name,relation:preResult[item.id]===undefined?getRelation:preResult[item.id].relation}
    }
    setRelation("friend")
    setRel(res)
  }
  const handleRemove=(a,b)=>{
    let preResult=getRel
    delete preResult[b.id]
    setRel(preResult)
  }
  const handleClick=()=>{
    if(getName===""){
      alert("Name Required")
    }
    else{
    let newNode=parseInt(getName)
    let connections=JSON.parse(localStorage.getItem("connections"))
    let relations=JSON.parse(localStorage.getItem("relations"))
    let user_connection=connections[newNode]
    for(let key of user_connection){
        let i=connections[key].indexOf(newNode)
        connections[key]=connections[key].filter((item)=>{
            return item!==newNode;
        })
        relations[key]=relations[key].filter((item,index)=>{
          return index!==i;
      })
    }
    if(Object.keys(getRel).length===0){
      connections[newNode]=[]
      relations[newNode]=[]
    }
    else{
      let con=[]
      let rel=[]
      for(let key in getRel){
          con.push(parseInt(key))
          rel.push(getRel[key].relation)
          connections[key].push(newNode)
          relations[key].push(getRel[key].relation)
      }
      connections[newNode]=con
      relations[newNode]=rel
    }
    localStorage.setItem("users",JSON.stringify(users))
    localStorage.setItem("connections",JSON.stringify(connections))
    localStorage.setItem("relations",JSON.stringify(relations))
    props.setData({users,connections,relations})
    history.replace({pathname:"/"})
    }
  }
  return (
    <div style={{width:"95%",display:"flex",flexDirection:"row",justifyContent:'center',alignItems:"center",margin:10,marginTop:50}}>
      <Grid style={{width:"50%",border:"1px solid black",padding:10}} containor>
        <Grid item xs={12} style={{margin:10,fontSize:25,fontWeight:"bold"}}>
          Update Person Relation
        </Grid>
        <Grid item xs={12} style={{margin:10}}>
        <FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">Person</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    label="Person"
    onChange={(e)=>{setName(e.target.value)}}
    value={getName}
  >
    {Object.keys(users).map((item)=>{
      return(
        <MenuItem value={item}>{users[item]}</MenuItem>    
      )
    })}
  </Select>
</FormControl>
        </Grid>
        <Grid item xs={12} style={{margin:10}}>
        <FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">Relation</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    label="Relation"
    onChange={handleChange}
    value={getRelation}
  >
    <MenuItem value={"friend"}>Friend</MenuItem>
    <MenuItem value={"brother"}>Brother</MenuItem>
    <MenuItem value={"other"}>Other</MenuItem>
  </Select>
</FormControl>
        </Grid>
        <Grid style={{margin:10}} item xs={12}>
        <Multiselect
options={options} 
onSelect={handleSelect} 
onRemove={handleRemove}
displayValue="name"
placeholder="Relation With"
/>
        </Grid>
        <Grid xs={12} item style={{margin:10}}>
            <Button onClick={handleClick} variant="outlined" color="primary" fullWidth>Update</Button>
        </Grid>
      </Grid>
    </div>
  );
}

import React,{useState} from 'react';
import InputLabel from '@mui/material/InputLabel';
import { Network, Node, Edge } from 'react-vis-network';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {Button} from "@mui/material"
export default function Relation() {
  let users=JSON.parse(localStorage.getItem("users"))
  const [getName1,setName1]=useState("")
  const [getName2,setName2]=useState("")
  const [getShow,setShow]=useState(false)
  const handleClick=()=>{ 
      setShow(true)
  }
  return (
    <div style={{height:"90%"}}>
      <div style={{display:"flex",justifyContent:"space-evenly",margin:10}}>
        <div style={{width:"30%"}}>
        <FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">Person 1</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    label="Person 1"
    onChange={(e)=>{setName1(e.target.value);setShow(false)}}
    value={getName1}
  >
    {Object.keys(users).map((item)=>{
      if(item!==getName2){

        return(
          <MenuItem value={item}>{users[item]}</MenuItem>    
          )
        }
        return(
          <></>
        )
    })}
  </Select>
</FormControl>
        </div>
        <div style={{width:"30%"}}>
        <FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">Person 2</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    label="Person 2"
    onChange={(e)=>{setName2(e.target.value);setShow(false)}}
    value={getName2}
  >
    {Object.keys(users).map((item)=>{
      if(item!==getName1){

        return(
          <MenuItem value={item}>{users[item]}</MenuItem>    
          )
        }
        else{
          return(
            <></>
          )
        }
    })}
  </Select>
</FormControl>
        </div>
        <div style={{width:"20%"}}>
            <Button onClick={handleClick} fullWidth color="primary" variant="outlined">Get</Button>
        </div>
      </div>
      {getShow && GetPath(getName1,getName2)}
    </div>
  )
}


function GetPath(node1,node2){
  node1=parseInt(node1)
  node2=parseInt(node2)
  let connections=JSON.parse(localStorage.getItem("connections"))
  let users=JSON.parse(localStorage.getItem("users"))
  let relations=JSON.parse(localStorage.getItem("relations"))
  let isVisited=[]
  for(let i=0;i<Object.keys(connections).length;i++){
    isVisited.push(false)
  }
  let result=FindPath(node2,connections,isVisited,node1)
    result=result.map((item)=>{
      return item.reverse()
    })
  const ShowNetWork=(props)=>{
    const options = {
      layout: {
        hierarchical: false
      },
      edges: {
        color: "#000000"
      }
    };
    return(
      <div style={{height:"60%",width:"100%"}}>
        <div style={{display:"flex",justifyContent:"center",fontSize:20}}>

        { 
        props.path.map((item,index)=>{
          
          return(
            <div>
                {index!==props.path.length-1?`${users[item]} ->`:users[item]}
              </div>
            )
          })
          
        }
        </div>
        <Network options={options} >
      { 
        props.path.map((item,index)=>{
          return(
              <Node id={`path${props.index}${item}`} label={`${users[item]}(${index})`}  />
            )
          })
          
        }
        {
          props.path.map((item,index)=>{
            if(index===0){
              return(<></>)
            }
            return(
                <Edge direction={true} id={`edge${props.index}${item}${props.path[index-1]}`} label={relations[props.path[index-1]][item]} to={`path${props.index}${item}`} from={`path${props.index}${props.path[index-1]}`}  />
              )
            })
        }
        </Network>
            </div>
    )
  }
    return(
      <div style={{height:"100%"}}>
      {
        result.length>0?result.map((item,index)=>{
          return(
            <ShowNetWork path={item} index={index} key={index} />
          )
        }):<div style={{display:"flex",justifyContent:"center",alignItems:"center",fontSize:30,margin:10,height:"60%"}}>No Relation Found</div>
      }
      </div>
    )
}

function FindPath(node2,connection,isVisited,current){
     if(current===node2){
       return [[node2]]
     }
     else{
        let con=connection[current]
        isVisited[current]=true
        let result=[]
        for(let node of con){
          if(!isVisited[node]){
              let res=FindPath(node2,connection,isVisited,node);
              for(let val of res){
                val.push(current)
                result.push(val)
              }
          }
        }
        isVisited[current]=false
        return result;
     }
}
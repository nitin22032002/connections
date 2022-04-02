import React from 'react'
import { Network, Node, Edge } from 'react-vis-network';
function Connections(props) {
  let users=props.users
  let connections=props.connections
  let relations=props.relations
  console.log(users)
  console.log(connections)
  console.log(relations)
  const CreateConnection=()=>{
      return(
        <Network>
          {
            Object.keys(users).map((key)=>{
              return(
                <Node id={key} label={`${users[key]}(${key})`}  />
              )
            })
          }
          {
            Object.keys(connections).map((item)=>{
              return(
                connections[item].map((node,index1)=>{
                  
                  return( 
                    parseInt(node)>item || connections[node]===undefined ?<Edge label={relations[item][index1]} id={`e${item}${node}`} from={item} to={node}/>:<></>
                  )
                })
              )
            })
          }
        </Network>
      )
  }
  return (
    <div style={{height:"90%",width:"100%"}}>
   <CreateConnection/>
    </div>
  );
}

export default Connections;

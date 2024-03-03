
// import {useEffect, useRef, useState} from 'react'
// import './App.css';

// import {io} from 'socket.io-client'

// function App() {

// // const [name,setName] =useState('')
// // const [roomId,setRoomId]=useState(null)
// const localStreamRef =useRef(null)
// const remoteStreamRef =useRef(null)
// const [remoteId,setRemoteId]=useState(null)
// let sendVideo

//   const socket = io('http://localhost:3001', {
//     transports: ['websocket', 'polling', 'flashsocket'],
//     cors: {
//         origin: "http://localhost:3001",
//         credentials: true
//     },
//     withCredentials: true
// });



// const init=()=>{
 


//   const peerConnection=new RTCPeerConnection({
//     iceServers:[
//       {
//         urls:["stun:stun1.l.google.com:19302",
//             "stun:global.stun.twilio.com:3478"
//       ]
//       }
//     ]
//   })
//   try {
//     navigator.mediaDevices.getUserMedia({
//      audio:true,
//      video:true
//     }).then(stream=>{
//      if(localStreamRef.current){
//       localStreamRef.current.srcObject=stream
//      }
  
//       peerConnection.addTrack(stream.getTracks()[0],stream)
    
//     })


//   socket.on('existing_participants',data=>{
//     console.log( "join",data)
//     createOffer()
//   })

//   socket.on('user-joined',data=>{
//     console.log(data.name,data.id)
//     setRemoteId(data.id)
//   })
//   const createOffer=()=>{
//     // console.log('create offer started')
//     peerConnection.createOffer({
//       offerToReceiveAudio:true,
//       offerToReceiveVideo:true,
//       iceRestart:true
//     }).then(sdp=>{
//        peerConnection.setLocalDescription(new RTCSessionDescription(sdp))
//        socket.emit("offer",sdp)
//     })
//   }

//   socket.on("getOffer",sdp=>{
//     console.log("getOffer",sdp)
//     createAnswer(sdp)
//   })



//   const createAnswer=(sdp)=>{
//     peerConnection.setRemoteDescription(sdp).then(()=>{
//       // console.log("set remote desc success")
//     })
//     peerConnection.createAnswer({
//       offerToReceiveAudio:true,
//       offerToReceiveVideo:true
//     }).then((sdp)=>{
//       // console.log("create answer success")
//       peerConnection.setLocalDescription(sdp)
//       socket.emit("answer",sdp)
//     })
//   }

//   socket.on("getAnswer",(sdp)=>{
//     console.log("get answer",sdp)
//     peerConnection.setRemoteDescription(sdp)
    
//   })

//   peerConnection.onicecandidate=e=>{
//     if(e.candidate){
//       // console.log('icecandidate found',e.candidate)
//       socket.emit("candidate",e.candidate)
//     }
//   }
//   peerConnection.onconnectionstatechange=(e)=>{
//     console.log(e)
//   }

//   peerConnection.ontrack=(e)=>{
//     console.log("remote track adding successful")
//     console.log("got tracks from remote peer",e.streams[0])
    
//     remoteStreamRef.current.srcObject=e.streams[0]
//     console.log("got tracks from remote peer",e.streams[0])
  
//   }

//   peerConnection.onnegotiationneeded=()=>{
//     peerConnection.createOffer({
//       offerToReceiveAudio:true,offerToReceiveVideo:true
//     }).then((offer)=>{
//       socket.emit('negoneeded',{offer,to:remoteId})
//     })
//   }

//   const incomingNego=({from,offer})=>{
//    peerConnection.createAnswer(new RTCSessionDescription(offer)).then((ans)=>{
//     console.log("second answer")
//     socket.emit("negodone",{to:from,ans})
//    })
//   }
//   socket.on("negoneeded",incomingNego)
  
//   socket.on("negofinal",async({ans})=>{
//    await peerConnection.setLocalDescription(new RTCSessionDescription(ans))
//   })

//   socket.emit('join',{
//     roomId:999,
//     name:"helloguys@gmail.com"
//   })

//   socket.on("getCandidate",(candidate)=>{
//     peerConnection.addIceCandidate(new RTCIceCandidate(candidate)).then(()=>{
//       console.log("ice candidate adding successful",candidate)
//     })
//   })

//   } catch (error) {
//     console.log(error)
//   }
// }

//  useEffect(()=>{

// socket.on('connect',()=>{
//   console.log("hello from signaling server")

// })

//  },[socket])

 
 

//   return (
//     <div className="App">
     
//     {remoteId?<p>connected</p>:<p>no one in room except you</p>}
        
       
//         {/* <input type='text' placeholder='enter name' onChange={(e)=>setName(e.target.value)}/> */}
//         {/* <input type='text' placeholder='enter roomId' onChange={(e)=>setRoomId(e.target.value)}/> */}
//         <button onClick={init}>calllllll</button>
      
//      <video style={{width:200,height:300}} ref={localStreamRef} autoPlay playsInline/>
//      <video style={{width:200,height:300}} ref={remoteStreamRef} autoPlay playsInline/>
//     </div>
//   );
// }

// export default App;

import { Routes, Route } from "react-router-dom";
import "./App.css";
import LobbyScreen from "./screens/Lobby";
import RoomPage from "./screens/Room";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LobbyScreen />} />
        <Route path="/room/:roomId" element={<RoomPage />} />
      </Routes>
    </div>
  );
}

export default App;
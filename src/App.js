import React from 'react';
import './App.css';
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTrash, faArrowUp, faArrowDown}  from "@fortawesome/free-solid-svg-icons";
import ReactPlayer from 'react-player'


class App extends React.Component {
  constructor(){
    super()
    this.state={
      videoList:[],
      isAddActive: false,
      url:"",
      playing:-1,
      showError:false,
    }
  }

  setAddActive = () =>{
    this.setState((prevstate)  => ({
      isAddActive: !prevstate.isAddActive
    }))
  }

  handleURLChange = (e) => {
      this.setState({
        showError:false,
        url:e.target.value,
      })
  }

  AddUrl = () => {
    const {url}= this.state.url;
    var p = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    if(this.state.url.match(p)) {
      var arr= this.state.videoList;
      arr.push(this.state.url);
      this.setState ({
        isAddActive:false,
        videolist:arr,
        url:""
      })
      if(this.state.playing===-1){
        this.setState({
          playing:0,
        })
      }
    }
    else {
      this.setState({
        url:"",
        showError:true,
      })
    }
  }

  deleteItem = (index) => {
    var arr= this.state.videoList;
    arr.splice(index,1)
    this.setState({
      videoList:arr,
    })
  }


  moveUp = (index) => {
    var arr= this.state.videoList;
    if(index===0){ return; }
    var temp= arr[index];
    arr[index]=arr[index-1];
    arr[index-1]=temp;
    this.setState({
      videoList:arr,
    })
  }


  moveDown = (index) => {
    var arr= this.state.videoList;
    if(index===arr.length-1){ return; }
    var temp= arr[index];
    arr[index]=arr[index+1];
    arr[index+1]=temp;
    this.setState({
      videoList:arr,
    })
  }

  onVideoEnd = () => {
    const {videoList,playing} = this.state;
    var arr= videoList;
    arr.splice(playing,1);
    var len= arr.length;
    if(len>0){
      this.setState({
        playing:0,
        videoList:arr,
      })
    }else {
      this.setState ({
        palying:-1,
        videoList:arr
      })
    }
   
  }

  render () {
    const {isAddActive,videoList,playing, showError} = this.state;
    return (
      <div className="container">
        <div className="row">
              <div className="PlayList col-sm-5">
                  <Button variant="info" className="add" onClick={this.setAddActive}> + Add new video </Button>{' '}
                  {isAddActive ? 
                  <div className="urlinput">
                    <input type="text" className= "inputbox" value={this.state.url} name="url" onChange={this.handleURLChange}/>
                    <span><Button variant="danger" onClick={this.AddUrl}>Done</Button> </span>  
                  </div>: "" }
                  {showError ? <h6 style={{color:'red'}}> Please enter a valid youtube url!</h6>:null}
                  <div className="videolist">
                      {videoList.map((item,index) => {
                        return(
                          <div className="videoitem row  ml-0 mb-2">
                              <span className="col-sm-9">{item}</span>
                              <FontAwesomeIcon className="delete col-sm-1 pl-1 pr-1 mt-2" onClick={() => this.deleteItem(index)} icon={faTrash}/>
                              <FontAwesomeIcon className="moveup col-sm-1 p1-1 pr-1 mt-2" onClick={() => this.moveUp(index)} icon={faArrowUp}/>
                              <FontAwesomeIcon className="movedown col-sm-1 pl-1 pr-1 mt-2" onClick={() => this.moveDown(index)} icon={faArrowDown}/>
                            
                          </div>
                        )
                      })}
                  </div>
              </div>
              <div className="col-sm-7">
                  {playing>=0 ? <ReactPlayer controls className="player" url={this.state.videoList[playing]} onEnded={this.onVideoEnd}/> : ""}
              </div>
          </div>
      </div>
    );
  }
  
}

export default App;

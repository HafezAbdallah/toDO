import React from 'react';
import API from '../../api/postsApi';
import './posts.css';
class ToDo extends React.Component
{

        constructor(props)
        {
            super(props);      
            this.state={
                posts:[],
                pageSize:10,
                pageindex:0,
                numberOfPages:0,    
                postTitle:"",
                postBody:"",            
            }      
            this.addPost=this.addPost.bind(this);
        }
        componentWillMount()
        {
            API.getPosts().then((res)=>{
                this.setState({
                    posts:res.data,
                    numberOfPages:Math.ceil( res.data.length/this.state.pageSize),                
                })
            })
        }

        nextPage=()=>{

            this.setState({
                pageindex:this.state.pageindex+1<this.state.numberOfPages?this.state.pageindex+1:0,//go back to page 1
            })
        }
        prevPage=()=>{

            this.setState({
                pageindex:this.state.pageindex>0?this.state.pageindex-1:this.state.numberOfPages-1,//go back to page 1
            })
        }
        textareaChanged=(event)=>{

            this.setState({postBody:event.target.value})
        }
        addPost()
        {
            if(this.state.postBody!==""&&this.state.postTitle!=="")
            {
                let post={
                    body:this.state.postBody,
                    title:this.state.postTitle,
                    userId:1,
                }
                API.addPost(post).then((res)=>{

                    let posts=[...this.state.posts];
                    posts.push(res.data.item);
                    posts[posts.length-1].id=posts.length-1;//res.data.id;  // this is wrong here because the api only return 101
                    this.setState({
                        posts,
                        numberOfPages:Math.ceil( posts.length/this.state.pageSize),
                        postBody:"",
                        postTitle:""
                    });

                })
            }
        }
        render(){
            let {pageSize,pageindex}=this.state;
            let start=pageindex*pageSize;
            return(
            <div>
                <div className="contianer">
                    <label>Post's Page {this.state.pageindex+1}</label>
                    {this.state.posts.slice(start,start+pageSize).map((item,index)=>{
                        return(
                        <div key={item.id} className="listItem">
                           <li> <span className="titleColor">{item.title}:</span> {item.body}</li>
                        </div>
                        )

                    })
                    }
                        <div>
                            <span>Tile </span>
                            <input value={this.state.postTitle} className="titleInput" onChange={(event)=>this.setState({postTitle:event.target.value})}></input>
                            <textarea  value={this.state.postBody} className="textArea" placeholder="Body...." onChange ={this.textareaChanged}></textarea>
                            <button className="addButton" onClick={this.addPost}>Add</button>
                        </div>
                    </div>
                    <div className="controls">
                        <button onClick={this.prevPage}>Pervious</button>
                        <button onClick={this.nextPage}>Next</button>
                    </div>
            </div>
            )
        }        
}
export default ToDo;
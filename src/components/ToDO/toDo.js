import React from 'react';
import API from '../../api/toDoApi'
class ToDo extends React.Component
{

        constructor(props)
        {
            super(props);      
            this.state={
                toDoItems:[],
                pageSize:10,
                pageindex:0,
                numberOfPages:0,                
            }      
        }
        componentWillMount()
        {
            API.getToDoListItems().then((res)=>{
                this.setState({
                    toDoItems:res.data,
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
        checkItem=(event,item)=>{        
            let checked=event.target.checked;
            item.completed=checked;
            let newItems=[...this.state.toDoItems];
            newItems[item.id-1]=item;// this only works because the list is orderd with id as index
            this.setState({toDoItems:newItems})
            API.setItemCheckedState(item).then(()=>{
                
                console.log('updated')
            })

        }
        render(){
            let {pageSize,pageindex}=this.state;
            let start=pageindex*pageSize;
            return(
            <div>
                <div style={{display:'flex',flexDirection:'column',alignItems:'center',}}>
                    <label>Page {this.state.pageindex+1}</label>
                    {this.state.toDoItems.slice(start,start+pageSize).map((item,index)=>{
                        return(
                        <div key={item.id} style={{width:'50%'}}>

                        <input  type="checkbox" onChange={(event)=>this.checkItem(event,item)} checked={item.completed}/>
                           <span style={{textDecoration:item.completed?'line-through':null}}> {item.title}</span>
                        </div>
                        )

                    })
                    }
                    </div>
                    <div style={{display:'flex',justifyContent:'center',marginTop:20}}>
                        <button onClick={this.prevPage}>Pervious</button>
                        <button onClick={this.nextPage}>Next</button>
                    </div>
            </div>
            )
        }        
}
export default ToDo;
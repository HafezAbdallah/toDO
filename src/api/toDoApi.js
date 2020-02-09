import axios from 'axios'


const toDo={
  getToDoListItems:() =>{ 

        return axios.get('https://jsonplaceholder.typicode.com/todos')

 },

 setItemCheckedState:(item)=>{

    return axios.put('https://jsonplaceholder.typicode.com/todos/'+item.id,{item})
 }
}

export default toDo;
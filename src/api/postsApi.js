import axios from 'axios'


const posts={
  getPosts:() =>{ 

        return axios.get('https://jsonplaceholder.typicode.com/posts')

 },

 addPost:(item)=>{

    return axios.post('https://jsonplaceholder.typicode.com/posts',{item})
 }
}

export default posts;
import NavBar from "../components/NavBar"
import Footer from "../components/Footer"
import {BiEdit} from 'react-icons/bi'
import {MdDelete} from 'react-icons/md'
import Comment from '../components/Comment'
import {useParams,useNavigate} from 'react-router-dom'
import axios from 'axios'
import {URL,IF} from '../url'
import { UserContext } from '../context/UserContext'
import { useState,useEffect ,useContext} from "react"
import Loader from "../components/Loader"
const PostDetails = () => {
  const postId=useParams().id
  const {user}=useContext(UserContext)
  const [comments,setComments]=useState([])
  const [comment,setComment]=useState("")
  //console.log(postId)
  const [post,setPost]=useState({})
  const [loader,setLoader]=useState(false)
  const navigate=useNavigate()
  const fetchPost=async()=>{
    setLoader(true)
    try{
     // console.log(yes)
      const res= await axios.get(URL+'/api/posts/'+postId)
      //console.log(res.data)
      setPost(res.data)
      setLoader(false);
    }
    catch(err){
      console.log(err)
      setLoader(true)
    }
  }
  const handleDeletePost=async()=>{
    try{
       const res=await axios.delete(URL+"/api/posts/"+postId,{withCredentials:true})
       navigate("/")
    }
    catch(err){
       console.log(err)
    }
  }
  const fetchPostComments=async()=>{
    try{
       const res=await axios.get(URL+"/api/comments/post/"+postId)
       setComments(res.data)
       //console.log(res.data)
    }
    catch(err){
      console.log(err)
    }
  }
  const postComment=async(e)=>{
       e.preventDefault()
       try{
        const res=await axios.post(URL+"/api/comments/create",{comment,author:user.username,postId,userId:user._id},{withCredentials:true})
          setComment("")
          fetchPostComments()
       }
       catch(err){
        console.log(err)
       }
  }
  useEffect(()=>{
    fetchPost()
  },[postId])

  useEffect(()=>{
    fetchPostComments()
  },[postId])

  return (
    <div>
        <NavBar/>
        {loader?<div className="h-[80vh] flex justify-center items-center w-full"><Loader/></div>:
        <div className="px-8 mt-8 md:px-[200px]">
        <div className="flex items-center justify-between">
            <h1 className="text-black text-2xl md:text-3xl font-bold ">{post.title}</h1>
            {user?._id==post?.userId && <div className="flex items-center justify-center space-x-2">
            <p className="cursor-pointer" onClick={()=>navigate("/edit/"+postId)}><BiEdit/></p>
            <p className="cursor-pointer" onClick={handleDeletePost}><MdDelete/></p>
            </div>}
        </div>
        <div className="flex mt-2 md:mt-4 items-center justify-between">
            <p>@{post.username}</p>
            <div className="flex space-x-2">
            <p>{new Date(post.updatedAt).toString().slice(0,15)}</p>
                <p>{new Date(post.updatedAt).toString().slice(16,24)}</p>
            </div>
        </div>
        <img src={IF+post.photo} alt=" " className="w-100% h-[400px] mx-auto mt-8"></img>
        <p className="mx-auto mt-8">{post.desc}</p>
        <div className="flex items-center mt-8 space-x-4 font-semibold">
          <p>Categories:</p>
          <div className="flex justify-center items-center space-x-2">
          {post.categories?.map((c,i)=>(
            <div key={i} className="bg-gray-300 rounded-lg px-3 py-1">
              {c}  
            </div>
          ))}
          </div>
        </div>
        <div className="flex flex-col mt-4">
           <h3 className="mt-6 mb-4 font-semibold">Comments:</h3>
           {comments?.map((c)=>(
          <Comment key={c._id} c={c} post={post}/>
         ))}
        </div>
           {/*write a comment*/}
           <div className="w-full flex flex-col mt-4 md:flex-row">
            <input onChange={(e)=>setComment(e.target.value)} value={comment} type="text" placeholder="write a comment" className="md:w-[80%] outline-none py-2 px-4 mt-4 md:mt-0 bg-gray-100"/>
            <button onClick={postComment} className="bg-black text-sm text-white px-2 py-2 md:w-[20%] mt-4 md:mt-0">Add a comment</button>
           </div>
        </div>}
        <Footer/>
    </div>
  )
}

export default PostDetails;
import {IF} from '../url'

const HomePosts = ({post}) => {
   // console.log("passesd")
  return (
   <div className="w-full flex mt-8 space-x-4">
    {/*left*/}
    <div className="w-[20%] h-[170px] flex justify-center items-center mr-20">
        <img src={IF+post.photo} alt=" " className="h-full w-full object-cover"></img>
    </div>
    {/*right*/}
    <div className="flex flex-col w-[65%] mr-3">
        <h1 className="text-xl font-bold md:mb-2 mb-1 md:text-2xl">
            {post.title}
        </h1>
        <div className="flex mb-2 text-sm font-semibold text-gray-500 items-center justify-between md:mb-4">
            <p>{post.username}</p>
            <div className="flex space-x-2">
                <p>{new Date(post.updatedAt).toString().slice(0,15)}</p>
                <p>{new Date(post.updatedAt).toString().slice(16,24)}</p>
            </div>
        </div>
        <p className="text-sm md:text-lg">{post.desc.slice(0,200)+"...Readmore"} </p>
    </div>
   </div>
  )
}

export default HomePosts
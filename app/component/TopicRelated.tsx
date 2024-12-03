

interface TopicRelatedTypes{
  changeForLevel:(category:string)=>void;
  changeForTopic:(category:string)=>void;
}
const TopicRelated:React.FC<TopicRelatedTypes> = ({changeForLevel,changeForTopic}) => {
  return (
    <div className=" w-full text-left mt-10">
        <h1 className=" font-bold  text-gray-800">Enter topic or paste the content</h1>
        <textarea onChange={(e)=>{
          changeForTopic(e.target.value)
        }} rows={2} cols={5} placeholder="Start writing here"  name="topic" id="" className=" border-2 border-gray-600 text-sm w-full rounded-md p-3" />

        <div>
            <h1 className=" font-bold  text-gray-800">Difficulty Level</h1>
            <select onChange={(e)=>{
              changeForLevel(e.target.value)
            }} name="difficulty" id="" className="border-2 border-gray-600 text-sm w-full rounded-md p-3">
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
            </select>
        </div>
    </div>
  )
}

export default TopicRelated
import axios from "axios";
import { useState,useContext, useEffect } from "react";
import UserContext from "../Constants/UserContext";
import { format,startOfWeek,endOfWeek,eachDayOfInterval ,subDays ,addDays} from "date-fns";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
const Slider=(...props)=>{
    const [week,setWeek]=useState(props[0].data);
    const [date,setDate]=useState(props[0].date);
    const {UserName}=useContext(UserContext);
    const [data,setData]=useState();
    const getPrevWeek = (e) => {
        e.preventDefault();
        const prevDay=subDays(startOfWeek(date),1);
        const daysInWeek =eachDayOfInterval({
            start: startOfWeek(subDays(startOfWeek(date),1)),
            end: endOfWeek(subDays(startOfWeek(date),1)),
          });
          setDate(prevDay);
        setWeek(daysInWeek);
      };
      const getNextWeek = (e) => {
        e.preventDefault();
        const nextDay=addDays(endOfWeek(date),1);
        const daysInWeek =eachDayOfInterval({
            start: startOfWeek(addDays(endOfWeek(date),1)),
            end: endOfWeek(addDays(endOfWeek(date),1)),
          });
          setDate(nextDay);
        setWeek(daysInWeek);
      };
    useEffect(()=>{
        axios.get(`http://localhost:4000/api/diary/Media/?username=${UserName}&month=${format(date,"M")}&year=${format(date,"y")}&day=${format(date,"d")}`)
        .then((res)=>{
            console.log(res)
            setData(res.data.media[0]);
            console.log(data)
        }
        )
        .catch(err=>console.log(err))
    },[date])

    return(
        <div>
            <div className="">
            < div className=" flex justify-between mt-8 place-items-center bg-white">
            <ChevronLeftIcon
                className="w-6 h-6 cursor-pointer"
                onClick={getPrevWeek}
              />
              
            {week.map((day, idx) => {
              return (
                <div key={idx} className={` w-20 h-20 m-2 p-4 px-5`}>
                  <button
                    className={`cursor-pointer flex items-center justify-center font-semibold h-8 w-6 rounded-full  hover:text-blue-500 ${format(date,"d")===format(day, "d") && "text-red-500"}`}
                    onClick={(e)=>{
                        setDate(day);
                    }}
                   >
                    {format(day, "d")}/
                    {format(day, "M")}/
                    {format(day, "y")}
                  </button>
                </div>
              );
            })}
            
            <ChevronRightIcon
                className="w-6 h-6 cursor-pointer"
                onClick={getNextWeek}
              />
          </div>
          { data===undefined?<div></div>:
            <div>
            <div className="my-2 p-2 items-center bg-white">
                <h1>{data.Title}</h1>
            </div> 
            <div className="flex">
              <div className="w-1/2 p-2 m-2">{data.content}</div>
              <div ><img src={data.media[0].url}/></div>
              </div>
            </div>
          }
          </div>
        </div>
    );
}
export default Slider;
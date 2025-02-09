import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { format, endOfWeek, endOfMonth, endOfYear, isSameDay } from 'date-fns';
import UserContext from "../Constants/UserContext";
const Memories = () => {
  const [weeklyData, setWeeklyData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [yearlyData, setYearlyData] = useState([]);
  const [displayData, setDisplayData] = useState([]);
  const {UserName}=useContext(UserContext);
  useEffect(() => {
    const today = new Date();

    const fetchWeeklyData = async () => {
      const endOfWeekDate = endOfWeek(today);
      if (isSameDay(today, endOfWeekDate)) {
        const formattedDate = format(endOfWeekDate, 'yyyy-MM-dd');
        const response = await axios.get(`http://localhost:4000/api/diary/Media/?username=${UserName}`);
        setWeeklyData(response.data);
      }
    };

    const fetchMonthlyData = async () => {
      const endOfMonthDate = endOfMonth(today);
      if (isSameDay(today, endOfMonthDate)) {
        const formattedDate = format(endOfMonthDate, 'yyyy-MM-dd');
        const response = await axios.get(`http://localhost:4000/api/diary/Media/?username=${UserName}`);
        setMonthlyData(response.data);
      }
    };

    const fetchYearlyData = async () => {
      const endOfYearDate = endOfYear(today);
      if (isSameDay(today, endOfYearDate)) {
        const formattedDate = format(endOfYearDate, 'yyyy-MM-dd');
        const response = await axios.get(`http://localhost:4000/api/diary/Media/?username=${UserName}`);
        setYearlyData(response.data);
      }
    };

    fetchWeeklyData();
    fetchMonthlyData();
    fetchYearlyData();
  }, []);

  useEffect(() => {
    setDisplayData(weeklyData);
  }, [weeklyData]);

  const displayImages = (data) => (
    <div className="flex flex-wrap">
      {data.map((item, index) => (
        <div key={index} className="w-1/3 p-2">
          <img src={item.url} alt="" className="w-full h-auto rounded-lg shadow-lg" />
        </div>
      ))}
    </div>
  );

  return (
    <div className="p-4">
      <div className="flex justify-around mb-4">
        <button onClick={() => setDisplayData(weeklyData)} className="bg-blue-500 text-white px-4 py-2 rounded">
          Weekly
        </button>
        <button onClick={() => setDisplayData(monthlyData)} className="bg-green-500 text-white px-4 py-2 rounded">
          Monthly
        </button>
        <button onClick={() => setDisplayData(yearlyData)} className="bg-red-500 text-white px-4 py-2 rounded">
          Yearly
        </button>
      </div>
      {displayImages(displayData)}
    </div>
  );
};

export default Memories;

import { h1 } from "../Constants/Utils";
import { useState,useEffect } from "react";
import Draggable from 'react-draggable/build/cjs/Draggable'
const Home =()=>{
    const [count, setCount] = useState(0);
  
    useEffect(() => {
        const timer = setInterval(() => {
          setCount((prevCount) => (prevCount + 1) % h1.length);
        }, 2000);
        return () => clearInterval(timer);
    }, []);
    return(
        <div className="justify-items-center ">

      <div className="h-60 " >
        <img src={h1[count]} alt="random" className="h-full w-full object-scale-down"/>
      </div>
        <div className="bg-transparent text-center p-2 rounded-xl shadow-xl shadow-grey m-2">
                <h1 className="font-bold">Encryption</h1>
                <p className="text-teal-900">Queryable Encryption gives you the ability to perform the following tasks:

Encrypt sensitive data fields from the client-side.

Store sensitive data fields as fully randomized encrypted data on the database server-side.

Run expressive queries on the encrypted data.

These tasks are all completed without the server having knowledge of the data it's processing.

Sensitive data is encrypted throughout its lifecycle - in-transit, at-rest, in-use, in logs, and backups - and only ever decrypted on the client-side, since only you have access to the encryption keys.

Queryable Encryption introduces an industry-first fast, searchable encryption scheme developed by the pioneers in encrypted search. The feature supports equality searches, with additional query types such as range, prefix, suffix, and substring planned for future releases.

You can set up Queryable Encryption using the following mechanisms:

Automatic Encryption: Enables you to perform encrypted read and write operations without you having to write code to specify how to encrypt fields.

Explicit Encryption: Enables you to perform encrypted read and write operations through your MongoDB driver's encryption library. You must specify the logic for encryption with this library throughout your application.

ConsiderationsWhen implementing an application that uses Queryable Encryption, consider the points listed in Security Considerations.</p>
            </div>
            <div className="flex justify-between bg-transparent shadow-xl rounded-xl m-2">
                <div className="bg-green-50 rounded-xl shadow-inner m-2 p-2 w-3/12 text-center">
                    <h1 className="font-serif font-semibold">calender</h1>
                    <p > It provides a visual representation of dates, enabling users to quickly see when entries have been made and to plan future ones. The calendar can highlight specific dates with entries, offer reminders for upcoming events or important dates, and facilitate easy access to past entries with just a click on the desired date. This feature enhances organization, making it simple for users to track their personal journaling habits and maintain a consistent diary.</p>
                </div>
                <div className="bg-green-50 rounded-xl shadow-inner m-2 p-2 w-3/12 text-center">
                    <h1 className="font-serif font-semibold">Album</h1>
                    <p> Users can upload images, categorize them into different albums, and add captions or notes to each photo. This feature provides a visual complement to written diary entries, allowing users to preserve and cherish their memories in a more vivid and engaging manner. The album feature supports easy navigation and sharing options, making it simple for users to look back on their favorite moments and share them with friends and family.</p>
                </div>
                <div className="bg-green-50 rounded-xl shadow-inner m-2 p-2 w-3/12 text-center">
                    <h1 className="font-serif font-semibold">Memories</h1>
                    <p> Users can write detailed descriptions, add photos, and tag dates or people associated with each memory. This feature serves as a digital scrapbook, helping users to capture important life events, milestones, and cherished experiences. With search and reminder functionalities, users can effortlessly recall past memories, celebrate anniversaries, and reflect on their life's journey over time. This feature enriches the diary experience by preserving the emotional and historical context of each entry.</p>
                </div>
            </div>
            <div className="flex bg-grey-400 items-center justify-center">
            <a href="https://www.instagram.com/sreeram_1004/"><img src="https://cdn-icons-png.flaticon.com/128/4138/4138124.png" alt="instagram" className="w-12 m-2 p-2"></img></a>
            <a href="https://x.com/sreeram78465497"><img src="https://cdn-icons-png.flaticon.com/128/5968/5968830.png" alt="X" className="w-12 m-2 p-2"></img></a>
            <a href="https://www.linkedin.com/in/sreeram-angina-2b4482270/"><img src="https://cdn-icons-png.flaticon.com/128/3536/3536505.png" alt="Linked In" className="w-12 m-2 p-2"></img></a>
            <a href="https://github.com/Sreeram1004"><img src="https://cdn-icons-png.flaticon.com/128/13170/13170533.png" alt="Git HUb" className="w-12 m-2 p-2"></img></a>  
            </div>
        </div>
    )
}
export default Home;
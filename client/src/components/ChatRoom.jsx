import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useSocket } from "../context/SocketProvider";
import { useArrayContext } from "../context/MessageStorage";
import { useDispatch, useSelector } from "react-redux";
import { encrypt, decrypt } from "../encryption/endcryption";
import {
  rightMessageData,
  leftMessageData,
} from "../redux/slices/messageSlices";
const getUserInformation = [];
export default function ChatRoom() {
  const socket = useSocket();

  const [userDetails, setUserDetails] = useState([]);

  const dispatch = useDispatch();

  const { rightMessageArray, leftmessageArray, fullMessageArray } = useSelector(
    (state) => state
  );
  // console.log("rightMessageArray : ", rightMessageArray);
  console.log("fullMessageArray : ", fullMessageArray);

  const handleUserData = useCallback(
    (data) => {
      console.log("your:information : ", data);
      setUserDetails(data);
      getUserInformation.push(data);

      socket.off("your:information", handleUserData);
    },
    [socket]
  );

  console.log("userDetails : ", userDetails);

  const handleNewUserJoined = useCallback(
    (data) => {
      console.log("new user joined: ", data);
    },
    [socket]
  );

  const handleIncomingMessage = useCallback(
    (data) => {
      console.log("incoming:message ===> : ", data);
      let email = data.from.userData.email;
      let message = data.message;
      const decryptMessage = decrypt(message);

      let socketId = data.from.userData.socketId;
      // console.log("??????????????? ===> : ", email, message, socketId);
      // present USer id
      const presentUserSocketId = getUserInformation[0].userData.socketId;
      if (presentUserSocketId) {
        if (socketId == presentUserSocketId) {
          // setLeftMessage((prevMessage) => [...prevMessage, { email, message }]);

          // console.log("Right Message recieved ------------>");
          // console.log(email, message);
          dispatch(rightMessageData(decryptMessage));
        } else {
          // console.log("Left Message recieved ------------>");
          // console.log(email, message);
          dispatch(leftMessageData(decryptMessage));
        }
      }
    },
    [socket]
  );
  useEffect(() => {
    socket.on("your:information", handleUserData);
    socket.on("new:user:joined", handleNewUserJoined);
    socket.on("incoming:message", handleIncomingMessage);
  }, [socket]);

  // console.log("userDetails : ", userDetails);
  const [inputData, setInputData] = useState({
    message: "",
  });

  const inputDataHandler = (e) => {
    const { name, value } = e.target;
    setInputData({
      ...inputData,
      [name]: value,
    });
  };

  const sendData = () => {
    console.log("Input Data : ", inputData.message);

    const encryptData = encrypt(inputData.message);
    console.log("encryptData : ", encryptData);

    socket.emit("message", { from: userDetails, message: encryptData });
  };
  // useEffect(() => {
  //   socket.emit("message", inputData);
  // }, [socket]);

  // const displayMessages = fullMessageArray.map((mess, index) => {
  //   if (mess) {
  //     if (mess.right) {
  //       return (
  //         <div className="flex justify-end">
  //           <div className="bg-blue-200 text-black p-2 rounded-lg max-w-xs">
  //             <p>{mess.mess.right}</p>
  //           </div>
  //         </div>
  //       );
  //     }
  //     if (mess.left) {
  //       return (
  //         <div className="flex">
  //           <div className="bg-gray-300 text-black p-2 rounded-lg max-w-xs">
  //             <p>{mess.left}</p>
  //           </div>
  //         </div>
  //       );
  //     }
  //   } else {
  //     console.log("No message");
  //   }
  // });
  const displayMessages = fullMessageArray.map((item, index) => {
    if (item.left !== undefined) {
      console.log(item.left);
      return (
        <div key={index} className="flex">
          <div className="bg-gray-300 text-black p-2 rounded-lg max-w-xs">
            <p>{item.left}</p>
          </div>
        </div>
      );
    } else if (item.right !== undefined) {
      console.log(item.right);
      return (
        <div key={index} className="flex justify-end">
          <div className="bg-blue-200 text-black p-2 rounded-lg max-w-xs">
            <p>{item.right}</p>
          </div>
        </div>
      );
    }
  });

  console.log("displayMessages $$$%%&*&$%^&*^^&* : ", displayMessages);

  return (
    // <!-- component -->
    <div className="bg-gray-100 h-screen flex flex-col max-w-lg mx-auto">
      <div className="bg-blue-500 p-4 text-white flex justify-between items-center">
        <button id="login" className="hover:bg-blue-400 rounded-md p-1">
          <svg
            width="25px"
            height="25px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <circle
                cx="12"
                cy="6"
                r="4"
                stroke="#ffffff"
                strokeWidth="1.5"
              ></circle>{" "}
              <path
                d="M15 20.6151C14.0907 20.8619 13.0736 21 12 21C8.13401 21 5 19.2091 5 17C5 14.7909 8.13401 13 12 13C15.866 13 19 14.7909 19 17C19 17.3453 18.9234 17.6804 18.7795 18"
                stroke="#ffffff"
                strokeWidth="1.5"
                strokeLinecap="round"
              ></path>{" "}
            </g>
          </svg>
        </button>
        <span>
          Hi :{" "}
          {getUserInformation &&
            getUserInformation[0] &&
            getUserInformation[0].userData.name}
        </span>
        <div className="relative inline-block text-left">
          <button id="setting" className="hover:bg-blue-400 rounded-md p-1">
            <svg
              width="30px"
              height="30px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M14.1395 12.0002C14.1395 13.1048 13.2664 14.0002 12.1895 14.0002C11.1125 14.0002 10.2395 13.1048 10.2395 12.0002C10.2395 10.8957 11.1125 10.0002 12.1895 10.0002C13.2664 10.0002 14.1395 10.8957 14.1395 12.0002Z"
                  stroke="#ffffff"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>{" "}
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M7.57381 18.1003L5.12169 12.8133C4.79277 12.2907 4.79277 11.6189 5.12169 11.0963L7.55821 5.89229C7.93118 5.32445 8.55898 4.98876 9.22644 5.00029H12.1895H15.1525C15.8199 4.98876 16.4477 5.32445 16.8207 5.89229L19.2524 11.0923C19.5813 11.6149 19.5813 12.2867 19.2524 12.8093L16.8051 18.1003C16.4324 18.674 15.8002 19.0133 15.1281 19.0003H9.24984C8.5781 19.013 7.94636 18.6737 7.57381 18.1003Z"
                  stroke="#ffffff"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>{" "}
              </g>
            </svg>
          </button>
          <div
            id="dropdown-content"
            className="hidden absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg p-2"
          >
            <a
              href="#"
              className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-200 rounded-md"
            >
              <svg
                width="20px"
                height="20px"
                viewBox="0 0 24 24"
                fill="none"
                className="mr-2"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    d="M9 21H12M15 21H12M12 21V18M12 18H19C20.1046 18 21 17.1046 21 16V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V16C3 17.1046 3.89543 18 5 18H12Z"
                    stroke="#000000"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>{" "}
                </g>
              </svg>
              Appearance
            </a>
            <a
              href="#"
              className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-200 rounded-md"
            >
              <svg
                width="20px"
                height="20px"
                viewBox="0 0 24 24"
                className="mr-2"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    d="M11.2691 4.41115C11.5006 3.89177 11.6164 3.63208 11.7776 3.55211C11.9176 3.48263 12.082 3.48263 12.222 3.55211C12.3832 3.63208 12.499 3.89177 12.7305 4.41115L14.5745 8.54808C14.643 8.70162 14.6772 8.77839 14.7302 8.83718C14.777 8.8892 14.8343 8.93081 14.8982 8.95929C14.9705 8.99149 15.0541 9.00031 15.2213 9.01795L19.7256 9.49336C20.2911 9.55304 20.5738 9.58288 20.6997 9.71147C20.809 9.82316 20.8598 9.97956 20.837 10.1342C20.8108 10.3122 20.5996 10.5025 20.1772 10.8832L16.8125 13.9154C16.6877 14.0279 16.6252 14.0842 16.5857 14.1527C16.5507 14.2134 16.5288 14.2807 16.5215 14.3503C16.5132 14.429 16.5306 14.5112 16.5655 14.6757L17.5053 19.1064C17.6233 19.6627 17.6823 19.9408 17.5989 20.1002C17.5264 20.2388 17.3934 20.3354 17.2393 20.3615C17.0619 20.3915 16.8156 20.2495 16.323 19.9654L12.3995 17.7024C12.2539 17.6184 12.1811 17.5765 12.1037 17.56C12.0352 17.5455 11.9644 17.5455 11.8959 17.56C11.8185 17.5765 11.7457 17.6184 11.6001 17.7024L7.67662 19.9654C7.18404 20.2495 6.93775 20.3915 6.76034 20.3615C6.60623 20.3354 6.47319 20.2388 6.40075 20.1002C6.31736 19.9408 6.37635 19.6627 6.49434 19.1064L7.4341 14.6757C7.46898 14.5112 7.48642 14.429 7.47814 14.3503C7.47081 14.2807 7.44894 14.2134 7.41394 14.1527C7.37439 14.0842 7.31195 14.0279 7.18708 13.9154L3.82246 10.8832C3.40005 10.5025 3.18884 10.3122 3.16258 10.1342C3.13978 9.97956 3.19059 9.82316 3.29993 9.71147C3.42581 9.58288 3.70856 9.55304 4.27406 9.49336L8.77835 9.01795C8.94553 9.00031 9.02911 8.99149 9.10139 8.95929C9.16534 8.93081 9.2226 8.8892 9.26946 8.83718C9.32241 8.77839 9.35663 8.70162 9.42508 8.54808L11.2691 4.41115Z"
                    stroke="#000000"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>{" "}
                </g>
              </svg>
              Favorite
            </a>
            <a
              href="#"
              className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-200 rounded-md"
            >
              <svg
                width="20px"
                height="20px"
                viewBox="0 0 24 24"
                className="mr-2"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <g id="Warning / Info">
                    {" "}
                    <path
                      id="Vector"
                      d="M12 11V16M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21ZM12.0498 8V8.1L11.9502 8.1002V8H12.0498Z"
                      stroke="#000000"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>{" "}
                  </g>{" "}
                </g>
              </svg>
              More
            </a>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="flex flex-col space-y-2">
          {/* <!-- Messages go here --> */}
          {/* <!-- Example Message --> */}
          {/* Right Side Messages */}

          {/* <!-- Example Received Message --> */}
          {/* Left side message */}
          {displayMessages || "No Message"}

          {/* <!-- Example Message --> */}
        </div>
      </div>

      <div className="bg-white p-4 flex items-center">
        <input
          onChange={inputDataHandler}
          name="message"
          type="text"
          placeholder="Type your message..."
          className="flex-1  border-2 border-black rounded-full px-4 py-2 focus:outline-none"
        />
        <button
          onClick={sendData}
          className="bg-blue-500  text-white rounded-full p-2 ml-2 hover:bg-blue-600 focus:outline-none"
        >
          <svg
            width="20px"
            height="20px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            stroke="#ffffff"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <path
                d="M11.5003 12H5.41872M5.24634 12.7972L4.24158 15.7986C3.69128 17.4424 3.41613 18.2643 3.61359 18.7704C3.78506 19.21 4.15335 19.5432 4.6078 19.6701C5.13111 19.8161 5.92151 19.4604 7.50231 18.7491L17.6367 14.1886C19.1797 13.4942 19.9512 13.1471 20.1896 12.6648C20.3968 12.2458 20.3968 11.7541 20.1896 11.3351C19.9512 10.8529 19.1797 10.5057 17.6367 9.81135L7.48483 5.24303C5.90879 4.53382 5.12078 4.17921 4.59799 4.32468C4.14397 4.45101 3.77572 4.78336 3.60365 5.22209C3.40551 5.72728 3.67772 6.54741 4.22215 8.18767L5.24829 11.2793C5.34179 11.561 5.38855 11.7019 5.407 11.8459C5.42338 11.9738 5.42321 12.1032 5.40651 12.231C5.38768 12.375 5.34057 12.5157 5.24634 12.7972Z"
                stroke="#ffffff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>{" "}
            </g>
          </svg>
        </button>
      </div>
    </div>
  );
}

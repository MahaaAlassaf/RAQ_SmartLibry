import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBooks, setLimit, setOffset } from "../store/bookSlice";
import { RootState } from "../store";
import { AppDispatch } from "../store";
import { UnknownAction } from "@reduxjs/toolkit";
import { Loading as Spinner } from "../components/Loading";
import Search from "../components/Search";
import Chatbot from "../components/Chatbot";
import Book from "../components/Book";
import Error from "../components/Error";
import Pagination from "../components/Pagination";


const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [title, setTitle] = useState("");
  const { books, loading, error, limit, offset } = useSelector(
    (state: RootState) => state.books
  );

  useEffect(() => {
    dispatch(fetchBooks({ title, limit, offset }) as unknown as UnknownAction);
  }, [dispatch, limit, offset]);

  if (loading) return <Spinner />;
  if (error) return <Error error={error} />;

  return (
    <div className="h-screen flex flex-col bg-primary px-6 pt-6">
      <Chatbot />
      <Search title={title} setTitle={setTitle} />
      <div className="flex-grow overflow-y-auto pb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {books.map((book) => (
            <Book key={book.id} book={book} />
          ))}
        </div>
        <Pagination
          offset={offset}
          limit={limit}
          booksLength={books.length}
          handleNextPage={() => dispatch(setOffset(offset + limit))}
          handlePreviousPage={() => dispatch(setOffset(Math.max(offset - limit, 0)))}
        />
      </div>
    </div>
  );
};

export default Home;


// // src/pages/Home.tsx
// import React, { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { fetchBooks, setLimit, setOffset } from "../store/bookSlice";
// import { sendChatMessageAsync, clearResponse } from "../store/chatSlice";
// import { RootState } from "../store";
// import { AppDispatch } from "../store";
// import { UnknownAction } from "@reduxjs/toolkit";
// import { TailSpin as Spinner } from "react-loader-spinner";
// import { Link } from "react-router-dom";
// import ChatBot from "react-chatbotify";
// import { Flow } from "react-chatbotify";
// import iconchat from "./Chat.png"

// // components
// import Book from "../components/Book";

// const Home: React.FC = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const [title, setTitle] = useState("");
//   const { books, loading, error, limit, offset } = useSelector(
//     (state: RootState) => state.books
//   );
//   const [response, setResponse] = useState("");
//   const {
//     responseList,
//     loading: chatLoading,
//     error: chatError,
//   } = useSelector((state: RootState) => state.chat);
//   useEffect(() => {
//     dispatch(fetchBooks({ title, limit, offset }) as unknown as UnknownAction);
//   }, [dispatch, limit, offset]);

//   const handleNextPage = () => {
//     dispatch(setOffset(offset + limit));
//   };

//   const handlePreviousPage = () => {
//     dispatch(setOffset(Math.max(offset - limit, 0)));
//   };

//   const handleChatMessage = async (message: string) => {
//     // dispatch(clearResponse());
//     const out = await dispatch(sendChatMessageAsync(message)).then(
//       (api_response) => {
//         // setResponse(api_response || "");
//         return api_response;
//       }
//     );
//     return out;
//   };

//   if (loading)
//     return (
//       <div className="p-6 bg-primary h-screen flex justify-center items-center">
//         <Spinner
//           visible={true}
//           height="80"
//           width="80"
//           color="bg-white"
//           ariaLabel="tail-spin-loading"
//           radius="1"
//           wrapperStyle={{}}
//           wrapperClass=""
//         />
//       </div>
//     );
//   if (error) {
//     return (
//       <div className="h-screen flex justify-center items-center bg-red-500">
//         <p className="text-white text-2xl">Error: {error}</p>
//       </div>
//     );
//   }
//   const handlePerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     dispatch(setLimit(Number(event.target.value)));
//   };

//   //chatbot 

//   // Define the chatbot flow
//   const flow: Flow = {
//     start: {
//       message: "Hello, I am the AI ChatBot! Ask me any question about books.",
//       path: "loop",
//     },
//     loop: {
//       message: async (params) => {
//         const out = await handleChatMessage(params.userInput);
//         console.log(out);
//         return out;
//       },
//       path: "loop",
//     },
//   };

//   return (
//     <div className="h-screen flex flex-col bg-primary px-6 pt-6">
//       <ChatBot
//         flow={flow}
//         settings={{
//           general: {
//             primaryColor: "#445A9A", 
//             secondaryColor: "#445A9A", 
//           },
//           chatButton: {
//             icon: iconchat,
//           },
//           tooltip: {
//             text: "Chat with the AI ChatBot",
//           },
//           chatHistory: { storageKey: "chatbot" },
//         }}
//         styles={{
      
//         }}
//       />

// // Search
//       <header className="flex flex-row justify-between items-center mb-4 border-b-2 pb-4 border-opacity-15 border-slate-400">
//         <Link to="/">
//           <h1 className="text-2xl font-bold text-white">Library</h1>
//         </Link>
//         <div className="flex flex-row flex-auto align-middle justify-center px-40">
//           <input
//             type="text"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             placeholder="Search by title"
//             className="px-5 py-1 bg-blue-900 text-white rounded mr-2 w-full"
//           />
//           <button
//             onClick={() => {
//               dispatch(
//                 fetchBooks({ title, limit, offset }) as unknown as UnknownAction
//               );
//             }}
//             className="px-4 py-2 bg-blue-900 text-white rounded">
//             Search
//           </button>
//         </div>
//         <div>
//           <label htmlFor="perPage" className="text-white mr-2">
//             Results Per Page:
//           </label>
//           <select
//             id="perPage"
//             value={limit}
//             onChange={handlePerPageChange}
//             className="px-2 py-1 bg-blue-900 text-white rounded">
//             <option value={10}>10</option>
//             <option value={20}>20</option>
//             <option value={30}>30</option>
//             <option value={40}>40</option>
//             <option value={50}>50</option>
//           </select>
//         </div>
//       </header>
//       <div className="flex-grow overflow-y-auto pb-6">
//         <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
//           {books.map((book) => (
//             <Book key={book.id} book={book} />
//           ))}
//         </div>
        


//         {books.length === 0 ? (
//           <div className="text-white text-2xl mt-4 justify-center align-middle text-center">
//             No books found
//           </div>
//         ) : (
//           <div className="flex justify-start mt-4">
//             <button
//               onClick={handlePreviousPage}
//               disabled={offset === 0}
//               className="px-4 py-2 bg-blue-900 text-white rounded disabled:opacity-50">
//               Previous Page
//             </button>
//             <button
//               onClick={handleNextPage}
//               disabled={books.length < limit}
//               className="px-4 py-2 bg-blue-900 text-white rounded disabled:opacity-50 ml-6">
//               Next Page
//             </button>
//           </div>
//         )}
//       </div>
//     </div>

//   );
// };

// export default Home;
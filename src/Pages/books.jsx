import { useEffect, useState } from "react";
import { useFirebase } from "../Context/firebase";

const Books = () => {
  const [books, setBooks] = useState([]);
  const firebase = useFirebase();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const querySnapshot = await firebase.getAllBooks();
        const booksData = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          console.log("Book data from Firestore:", data);
          return {
            id: doc.id,
            ...data,
          };
        });
        console.log("Processed books data:", booksData);
        setBooks(booksData);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, [firebase]);

  return (
    <>
      <style>
        {`
          .books-container {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 20px;
            padding: 30px;
          }

          .book-card {
            width: 280px;
            min-height: 350px;
            border: 1px solid #ddd;
            border-radius: 12px;
            box-shadow: 0 4px 10px rgba(0,0,0,0.1);
            padding: 20px;
            background-color: #f9f9f9;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
            margin-bottom: 20px;
          }

          .book-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 8px 25px rgba(0,0,0,0.2);
          }

          .book-title {
            font-size: 1.4rem;
            font-weight: 600;
            margin-bottom: 12px;
            color: #333;
            text-align: center;
            line-height: 1.3;
          }

          .book-text {
            font-size: 1.1rem;
            color: #555;
            margin-top: 5px; /* Reduced top margin for price */
            margin-bottom: 5px; /* Reduced bottom margin for price */
            text-align: center;
          }

          .book-text b {
            color: #007bff;
            font-weight: bold;
          }

          .book-description {
            font-size: 0.9rem;
            color: #333;
            text-align: center;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 4; /* Adjusted for 4 lines */
            -webkit-box-orient: vertical;
            margin-top: 10px;
          }

          /* Add responsive styles for smaller screens */
          @media (max-width: 768px) {
            .book-card {
              width: 100%;
              max-width: 350px;
            }
          }
        `}
      </style>

      <div className="books-container">
        {books.map((book) => {
          console.log("Rendering book:", book);
          return (
            <div key={book.id} className="book-card">
              <div className="book-title">{book.name}</div>
              <div className="book-text">
                <b>Price:</b> ${book.price}
              </div>
              <div className="book-description">
                {book.description || "No description available"}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Books;

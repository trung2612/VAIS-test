import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./books.css";
import { formatDate } from "../../utils/format";
import { Pagination } from "../molecules/pagination/Pagination";

const titles = [
  "Mã sách",
  "Tên sách",
  "Tác giả",
  "Nhà xuất bản",
  "Thể loại",
  "Số bình luận",
  "Số trang",
  "Ngày sản xuất",
  "Đánh giá",
  "Action",
];

export const Books = () => {
  const [books, setBooks] = useState({});
  const { bookId } = useParams();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const searchData = books?.items?.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.book_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.review_count.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.number_of_pages.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.publisher.toLowerCase().includes(searchTerm.toLowerCase())
  );

  console.log(searchData);

  useEffect(() => {
    const fetchBooks = () => {
      fetch(
        `https://backend-guideline-api.vais.vn/api/books?page=${bookId}&limit=10&search=Time`
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setBooks(data.data);
        });
    };
    fetchBooks();
  }, [bookId]);

  return (
    <div className="container">
      <div className="books">
        {/* heading */}
        <div className="heading">
          <div className="title">Quản lý sách</div>
          <div className="breadcrumb">
            <div className="search">
              <input
                className="search-input"
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Tìm kiếm"
              />
            </div>
          </div>
        </div>
        {/* heading end */}
        {/* table */}
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                {titles.map((title) => (
                  <th scope="col" key={title}>
                    {title}
                  </th>
                ))}
              </tr>
            </thead>
            {/* thead end */}

            {/* tbody */}
            <tbody>
              {searchData?.map((book) => (
                <tr key={book.id}>
                  <td className="id">{book.book_id}</td>
                  <td className="title">{book.title}</td>
                  <td className="author">{book.author}</td>
                  <td className="publisher">{book.publisher}</td>
                  <td className="title">{book.title}</td>
                  <td className="review_count">{book.review_count}</td>
                  <td className="number_of_pages">{book.number_of_pages}</td>
                  <td className="year_publish">
                    {formatDate(book.year_publish)}
                  </td>
                  <td className="average_rating">{book.average_rating}</td>
                  <td className="action">delete</td>
                </tr>
              ))}
            </tbody>
            {/* tbody end */}
          </table>
        </div>
        {/* table end */}
        {/* footer */}
        <footer>
          <div className="pagination">
            <Pagination
              className="pagination-bar"
              currentPage={+bookId}
              totalPage={books?.totalPages}
            />
          </div>
        </footer>
        {/* footer end */}
      </div>
    </div>
  );
};

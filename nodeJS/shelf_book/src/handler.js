const { nanoid } = require("nanoid");
const books = require("./books");

const addBookHandler = (request, h) => {
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  let finished = false;
  if(pageCount === readPage){
    finished = true;
  }

  if (name == null || name == ""){
    const response = h.response({
      
        "status": "fail",
        "message": "Gagal menambahkan buku. Mohon isi nama buku"
    
    });
    response.code(400);
    return response;
  }
  if (readPage>pageCount){
    const response = h.response({
      
        "status": "fail",
        "message": "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount"
    
    });
    response.code(400);
    return response;
  }

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt
  };

  books.push(newBook);

  const isSuccess = books.filter((note) => note.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      "status": "success",
      "message": "Buku berhasil ditambahkan",
      "data": {
        "bookId": id
      }
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: "fail",
    message: "Book gagal ditambahkan",
  });
  response.code(500);
  return response;
};
const getAllBooksHandler = (request, h) =>{
  const { name, reading, finished } = request.query;
  let getBooks = books;
  if(name !== undefined && name !== null){
    const nameLower = name.toLowerCase();
    getBooks = getBooks.filter((book) => book.name.toLowerCase().includes(nameLower));
  }
  if(reading !== undefined && reading !== null){
    const isReading = reading === '1';
    getBooks = getBooks.filter((book) => book.reading === isReading);
  }
  if(finished !== undefined && finished !== null){
    const isFinished = finished === '1';
    getBooks = getBooks.filter((book) => book.finished === isFinished);
  }
  getBooks = getBooks.map(({ id, name, publisher }) => ({ id, name, publisher }));
    const response = h.response({
      status: "success",
      data: {
        "books": getBooks,
      }
    });
    response.code(200);
    return response;
  };
const getBookByBookId = (request, h) => {
  const { id } = request.params;

  const book = books.filter((n) => n.id === id)[0];

  if (book !== undefined) {
    return {
      status: "success",
      data: {
        book,
      },
    };
  }

  const response = h.response({
    status: "fail",
    message: "Buku tidak ditemukan",
  });
  response.code(404);
  return response;
};
const updateBookByIdHandler = (request, h) =>{
  const { id } = request.params;
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
  const updatedAt = new Date().toISOString();

  if (name == null || name == ""){
    const response = h.response({
      
        "status": "fail",
        "message": "Gagal memperbarui buku. Mohon isi nama buku"
    
    });
    response.code(400);
    return response;
  };
  if (readPage>pageCount){
    const response = h.response({
      
        "status": "fail",
        "message": "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount"
    
    });
    response.code(400);
    return response;
  };

  const index = books.findIndex((book) => book.id === id);
  if(index !== -1){
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      updatedAt
    };
    const response = h.response({
      
        "status": "success",
        "message": "Buku berhasil diperbarui"
    
    });
    response.code(200);
    return response;
  };
  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
  });
  response.code(404);
  return response;

};
const deleteBookByIdHandler = (request, h) => {
  const { id } = request.params;

  const index = books.findIndex((book) => book.id === id);

  if (index !== -1) {
    books.splice(index, 1);
    const response = h.response({
      status: "success",
      message: "Buku berhasil dihapus",
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: "fail",
    message: "Buku gagal dihapus. Id tidak ditemukan",
  });
  response.code(404);
  return response;
};
module.exports = {
  addBookHandler,
  getAllBooksHandler,
  getBookByBookId,
  updateBookByIdHandler,
  deleteBookByIdHandler,
};

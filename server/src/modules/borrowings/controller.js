const Borrowing = require("./model");
const Book = require("../books/model");

const FINE_PER_DAY = 5;

const getBorrowings = async (req, res) => {
  try {
    const { status, memberId } = req.query;
    const query = {};
    if (status) query.status = status;
    if (memberId) query.memberId = memberId;

    const borrowings = await Borrowing.find(query)
      .populate("bookId", "title isbn")
      .populate("memberId", "name memberId")
      .sort({ createdAt: -1 });
    res.json(borrowings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getBorrowingById = async (req, res) => {
  try {
    const borrowing = await Borrowing.findById(req.params.id)
      .populate("bookId")
      .populate("memberId");
    if (!borrowing) return res.status(404).json({ message: "Record not found" });
    res.json(borrowing);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const issueBook = async (req, res) => {
  try {
    const { bookId, memberId, dueDate } = req.body;

    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ message: "Book not found" });
    if (book.availableCopies < 1) {
      return res.status(400).json({ message: "No available copies" });
    }

    const borrowing = await Borrowing.create({ bookId, memberId, dueDate });

    book.availableCopies -= 1;
    await book.save();

    res.status(201).json(borrowing);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const returnBook = async (req, res) => {
  try {
    const borrowing = await Borrowing.findById(req.params.id);
    if (!borrowing) return res.status(404).json({ message: "Record not found" });
    if (borrowing.status === "returned") {
      return res.status(400).json({ message: "Already returned" });
    }

    const returnDate = new Date();
    const dueDate = new Date(borrowing.dueDate);
    let fineAmount = 0;

    if (returnDate > dueDate) {
      const overdueDays = Math.ceil((returnDate - dueDate) / (1000 * 60 * 60 * 24));
      fineAmount = overdueDays * FINE_PER_DAY;
    }

    borrowing.returnDate = returnDate;
    borrowing.status = "returned";
    borrowing.fineAmount = fineAmount;
    await borrowing.save();

    const book = await Book.findById(borrowing.bookId);
    if (book) {
      book.availableCopies += 1;
      await book.save();
    }

    res.json(borrowing);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getBorrowings, getBorrowingById, issueBook, returnBook };
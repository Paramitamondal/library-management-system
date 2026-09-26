const Book = require("../books/model");
const Member = require("../members/model");
const Borrowing = require("../borrowings/model");

const getStatistics = async (req, res) => {
  try {
    const totalBooks = await Book.countDocuments();
    const totalMembers = await Member.countDocuments();
    const borrowedBooks = await Borrowing.countDocuments({ status: "borrowed" });
    const overdueBooks = await Borrowing.countDocuments({
      status: "borrowed",
      dueDate: { $lt: new Date() },
    });

    const books = await Book.find();
    const availableBooks = books.reduce((sum, b) => sum + b.availableCopies, 0);

    res.json({
      totalBooks,
      availableBooks,
      borrowedBooks,
      totalMembers,
      overdueBooks,
      totalActiveTransactions: borrowedBooks,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getRecentActivity = async (req, res) => {
  try {
    const recentBooks = await Book.find().sort({ createdAt: -1 }).limit(5);
    const recentMembers = await Member.find().sort({ createdAt: -1 }).limit(5);
    const recentBorrowings = await Borrowing.find()
      .populate("bookId", "title")
      .populate("memberId", "name")
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({ recentBooks, recentMembers, recentBorrowings });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getStatistics, getRecentActivity };

import React, { useEffect, useState } from "react";
import { bookBaseUrl } from "../../axiosInstance";
import { MdDelete } from "react-icons/md";
import { FaPen } from "react-icons/fa";
import Navbar from "./Navbar";
import toast, { Toaster } from "react-hot-toast";

const initialForm = {
    BookName: "",
    BookTitle: "",
    Author: "",
    SellingPrice: "",
    PublishDate: "",
    Id: "",
};

const Dashboard = () => {
    const [bookForm, setBookForm] = useState(initialForm);
    const [bookList, setBookList] = useState([]);
    const [isUpdating, setIsUpdating] = useState(false);
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(false);

    // READ: Get all books
    const getAllbookList = async () => {
        try {
            setFetching(true);

            const { data } = await bookBaseUrl.get("/booklists");

            setBookList(data?.BookList || []);

        } catch (error) {
            console.log(
                "Fetch Books Error:",
                error.response?.data || error.message
            );

            toast.error(
                error.response?.data?.Message || "Failed to fetch books"
            );
        } finally {
            setFetching(false);
        }
    };

    useEffect(() => {
        getAllbookList();
    }, []);

    // Handle input changes
    const handleFormChange = (e) => {
        const { name, value } = e.target;

        setBookForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Reset form
    const resetForm = () => {
        setBookForm(initialForm);
        setIsUpdating(false);
    };

    // CREATE / UPDATE
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            !bookForm.BookName.trim() ||
            !bookForm.BookTitle.trim() ||
            !bookForm.Author.trim() ||
            !bookForm.SellingPrice
        ) {
            toast.error("All fields are required");
            return;
        }

        if (Number(bookForm.SellingPrice) <= 0) {
            toast.error("Selling price must be greater than zero");
            return;
        }

        try {
            setLoading(true);

            let response;

            if (isUpdating) {
                response = await bookBaseUrl.put(
                    "/updatebook",
                    bookForm
                );
            } else {
                response = await bookBaseUrl.post(
                    "/addbook",
                    bookForm
                );
            }

            const { data } = response;

            if (data?.Success) {
                toast.success(
                    data?.Message ||
                    (isUpdating
                        ? "Book updated successfully"
                        : "Book added successfully")
                );

                resetForm();
                await getAllbookList();
            } else {
                toast.error(data?.Message || "Operation failed");
            }

        } catch (error) {
            console.log(
                "Submit Error:",
                error.response?.data || error.message
            );

            toast.error(
                error.response?.data?.Message ||
                "Something went wrong"
            );
        } finally {
            setLoading(false);
        }
    };

    // DELETE
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this book?"
        );

        if (!confirmDelete) return;

        try {
            const { data } = await bookBaseUrl.post(
                "/deletebook",
                { Id: id }
            );

            if (data?.Success) {
                toast.success(
                    data?.Message || "Book deleted successfully"
                );

                await getAllbookList();
            } else {
                toast.error(data?.Message || "Delete failed");
            }

        } catch (error) {
            console.log(
                "Delete Error:",
                error.response?.data || error.message
            );

            toast.error(
                error.response?.data?.Message ||
                "Failed to delete book"
            );
        }
    };

    // UPDATE: Fill form with selected book
    const handleUpdate = (book) => {
        setBookForm({
            BookName: book?.BookName || "",
            BookTitle: book?.BookTitle || "",
            Author: book?.Author || "",
            SellingPrice: book?.SellingPrice || "",
            PublishDate: book?.PublishDate
                ? new Date(book.PublishDate).toISOString().split("T")[0]
                : "",
            Id: book?._id || "",
        });

        setIsUpdating(true);

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <>
            <Navbar />

            <div className="w-full px-5 min-h-[calc(100vh-60px)]">

                <Toaster position="top-right" />

                {/* BOOK FORM */}
                <form onSubmit={handleSubmit}>

                    <div className="w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3 my-4">

                        <div className="w-full flex flex-col gap-2">
                            <label>Book Name</label>

                            <input
                                type="text"
                                placeholder="Book Name"
                                className="w-full border-2 border-gray-300 text-gray-800 rounded-sm outline-none h-9 px-2"
                                name="BookName"
                                value={bookForm.BookName}
                                onChange={handleFormChange}
                            />
                        </div>

                        <div className="w-full flex flex-col gap-2">
                            <label>Book Title</label>

                            <input
                                type="text"
                                placeholder="Book Title"
                                className="w-full border-2 border-gray-300 text-gray-800 rounded-sm outline-none h-9 px-2"
                                name="BookTitle"
                                value={bookForm.BookTitle}
                                onChange={handleFormChange}
                            />
                        </div>

                        <div className="w-full flex flex-col gap-2">
                            <label>Author</label>

                            <input
                                type="text"
                                placeholder="Author"
                                className="w-full border-2 border-gray-300 text-gray-800 rounded-sm outline-none h-9 px-2"
                                name="Author"
                                value={bookForm.Author}
                                onChange={handleFormChange}
                            />
                        </div>

                        <div className="w-full flex flex-col gap-2">
                            <label>Selling Price</label>

                            <input
                                type="number"
                                min="0.01"
                                step="0.01"
                                placeholder="Selling Price"
                                className="w-full border-2 border-gray-300 text-gray-800 rounded-sm outline-none h-9 px-2"
                                name="SellingPrice"
                                value={bookForm.SellingPrice}
                                onChange={handleFormChange}
                            />
                        </div>

                        <div className="w-full flex flex-col gap-2">
                            <label>Publish Date</label>

                            <input
                                type="date"
                                className="w-full border-2 border-gray-300 text-gray-800 rounded-sm outline-none h-9 px-2"
                                name="PublishDate"
                                value={bookForm.PublishDate}
                                onChange={handleFormChange}
                            />
                        </div>

                    </div>

                    <div className="w-full flex justify-end gap-3">

                        {isUpdating && (
                            <button
                                type="button"
                                onClick={resetForm}
                                className="bg-gray-400 text-white h-9 px-5 rounded-md cursor-pointer"
                            >
                                CANCEL
                            </button>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-gray-700 text-white h-9 px-6 rounded-md cursor-pointer disabled:opacity-50"
                        >
                            {loading
                                ? "PLEASE WAIT..."
                                : isUpdating
                                    ? "UPDATE BOOK"
                                    : "ADD BOOK"}
                        </button>

                    </div>

                </form>

                {/* BOOK TABLE */}

                <div className="w-full mt-10 overflow-x-auto">

                    <table className="w-full bg-white divide-y divide-gray-200">

                        <thead className="bg-gray-50">

                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Book Name
                                </th>

                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Book Title
                                </th>

                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Author
                                </th>

                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Selling Price
                                </th>

                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Publish Date
                                </th>

                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Action
                                </th>
                            </tr>

                        </thead>

                        <tbody className="bg-white divide-y divide-gray-200">

                            {fetching ? (

                                <tr>
                                    <td
                                        colSpan="6"
                                        className="text-center py-8"
                                    >
                                        Loading books...
                                    </td>
                                </tr>

                            ) : bookList.length > 0 ? (

                                bookList.map((book) => (

                                    <tr
                                        className="hover:bg-gray-100"
                                        key={book._id}
                                    >

                                        <td className="px-6 py-3 whitespace-nowrap">
                                            {book.BookName}
                                        </td>

                                        <td className="px-6 py-3 whitespace-nowrap">
                                            {book.BookTitle}
                                        </td>

                                        <td className="px-6 py-3 whitespace-nowrap">
                                            {book.Author}
                                        </td>

                                        <td className="px-6 py-3 whitespace-nowrap">
                                            ₹{book.SellingPrice}
                                        </td>

                                        <td className="px-6 py-3 whitespace-nowrap">
                                            {book.PublishDate
                                                ? new Date(book.PublishDate).toLocaleDateString("en-IN")
                                                : "-"}
                                        </td>

                                        <td className="px-6 py-3 whitespace-nowrap">

                                            <div className="flex justify-center gap-3">

                                                <button
                                                    type="button"
                                                    title="Delete Book"
                                                    onClick={() => handleDelete(book._id)}
                                                    className="h-8 w-8 flex justify-center items-center bg-red-100 text-red-600 rounded text-lg cursor-pointer"
                                                >
                                                    <MdDelete />
                                                </button>

                                                <button
                                                    type="button"
                                                    title="Edit Book"
                                                    onClick={() => handleUpdate(book)}
                                                    className="h-8 w-8 flex justify-center items-center bg-green-100 text-green-600 rounded text-lg cursor-pointer"
                                                >
                                                    <FaPen />
                                                </button>

                                            </div>

                                        </td>

                                    </tr>

                                ))

                            ) : (

                                <tr>
                                    <td
                                        colSpan="6"
                                        className="text-center py-8 text-gray-500"
                                    >
                                        No books found. Add your first book!
                                    </td>
                                </tr>

                            )}

                        </tbody>

                    </table>

                </div>

            </div>
        </>
    );
};

export default Dashboard;

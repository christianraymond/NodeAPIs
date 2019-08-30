const express = require("express");
const mongoose = require("mongoose");

function routes(Book) {
    const bookRouter = express.Router();
    bookRouter.route("/books")
        .post((req, res) => {
            const book = new Book(req.body);
            book.save();
            return res.status(201).json(book);
        })
        .get((req, res) => {
            const query = {};
            if (req.query.genre) {
                query.genre = req.query.genre;
            }
            Book.find((query, (err, books) => {
                if (err) {
                    return res.send(err)
                }
                return res.json(books)
            })
            );
            bookRouter.route("/books/:bookId").get((req, res, next) => {
                Book.findById(req.params.bookId, (err, books) => {
                    if (err) {
                        return res.send(err);
                    }
                    if (books) {
                        req.books = books;
                        return next();
                    }
                    return res.sendStatus(404)
                });
            })
            bookRouter.route("/books/:bookId")
                .get((req, res) => {
                    res.json(req.books)
                        .put((req, res) => {
                            const { books } = req;
                            books.title = req.body.title;
                            books.auther = req.body.auther;
                            books.genre = req.body.genre;
                            books.read = req.body.read;
                            req.book.save((err) => {
                                if (err) {
                                    return res.send(err)
                                }
                                return res.json(books);
                            })
                        }).patch((req, res) => {
                            const { book } = req;
                            if (req.body._id) {
                                delete req.body._id
                            }
                            Object.entries(req.body).array.forEach(bookItem => {
                                const key = bookItem[0];
                                const value = bookItem[1];
                                books[key] = value;
                            });
                            req.book.save((err) => {
                                if (err) {
                                    return res.send(err)
                                }
                                return res.json(books);
                            });
                        })
                    /*===================DELETE HTTP seems to give the following error 'TypeError: Router.use() requires a middleware function but got a undefined =================================            
                                    .delete((req, res) => {
                                        req.books.remove((err) => {
                                            if (err) {
                                                return res.send(err)
                                            }
                                            return res.sendStatus(204)
                                        });
                    =================================================I think it's express version error, As I am using express above v2.x version of express================================================================= */

                })
            return bookRouter;
        });
}
module.exports = routes;
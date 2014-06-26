angular.module("fireplace").controller("wishlistController", ["$scope", "$timeout", "bookService", function($scope, $timeout, bookService) {

    // set active state on menu item
    angular.element("li.page-scroll").removeClass("active");
    angular.element("li.page-scroll").eq(1).toggleClass("active");

    // i can haz hack? for bookCover directive to know what page we are on
    $scope.currentPage = "wishlist";

    // call bookService to load my library
    $scope.books = bookService.getWishlist();

    // attempt to add book to library
    $scope.addBookToLibrary = function (book) {
        if (bookService.addLibraryBook(book)) {
            // success
            $scope.msgToUser = {
                message: book.volumeInfo.title + " has been added to your library and removed from your wishlist!",
                cssClass: "alert-success"
            };
        }
        else {
            // failure
            $scope.msgToUser = {
                message: book.volumeInfo.title + " is already in your library and was removed from your wishlist!!",
                cssClass: "alert-danger"
            };
        }

        // clear message after 5 seconds
        $timeout(function(){
            $scope.msgToUser = {};
        }, 5000);

        // remove book from wishlist in either case
        bookService.removeWishlistBook(book);
    };

    // remove book from library
    $scope.removeBookFromWishlist = function (book) {
        bookService.removeWishlistBook(book);

        $scope.msgToUser = {
            message: book.volumeInfo.title + " has been removed from your wishlist!",
            cssClass: "alert-success"
        };

        // clear message after 3 seconds
        $timeout(function(){
            $scope.msgToUser = {};
        }, 3000);
    };
} ]);
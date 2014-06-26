angular.module("fireplace").controller("libraryController", ["$scope", "$timeout", "bookService", function($scope, $timeout, bookService) {

    // set active state on menu item
    angular.element("li.page-scroll").removeClass("active");
    angular.element("li.page-scroll").eq(0).toggleClass("active");

    // i can haz hack? for bookCover directive to know what page we are on
    $scope.currentPage = "library";

    // call bookService to load my library
    $scope.books = bookService.getLibrary();

    // remove book from library
    $scope.removeBookFromLibrary = function(book) {
        bookService.removeLibraryBook(book);

        $scope.msgToUser = {
            message: book.volumeInfo.title + " has been removed from your library!",
            cssClass: "alert-success"
        };

        // clear message after 3 seconds
        $timeout(function(){
            $scope.msgToUser = {};
        }, 3000);
    };
} ]);
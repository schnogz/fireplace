angular.module("fireplace").controller("searchController", ["$scope", "$timeout", "bookService", function($scope, $timeout, bookService) {

    // scope defaults
    $scope.results = [];
    $scope.userSearch = "";

    // i can haz hack? for bookCover directive to know what page we are on
    $scope.currentPage = "search";

    $scope.submitSearch = function() {
        // ensure we have valid query
        if ($scope.userSearch.length > 0) {

            // save old search and clear current search
            $scope.lastSearch = $scope.userSearch;

            // call book service to execute search
            bookService.searchBooks($scope.userSearch).then(function (response) {
                $scope.results = response.data.items;
            });

            // clear current search
            $scope.userSearch = "";
        } else {
            // show error message to user
            $scope.msgToUser = {
                message: "Please enter a valid search!",
                cssClass: "alert-danger"
            };

            // clear message after 3 seconds
            $timeout(function(){
                $scope.msgToUser = {};
            }, 2000);
        }
    };

    // attempt to add book to library
    $scope.addBookToLibrary = function (book) {
        if (bookService.addLibraryBook(book)) {
            // success
            $scope.msgToUser = {
                message: book.volumeInfo.title + " has been added to your library!",
                cssClass: "alert-success"
            };
        }
        else {
            // failure
            $scope.msgToUser = {
                message: book.volumeInfo.title + " is already in your library!",
                cssClass: "alert-danger"
            };
        }

        // clear message after 3 seconds
        $timeout(function(){
            $scope.msgToUser = {};
        }, 3000);
    };

    // attempt to add book to wishlist
    $scope.addBookToWishlist = function (book) {
        if (bookService.addWishlistBook(book)) {
            // success
            $scope.msgToUser = {
                message: book.volumeInfo.title + " has been added to your wishlist!",
                cssClass: "alert-success"
            };
        }
        else {
            // failure
            $scope.msgToUser = {
                message: book.volumeInfo.title + " is already on your wishlist!",
                cssClass: "alert-danger"
            };
        }

        // clear message after 3 seconds
        $timeout(function(){
            $scope.msgToUser = {};
        }, 3000);
    };

    // ** this is purely for ease of development only. **
    // ** a user should never see the link to fire this function **
    $scope.clearLocalStorage = function () {
        localStorage.setItem("fireplace_library", JSON.stringify([]));
        localStorage.setItem("fireplace_wishlist", JSON.stringify([]));
        window.alert("all clear");
        location.reload();
    };
} ]);
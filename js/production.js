angular.module("fireplace", ["ngRoute", "ui.bootstrap", "angular-flippy", "ngEnter"])
    .config(["$routeProvider", function ($routeProvider) {
        $routeProvider.when("/home", {
            templateUrl: "search/searchTemplate.html",
            controller: "searchController"
        }).when("/library", {
            templateUrl: "library/libraryTemplate.html",
            controller: "libraryController"
        }).when("/wishlist", {
            templateUrl: "wishlist/wishlistTemplate.html",
            controller: "wishlistController"
        }).otherwise({
            redirectTo: "/home"
        });
    }
]);
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
angular.module("fireplace").directive("bookCover", function () {
    return {
        restrict: "E",
        replace: true,
        templateUrl: 'shared/bookCoverTemplate.html'
    };
});
angular.module('fireplace').factory('bookService', [ "$http", '$rootScope', "$location", function ($http, $rootScope, $location) {

    // indicates if user has localStorage
    var _hasLocalStorage = (typeof(Storage)!=="undefined") ? true : false;

    // the users wishlist
    var _userWishlist = [];

    // the users library
    var _userLibrary = [];

    // sync the users wishlist/library with localStorage
    var syncLocalStorage = function (target) {
        if (target === "library") {
            localStorage.setItem('fireplace_library', JSON.stringify(_userLibrary));
        }
        if (target === "wishlist") {
            localStorage.setItem('fireplace_wishlist', JSON.stringify(_userWishlist));
        }
    };

    // returning users need to sync app with localStorage
    if (_hasLocalStorage) {
        // only sync if something is populated
        if (localStorage.getItem("fireplace_wishlist") !== null) {
            _userWishlist = JSON.parse(localStorage.getItem('fireplace_wishlist'));
        }
        if (localStorage.getItem("fireplace_library") !== null) {
            _userLibrary = JSON.parse(localStorage.getItem('fireplace_library'));
        }
    }

    // remove active class from menu items if going back to homepage
    $('#homeLink').click(function (e) {
        $('li.page-scroll').removeClass('active');
    });

    return {

        // returns a pointer to the users library
        getLibrary: function() {
            return _userLibrary;
        },

        // returns a pointer to the users wishlist
        getWishlist: function() {
            return _userWishlist;
        },

        // add a book to a users library using local storage
        addLibraryBook: function(book) {

            // defense coding to ensure a book isn't added twice
            if (_.findIndex(_userLibrary, { 'id': book.id }) === -1) {
                _userLibrary.push(book);
                syncLocalStorage("library");

                // return true indicating success
                return true;
            }
            else {
                // return false indicating failure
                return false;
            }
        },

        // add a book to a users wishlist using local storage
        addWishlistBook: function(book) {
            // defense coding to ensure a book isn't added twice
            if (_.findIndex(_userWishlist, { 'id': book.id }) === -1) {
                _userWishlist.push(book);
                syncLocalStorage("wishlist");

                // return true indicating success
                return true;
            }
            else {
                // return false indicating failure
                return false;
            }
        },

        // remove a book from a users library using local storage
        removeLibraryBook: function(book) {
            _.remove(_userLibrary, function(libBook) {
                return libBook.id === book.id;
            });
            syncLocalStorage("library");
        },

        // remove a book from a users wishlist using local storage
        removeWishlistBook: function(book) {
            _.remove(_userWishlist, function(wishBook) {
                return wishBook.id === book.id;
            });
            syncLocalStorage("wishlist");
        },

        // search Gooogle's books api
        searchBooks : function(query) {
            // google api requires plus signs between words
            var searchString = query.split(' ').join('+');
            // personal google api key
            var apiKey = "AIzaSyCexFhQr_EKX3YEWIHZIqZKWXdI77xFBMQ";
            // construct url
            var constructedUrl = "https://www.googleapis.com/books/v1/volumes?q=" + searchString + "&startIndex=0&maxResults=25&key=" + apiKey;

            return $http({
                method : 'GET',
                url : constructedUrl
            })
            .success(function(response) {
                return response;
            })
            .error(function(data, status) {
                window.alert("Oops something went wrong. I should really handle errors better. Status:" + status);
            });
        }
    };
} ]);
angular.module('fireplace').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('library/libraryTemplate.html',
    "<div class=\"container containerSpace\">\r" +
    "\n" +
    "    <div class=\"row\">\r" +
    "\n" +
    "        <div class=\"col-md-8 col-md-offset-2 alert alert-dismissable text-center {{ msgToUser.cssClass }} marginTop15\" ng-show=\"msgToUser.message\">\r" +
    "\n" +
    "            <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-hidden=\"true\">&times;</button>\r" +
    "\n" +
    "            {{ msgToUser.message }}\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"col-md-12\">\r" +
    "\n" +
    "            <h1 class=\"text-center accentColor\">My Library</h1>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div class=\"row\">\r" +
    "\n" +
    "        <div ng-if=\"books.length === 0\" class=\"col-md-8 col-md-offset-2 text-center well well-lg h3\">Library is currently empty.</div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <div class=\"col-xs-12 col-sm-4 col-md-3 pageTitle\" ng-repeat=\"book in books\">\r" +
    "\n" +
    "            <book-cover bookData=\"book\"></book-cover>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('search/searchTemplate.html',
    "<section class=\"intro\" ng-show=\"results.length === 0\">\r" +
    "\n" +
    "    <div class=\"intro-body\">\r" +
    "\n" +
    "        <div class=\"container\">\r" +
    "\n" +
    "            <div class=\"row\">\r" +
    "\n" +
    "                <div class=\"col-md-8 col-md-offset-2\">\r" +
    "\n" +
    "                    <h1 class=\"brand-heading\">Fireplace</h1>\r" +
    "\n" +
    "                    <p class=\"intro-text\" >A book manager powered by Google.</p>\r" +
    "\n" +
    "                    <div class=\"containerSpace\">\r" +
    "\n" +
    "                        <div class=\"custom-search-form\">\r" +
    "\n" +
    "                            <input type=\"text\" class=\"form-control\" ng-model=\"userSearch\" ng-enter=\"submitSearch()\" placeholder=\"Enter a book title, author, or ISBN\">\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                        <div class=\"col-md-8 col-md-offset-2 alert alert-dismissable text-center {{msgToUser.cssClass}} marginTop15\" ng-show=\"msgToUser.message\">\r" +
    "\n" +
    "                            <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-hidden=\"true\">&times;</button>\r" +
    "\n" +
    "                            {{ msgToUser.message }}\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                        <div class=\"col-md-12 marginTop15\">\r" +
    "\n" +
    "                            <a href=\"\" class=\"btn btn-circle\" ng-click=\"submitSearch()\">\r" +
    "\n" +
    "                                <i class=\"glyphicon glyphicon-fire accentColor\" style=\"margin-left: -3px;\"></i>\r" +
    "\n" +
    "                            </a>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</section>\r" +
    "\n" +
    "\r" +
    "\n" +
    "<div class=\"container containerSpace\" ng-hide=\"results.length === 0\">\r" +
    "\n" +
    "    <div class=\"row\" style=\"margin: 5px;\">\r" +
    "\n" +
    "        <div class=\"col-md-8 col-md-offset-2 alert alert-dismissable text-center {{msgToUser.cssClass}} marginTop15\" ng-show=\"msgToUser.message\">\r" +
    "\n" +
    "            <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-hidden=\"true\">&times;</button>\r" +
    "\n" +
    "            {{ msgToUser.message }}\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"col-md-6 text-center\">\r" +
    "\n" +
    "            <h3>Search Results for <em>\"{{ lastSearch }}\"</em></h3>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"col-md-6\">\r" +
    "\n" +
    "            <div class=\"input-group custom-search-form\">\r" +
    "\n" +
    "                <input type=\"text\" class=\"form-control\" ng-model=\"userSearch\" ng-enter=\"submitSearch()\" placeholder=\"Enter a book title, author, or ISBN\">\r" +
    "\n" +
    "                <span class=\"input-group-btn\" ng-click=\"submitSearch()\">\r" +
    "\n" +
    "                    <button class=\"btn btn-default\" type=\"button\">\r" +
    "\n" +
    "                        <span class=\"glyphicon glyphicon-search\"></span>\r" +
    "\n" +
    "                    </button>\r" +
    "\n" +
    "                </span>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <div class=\"row\">\r" +
    "\n" +
    "        <div class=\"col-xs-12 col-sm-4 col-md-3 pageTitle\" ng-repeat=\"book in results\">\r" +
    "\n" +
    "            <book-cover bookData=\"book\"></book-cover>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('shared/bookCoverTemplate.html',
    "<flippy data-click-toggle=\"true\" data-mouseover-toggle=\"true\">\r" +
    "\n" +
    "    <flippy-front>\r" +
    "\n" +
    "        <img ng-src=\"{{ book.volumeInfo.imageLinks.thumbnail }}\">\r" +
    "\n" +
    "    </flippy-front>\r" +
    "\n" +
    "    <flippy-back>\r" +
    "\n" +
    "        <div class=\"thumbnail marginBottomClear\">\r" +
    "\n" +
    "            <div class=\"caption\">\r" +
    "\n" +
    "                <h4 class=\"marginBottom10\">{{ book.volumeInfo.title }}</h4>\r" +
    "\n" +
    "                <h5 class=\"marginBottom10\"><em>{{ book.volumeInfo.authors[0] }}</em></h5>\r" +
    "\n" +
    "                <div class=\"bookInfoContainer\">\r" +
    "\n" +
    "                    <p class=\"h5\"><strong>Genre: </strong> {{ book.volumeInfo.categories[0] }} </p>\r" +
    "\n" +
    "                    <p class=\"h5 bookDescription\">{{ book.volumeInfo.description }}</p>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <p class=\"marginBottom10\">\r" +
    "\n" +
    "                    <a ng-href=\"{{ book.volumeInfo.infoLink }}\" target=\"_blank\" class=\"btn btn-default\" role=\"button\">More Info</a>\r" +
    "\n" +
    "                    <a ng-href=\"{{ book.volumeInfo.previewLink }}\" target=\"_blank\" class=\"btn btn-default\" role=\"button\">Preview</a>\r" +
    "\n" +
    "                </p>\r" +
    "\n" +
    "                <div ng-if='$parent.currentPage === \"search\"'>\r" +
    "\n" +
    "                    <a ng-href=\"\" target=\"_blank\" class=\"btn btn-success btn-block\" role=\"button\" ng-click=\"addBookToLibrary(book)\">Add to Library</a>\r" +
    "\n" +
    "                    <a ng-href=\"\" target=\"_blank\" class=\"btn btn-info btn-block\" role=\"button\" ng-click=\"addBookToWishlist(book)\">Add to Wishlist</a>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div ng-if='$parent.currentPage === \"library\"'>\r" +
    "\n" +
    "                    <a ng-href=\"\" target=\"_blank\" class=\"btn btn-danger btn-block\" role=\"button\" ng-click=\"removeBookFromLibrary(book)\">Remove From Library</a>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div ng-if='$parent.currentPage === \"wishlist\"'>\r" +
    "\n" +
    "                    <a ng-href=\"\" target=\"_blank\" class=\"btn btn-success btn-block\" role=\"button\" ng-click=\"addBookToLibrary(book)\">Add to Library</a>\r" +
    "\n" +
    "                    <a ng-href=\"\" target=\"_blank\" class=\"btn btn-danger btn-block\" role=\"button\" ng-click=\"removeBookFromWishlist(book)\">Remove From Wishlist</a>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </flippy-back>\r" +
    "\n" +
    "</flippy>"
  );


  $templateCache.put('wishlist/wishlistTemplate.html',
    "<div class=\"container containerSpace\">\r" +
    "\n" +
    "    <div class=\"row\">\r" +
    "\n" +
    "        <div class=\"col-md-8 col-md-offset-2 alert alert-dismissable text-center {{ msgToUser.cssClass }} marginTop15\" ng-show=\"msgToUser.message\">\r" +
    "\n" +
    "            <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-hidden=\"true\">&times;</button>\r" +
    "\n" +
    "            {{ msgToUser.message }}\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"col-md-12\">\r" +
    "\n" +
    "            <h1 class=\"text-center accentColor\">My Wishlist</h1>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div class=\"row\">\r" +
    "\n" +
    "        <div ng-if=\"books.length === 0\" class=\"col-md-8 col-md-offset-2 text-center well well-lg h3\">Wishlist is currently empty.</div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <div class=\"col-xs-12 col-sm-4 col-md-3 pageTitle\" ng-repeat=\"book in books\">\r" +
    "\n" +
    "            <book-cover bookData=\"book\"></book-cover>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>"
  );

}]);

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
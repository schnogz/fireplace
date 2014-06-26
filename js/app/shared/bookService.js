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
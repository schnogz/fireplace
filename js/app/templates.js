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

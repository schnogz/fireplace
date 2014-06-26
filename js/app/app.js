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
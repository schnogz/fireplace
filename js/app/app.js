angular.module("fireplace", ["ngRoute", "ui.bootstrap", "angular-flippy", "ngEnter"])
    .config(["$routeProvider", function ($routeProvider) {
        $routeProvider.when("/home", {
            templateUrl: "js/app/search/searchTemplate.html",
            controller: "searchController"
        }).when("/library", {
            templateUrl: "js/app/library/libraryTemplate.html",
            controller: "libraryController"
        }).when("/bucketlist", {
            templateUrl: "js/app/wishlist/wishlistTemplate.html",
            controller: "wishlistController"
        }).otherwise({
            redirectTo: "/home"
        });
    }
]);
angular.module("fireplace").directive("bookCover", function () {
    return {
        restrict: "E",
        replace: true,
        templateUrl: 'shared/bookCoverTemplate.html'
    };
});
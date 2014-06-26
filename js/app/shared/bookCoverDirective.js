angular.module("fireplace").directive("bookCover", function () {
    return {
        restrict: "E",
        replace: true,
        templateUrl: 'js/app/shared/bookCoverTemplate.html'
    };
});
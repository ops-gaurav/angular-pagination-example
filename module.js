var app = angular.module ('app', []);
app.controller ('PaginationController', ['$scope', 'PaginationService', function ($scope, PaginationService) {
	var data = [
		{id:  1 , value: "some value"},
		{id:  2 , value: "some value"},
		{id:  3 , value: "some value"},
		{id:  4 , value: "some value"},
		{id:  5 , value: "some value"},
		{id:  6 , value: "some value"},
		{id:  7 , value: "some value"},
		{id:  8 , value: "some value"},
		{id:  9 , value: "some value"},
		{id:  10 , value: "some value"},
		{id:  11 , value: "some value"},
		{id:  12 , value: "some value"},
		{id:  13 , value: "some value"},
		{id:  14 , value: "some value"},
		{id:  15 , value: "some value"},
		{id:  16 , value: "some value"},
		{id:  17 , value: "some value"},
		{id:  18 , value: "some value"},
		{id:  19 , value: "some value"},
		{id:  20 , value: "some value"},
		{id:  21 , value: "some value"},
		{id:  22 , value: "some value"},
		{id:  23 , value: "some value"},
		{id:  24 , value: "some value"},
		{id:  25 , value: "some value"},
		{id:  26 , value: "some value"},
		{id:  27 , value: "some value"},
		{id:  28 , value: "some value"},
		{id:  29 , value: "some value"},
		{id:  30 , value: "some value"},
		{id:  31 , value: "some value"},
		{id:  32 , value: "some value"},
		{id:  33 , value: "some value"},
		{id:  34 , value: "some value"},
		{id:  35 , value: "some value"},
		{id:  36 , value: "some value"},
		{id:  37 , value: "some value"},
		{id:  38 , value: "some value"},
		{id:  39 , value: "some value"},
		{id:  40 , value: "some value"},
		{id:  41 , value: "some value"},
		{id:  42 , value: "some value"},
		{id:  43 , value: "some value"},
		{id:  44 , value: "some value"},
		{id:  45 , value: "some value"},
		{id:  46 , value: "some value"},
		{id:  47 , value: "some value"},
		{id:  48 , value: "some value"},
		{id:  49 , value: "some value"},
		{id:  50 , value: "some value"},
		{id:  51 , value: "some value"},
		{id:  52 , value: "some value"},
		{id:  53 , value: "some value"},
		{id:  54 , value: "some value"},
		{id:  55 , value: "some value"},
		{id:  56 , value: "some value"},
		{id:  57 , value: "some value"},
		{id:  58 , value: "some value"},
		{id:  59 , value: "some value"},
		{id:  60 , value: "some value"},
		{id:  61 , value: "some value"},
		{id:  62 , value: "some value"},
		{id:  63 , value: "some value"},
		{id:  64 , value: "some value"},
		{id:  65 , value: "some value"},
		{id:  66 , value: "some value"},
		{id:  67 , value: "some value"},
		{id:  68 , value: "some value"},
		{id:  69 , value: "some value"},
		{id:  70 , value: "some value"},
		{id:  71 , value: "some value"},
		{id:  72 , value: "some value"},
		{id:  73 , value: "some value"},
		{id:  74 , value: "some value"},
		{id:  75 , value: "some value"},
		{id:  76 , value: "some value"},
		{id:  77 , value: "some value"},
		{id:  78 , value: "some value"},
		{id:  79 , value: "some value"},
		{id:  80 , value: "some value"},
		{id:  81 , value: "some value"},
		{id:  82 , value: "some value"},
		{id:  83 , value: "some value"},
		{id:  84 , value: "some value"},
		{id:  85 , value: "some value"},
		{id:  86 , value: "some value"},
		{id:  87 , value: "some value"},
		{id:  88 , value: "some value"},
		{id:  89 , value: "some value"},
		{id:  90 , value: "some value"},
		{id:  91 , value: "some value"},
		{id:  92 , value: "some value"},
		{id:  93 , value: "some value"},
		{id:  94 , value: "some value"},
		{id:  95 , value: "some value"},
		{id:  96 , value: "some value"},
		{id:  97 , value: "some value"},
		{id:  98 , value: "some value"},
		{id:  99 , value: "some value"},
		{id:  100 , value: "some value"}
	];

	$scope.pages = {};

	function initController () {
		$scope.updatePage (1);
	}

	$scope.updatePage= function (number) {
		$scope.pages = PaginationService.getPage(data.length, 10, number);
		$scope.items = data.slice ($scope.pages.startIndex, $scope.pages.endIndex);

		console.log ($scope.items);
	}

	initController ();
	
}]);
app.factory ('PaginationService', function () {
	return {
		getPage: function (totalItems, pageItems, currentPage) {
			pageItems = pageItems || 10;
			currentPage = currentPage || 1;

			var totalPages = Math.ceil ( totalItems / pageItems);

			var startIndex = ( (currentPage - 1) * pageItems );
			var endIndex = Math.min (startIndex + pageItems, totalItems);

			var pageIndexes = [];
			if (currentPage <= 3) 
				for (var i=1; i<=6; i++)
					pageIndexes.push (i);
			else if (currentPage == totalPages)
				for (var i=totalPages-5; i<=totalPages; i++) 
					pageIndexes.push (i);
			else {
				for (var i=currentPage-3; i<=currentPage; i++) 
					pageIndexes.push (i);
				for (var i=currentPage+1; i<=currentPage+2; i++) {
					if (i > totalPages)
						break;
					pageIndexes.push (i);
				}
			}

			return {
				totalPages: totalPages,
				currentPage: currentPage,
				pageItems: pageItems,
				startIndex: startIndex,
				endIndex: endIndex,
				pages: pageIndexes
			}
		}
	};
});
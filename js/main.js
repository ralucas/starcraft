$(function(){

	//sorts by username
	var sortUser = {};
	sortUser = _.sortBy(starcraftObj.data, function(arr){
		return arr[0];
	});

	//sorts by fullname
	var sortName = {};
	sortName = _.sortBy(starcraftObj.data, function(arr){
		return arr[1];
	});

	//sorts by region
	var sortRegion = {};
	sortRegion = _.sortBy(starcraftObj.data, function(arr){
		return arr[2];
	});

	//sorts by race
	var sortRace = {};
	sortRace = _.sortBy(starcraftObj.data, function(arr){
		return arr[3];
	});

	//sorts by wins
	var sortWins = {};
	sortWins = _.sortBy(starcraftObj.data, function(arr){
		return arr[4];
	});

	//sorts by losses
	var sortLosses = {};
	sortLosses = _.sortBy(starcraftObj.data, function(arr){
		return arr[5];
	});

	//takes out commas in username data
	_.each(starcraftObj.data, function(arr){
		var newName = arr[0].replace(/,/i,'');
		arr[0] = newName;
	});

	//total num of players
	var totPlayers = _.size(starcraftObj.data);

	//total games played
	var gamesPlayed = _.reduce(starcraftObj.data, function(memo, arr){
		return memo + arr[4];
	}, 0);

	//race popularity
	var racePop = _.countBy(starcraftObj.data, function(arr){
		return arr[3];
	});

	var maxRp = _.max(racePop);

	var racePopFunc = function(obj){
		for(var x in obj){
			if(maxRp === obj[x]){
				return x;
			}
		}
	};

	var mostPopRace = racePopFunc(racePop);

	//filter function
	var f = function (arr, index, value){
		var filtered = [];
		for(var i = 0; i < arr.length; i++){
			if(value === arr[i][index])
				filtered.push(arr[i]);
		}
		return filtered;
	};

	//split array for pagination
	var splitArray = function (arr, count){
		var newArray = [];
		var totArrays = 0;
		var sub = count - (arr.length%count);
		if(arr.length <= count){
			return arr;
		}
		else{
			if(arr.length%count === 0){
				totArrays = Math.floor(arr.length/count);
			}
			else{
				totArrays = Math.floor(arr.length/count) + 1;
			}
			for(var i = 0; i < totArrays; i++){
				var l = 0;
				if(i < totArrays - 1){
					l = count*(i+1);
				}
				else{
					l = (count*(i+1)) - sub;
				}
				var k = (count*i);
				newArray[i] = [];
				for(var j = k; j < l; j++){
					newArray[i].push(arr[j]);
				}
			}
		}
		return newArray;
	};

	//Regions filters
	var regionsArr = _.pluck(sortRegion, 2);
	var regionsUniq = _.uniq(regionsArr);
	var buildRegions = function(x){
		return ['li', [
		['a', {href: x.url }, x]
		]];
	};
	
	//Race filters
	var raceArr = _.pluck(sortRace, 3);
	var raceUniq = _.uniq(raceArr);
	var buildRaces = function(x){
		return ['li', [
		['a', {href: x.url }, x]
		]];
	};

	//creates overall stats
	$('.stats-data').append(Creatable.create(['tr', [
		['td', totPlayers],
		['td', gamesPlayed],
		['td', mostPopRace],
		]]));

	//appends column headings
	var colHeads = function(arr){
		for(var i = 0; i < arr.length; i++){
			$('.table-head tr').append('<th class="col-head">'+
			arr[i]+'</th>'
			);
		}
	};
		
	//appends data to table
	var appendData = function(arr){
		$('.table-data').empty();
		for(var i = 0; i < arr.length; i++){
			$('.table-data').append(Creatable.create(['tr', [
				['td', arr[i][0]],
				['td', arr[i][1]],
				['td', arr[i][2]],
				['td', arr[i][3]],
				['td', arr[i][4]],
				['td', arr[i][5]]
			]]));
		}
	};

	//renders table data
	colHeads(starcraftObj.cols);
	appendData(starcraftObj.data);

	//sort on click event
	var clickArr = [sortUser, sortName, sortRegion, sortRace, sortWins, sortLosses];

	$('.col-head').each(function(i){
		$(this).on('click', function(){
			appendData(clickArr[i]);
			clickArr[i].reverse();
		});
	});

	//filter buttons
	$('.filter-click').on('click', function(){
		$('.filter-click').css('display', 'none');
		$('.filter-buttons').css('display','block');
	});

	$('.search-filter').on('click', function(){
		$('.filter-buttons').css('display','none');
		$('.search-input').css('display', 'block');
	});
	
	$('.srch-btn').on('click', function(){
		$('.search-input').css('display', 'none');
		$('.filter-click').css('display', 'block');
	});

	//filter region
	$('.regions-dd').append(Creatable.create(
		_.map(regionsUniq, buildRegions)));

	$('.region-filter').on('click', 'li', function(){
		var regionPicked = $(this).text();
		$(this).parent().prev().text('Region: '+regionPicked+' ').append('<span class="caret"></span>');
		var regionsFiltered = f(starcraftObj.data, 2, regionPicked);
		appendData(regionsFiltered);
	});

	//filter race
	$('.race-dd').append(Creatable.create(
		_.map(raceUniq, buildRaces)));

	$('.race-filter').on('click', 'li', function(){
		var racePicked = $(this).text();
		$(this).parent().prev().text('Race: '+racePicked+' ').append('<span class="caret"></span>');
		var racesFiltered = f(starcraftObj.data, 3, racePicked);
		appendData(racesFiltered);
	});

	//search filter
	$('.srch-btn').on('click', function(){
		var searchVal = $('#search-value').val();
		var usersFiltered = f(starcraftObj.data, 1, searchVal);
		appendData(usersFiltered);
	});

	//reset button
	$('.reset').on('click', function(){
		appendData(starcraftObj.data);
		$('.search-input').css('display', 'none');
		$('.filter-buttons').css('display','none');
		$('.filter-click').css('display', 'block');
	});
	
	//paginate
	var qtyPerPage = 21;
	var numItems = $('.table-data tr').length;
	var pages = Math.round(numItems/qtyPerPage);

	console.log(pages);
	//need to put each page number on it dynamically
	('.pagination').append(Createable.create(['ul', [
		['li a', {href: '#'}, '&laquo;'],
		['li a', {href: x}, x],
		['li a', {href: '#'}, '&raquo;']
		]]));
	//split up array and then do appendData

	// if(numItems > qtyPerPage){
	// 	var splits = splitArray(starcraftObj.data, qtyPerPage);
	// 	for(var i = 0; i < splits.length; i++){
	// 		appendData(splits[i]) //to each page
	// 	}
	// }
});
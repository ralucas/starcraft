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

	//filter
	$('button').on('click', function(){
		var filter = $('input').val();
		$('.table-data').empty();
		$('tr:contains('+filter+')').append(
			);
	});
	
	//paginate
	var qtyPerPage = 20;
	var numItems = $('.table-data tr').length;
	var pages = Math.floor(numItems/qtyPerPage);


	//$('.table-data').children().css('display', 'none');


});
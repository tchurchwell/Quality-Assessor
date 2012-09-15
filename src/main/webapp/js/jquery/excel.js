function getURLParameter(name) {
	return decodeURI((RegExp(name + '=' + '(.+?)(&|$)').exec(location.search) || [
			, null ])[1]);
}

$(function() {
	var key = getURLParameter("key");
	var requestedUserId = getURLParameter("requestedUserId");
	$.ajax({
		type : 'GET',
		url : 'domainHierarchy?key='+key+'&requestedUserId='+requestedUserId,
		success : function(data) {
			var ul = "";
			ul += '<table style="margin-top:15px;border-color: #999999;border-style: solid;" class="imagetable" id="excelId">';
			data = JSON.parse(data);
			ul += "<tr><td style='border-bottom:none'>" + data.title + "</td><td></td><td></td><td></td></tr>"
			children = data.children;

			// Second Level
			if (children != null) {

				var arr = children;
				for (i = 0; i < arr.length; i++) {
					obj = arr[i];
					
					children = obj.children;

					// Third Level
					if (children != null) {

						ratingStarHtml = getRatingStarHtml(obj.score, false);
						ul += "<tr childCount=" + children.length
								+ "><td style='border-top:none;border-bottom:none;'></td><td style='border-bottom:none'>" + obj.title
								+ "</td><td></td><td score=" + obj.score
								+ " id=p" + i + ">" + ratingStarHtml
								+ "</td></tr>";
						// ul += "<tr></tr>";
						var arr1 = children;
						for (j = 0; j < arr1.length; j++) {
							obj1 = arr1[j];

							score = obj1.score;
							weightage = obj1.weightage;
							key = obj1.key;
							ratingStarHtml = getRatingStarHtml(score, true);
							
							ul += "<tr><td style='border-top:none;border-bottom:none;'></td><td style='border-top:none;border-bottom:none;'></td><td  i=" + i + " j="
									+ j + ">" + obj1.title
									+ "</td><td  assessmentId="
									+ obj1.assessmentId + " id=" + key
									+ " parentId=p" + i + " weightage="
									+ weightage + " score=" + score + ">"
									+ ratingStarHtml + "</td></tr>";

						}
						// ul += "<tr></tr>";
					} else {
						ratingStarHtml = getRatingStarHtml(obj.score, true);
						ul += "<tr childCount=0><td style='border-top:none;border-bottom:none;'></td><td>" + obj.title
								+ "</td><td></td><td assessmentId="
								+ obj.assessmentId + " id=" + obj.key + ">"
								+ ratingStarHtml + "</td></tr>";
					}

				}

			}
			ul += '</table>'
			$('#excelDivId').append(ul);
		},
		error : function(jqXHR, textStatus, errorThrown) {
			// showErrorMessage(jqXHR.responseText, "450", "300");
		},
		dataType : 'text'
	});

	
//var starExplStr='<table style="margin-top:15px"><tr><td style="width:30%"><img class="toggle" src="images/yellowstar.png"> <img class="toggle" src="images/yellowstar.png"> <imgclass="toggle" src="images/yellowstar.png"> <img class="toggle" src="images/yellowstar.png"> <img class="toggle" src="images/yellowstar.png"></td><td style="width:25%">Excellent</td></tr><tr><td><img class="toggle" src="images/yellowstar.png"> <imgclass="toggle" src="images/yellowstar.png"> <img class="toggle" src="images/yellowstar.png"> <img class="toggle" src="images/yellowstar.png"> <img class="toggle" src="images/whitestar.gif"></td><td>Very Good</td></tr><tr><td><img class="toggle" src="images/yellowstar.png"> <img	class="toggle" src="images/yellowstar.png"> <img	class="toggle" src="images/yellowstar.png"> <img	class="toggle" src="images/whitestar.gif"> <img	class="toggle" src="images/whitestar.gif"></td><td>Good</td></tr><tr><td><img class="toggle" src="images/yellowstar.png"> <img	class="toggle" src="images/yellowstar.png"> <img	class="toggle" src="images/whitestar.gif"> <img	class="toggle" src="images/whitestar.gif"> <img	class="toggle" src="images/whitestar.gif"></td><td>Bad</td></tr><tr><td><img class="toggle" src="images/yellowstar.png"> <img	class="toggle" src="images/whitestar.gif"> <img	class="toggle" src="images/whitestar.gif"> <img	class="toggle" src="images/whitestar.gif"> <img	class="toggle" src="images/whitestar.gif"></td><td>Very Bad</td></tr></table>';
//	$('#explanationStarId').append(starExplStr);
	
});

function getRatingStarHtml(score, editable) {
	// alert("rating score" + score);
	ratingStarHtml = "";
	score = Math.round(score);
	if (editable == true) {
		for (k = 0; k < score; k++) {
			ratingStarHtml = ratingStarHtml
					+ "<img class='toggle'  src='images/yellowstar.png'></img>";
		}

		var noOfWhiteStars = 5 - score;
		for (m = 0; m < noOfWhiteStars; m++) {
			ratingStarHtml = ratingStarHtml
					+ "<img class='toggle'  src='images/whitestar.gif'></img>";
		}
	} else {
		for (k = 0; k < score; k++) {
			ratingStarHtml = ratingStarHtml
					+ "<img   src='images/yellowstar.png'></img>";
		}

		var noOfWhiteStars = 5 - score;
		for (m = 0; m < noOfWhiteStars; m++) {
			ratingStarHtml = ratingStarHtml
					+ "<img   src='images/whitestar.gif'></img>";
		}
	}
	return ratingStarHtml;
}

$(".toggle").live('click', function() {
	previousScore = $(this).parent().attr("score");
	score = previousScore;
	alert("yellow" + score);
	if ($(this).attr('src') == 'images/whitestar.gif') {
		$(this).attr('src', "images/yellowstar.png");
		$(this).prevAll().attr('src', "images/yellowstar.png");
		score = $(this).index() + 1;
		// var node = $("#tree").dynatree("getActiveNode");
		// saveRating(node, score, requestedUserId);
	} else {
		// alert($(this).index());
		$(this).attr('src', "images/whitestar.gif");
		$(this).nextAll().attr('src', "images/whitestar.gif");
		score = $(this).index() - 1;
		if (score == -1) {
			score = 0;
		}
		// alert(score);

		// var node = $("#tree").dynatree("getActiveNode");
		// saveRating(node, score, requestedUserId);

	}
	$(this).parent().attr("score", score);
	id = $(this).parent().attr("id");
	assessmentId = $(this).parent().attr("assessmentId");
	parentId = $(this).parent().attr("parentId");
	if (parentId != null) {
		weightage = $(this).parent().attr("weightage");
		parentScore = (score - previousScore) * weightage / 100;
		parentPrevScore = $('#' + parentId).attr("score");
		updatedScore = parseFloat(parentPrevScore) + parentScore;
		alert(updatedScore);
		$('#' + parentId).attr("score", updatedScore);
		$('#' + parentId).html(getRatingStarHtml(updatedScore, true));
		// alert(score);
	}
	saveRating(id, assessmentId, score, "null");
	// else {
	// if (($(this).next().length == 0)
	// || ($(this).next().attr('src') == 'images/whitestar.gif')) {
	// $(this).attr('src', "images/whitestar.gif");
	// score = $(this).index();
	// }
	// }
});

$(function() {
	$('td').live(
			'click',
			function() {
				var colIndex = $(this).parent().children().index($(this));
				var rowIndex = $(this).parent().parent().children().index(
						$(this).parent());
				// alert('Row: ' + rowIndex + ', Column: ' + colIndex);
			});
});

function saveRating(id, assessmentId, updatedScore, requestedUserId) {
	// alert(score);
	var data = {
		key : id,
		score : updatedScore,
		id : assessmentId,
		requestedUserId : requestedUserId
	};
	var url = 'rate';
	$.ajax({
		type : 'POST',
		url : url,
		data : data,
		success : function(assessmentId) {

		},
		error : function(jqXHR, textStatus, errorThrown) {
			// showErrorMessage(jqXHR.responseText, "450", "300");
		},
		dataType : 'text'
	});
}


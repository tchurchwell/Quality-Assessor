// Add code to initialize the tree when the document is loaded:
$(function() {

	$("#tree").dynatree(
			{
				initAjax : {
					url : "domains",
					data : {
						key : "0", // Optional arguments to append to the url
						mode : "all"
					}
				},
				onLazyRead : function(node) {
					node.appendAjax({
						url : "domains",
						data : {
							"key" : node.data.key, // Optional url arguments
							"mode" : "all"
						}
					});
				},
				onClick : function(node, event) {
					if (node.getEventTargetType(event) == "title") {
						var parentKey = node.data.parentKey;
						var key = node.data.key;
						var title = node.data.title;
						var weightage = node.data.weightage;
						$.colorbox({
							href : 'domainSettings?key=' + key + '&parentKey='
									+ parentKey + '&title=' + title
									+ '&weightage=' + weightage,
							open : true,
							iframe : true,
							width : "400px",
							height : "280px",
							opacity : 0.9,

						});

					}
				}

			});
});

function updateNode(title, weightage) {
	var node = $("#tree").dynatree("getActiveNode");
	node.data.title = title;
	node.data.weightage = weightage;
	node.render();
}

function addRootNode(node1) {
	node = $("#tree").dynatree("getRoot");
	var childNode = node.addChild(node1);
}

function addNode(node1) {
	var node = $("#tree").dynatree("getActiveNode");
	var childNode = node.addChild(node1);
}

function deleteNode() {
	var node = $("#tree").dynatree("getActiveNode");
	node.remove();
}

function showAddRootDomainView() {
	$.colorbox({
		href : 'domainSettings',
		open : true,
		iframe : true,
		width : "400px",
		height : "280px",
		opacity : 0.9,
	});
}
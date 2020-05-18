var $ = jQuery;

$(function() {
	initCmCourseModal();
 });

function initCmCourseModal() {
	initFancyTree();
	initCmEntriesSelect();
}

function initFancyTree() {
	$("#cm-tree").fancytree({
		extensions: ['glyph', 'edit', 'wide', 'table'],
		glyph: {
			preset: 'awesome4',
		},
		edit: {
			triggerStart: ['dblclick']
		},
		wide: {
			iconWidth: '24px',     // Adjust this if @fancy-icon-width != "16px"
			iconSpacing: '8px',   // Adjust this if @fancy-icon-spacing != "3px"
			labelSpacing: '3px',  // Adjust this if padding between icon and label != "3px"
			levelOfs: '0px'       // Adjust this if ul padding != "16px"
		},
		table: {
			indentation: 16,         // indent every node level by 16px
			nodeColumnIdx: 1         // render node expander, icon, and title to this column (default: #0)
		},
		source: [{
			title: 'root',
			folder: true,
			isroot: true,
		}],
		renderColumns: function (event, data) {
			var node = data.node,
				$tdList = $(node.tr).find(">td");

			// Column #0 should contain the index as plain text, e.g. '2.7.1'
			$tdList.eq(0)
				.text(node.getIndexHier().substring(2))
				.addClass("alignRight");

			// (Column #1 is rendered by fancytree)
			if (!node.data.isroot) {
				$tdList.eq(2).html("<button type='button' role='button' class='button danger' onclick='cmDeleteNode(\"#cm-tree\",\"" + node.key + "\")' > <i class=\"fa fa-trash\"></i></button>");
			}

		}
	});

	$('#cm_modal_new_module_btn').click(function () {
		let cmTree = $.ui.fancytree.getTree("#cm-tree");
		var selected_node = cmTree.getActiveNode(); //still returns deleted nodes
		var module_name = $('#cm_modal_new_module_txt').val();
		module_name=module_name.trim();
		if(module_name.length>0) {
			addModule(cmTree, selected_node, module_name);
		}
	});
}

function initCmEntriesSelect() {
	$('#cm_modal_add_entry_select').select2({
		ajax: {
			url: wpApiSettings.root+wpApiSettings.versionString+'posts',
			dataType: 'json',
			delay: 250,
			data:function (params){
				return {
					_fields:'title,id',
					page:params.page || 1,
					per_page:20,
					search: params.term,
					status:'publish'
				};
			},
			transport: function(params, success, failure) {
				// Custom transport lets us get pagination info stored in the headers.
				// Check for X-Page and X-Total-Pages, and alternatively for Link rel=next
				var current_page = params.data.page;
				var read_headers = function(data, textStatus, jqXHR) {
					var more;
					var total_pages = parseInt(jqXHR.getResponseHeader('X-Total-Pages')) || 0;
					var link = jqXHR.getResponseHeader('Link') || '';
					if ((current_page < total_pages) || (link.search(/<([^>]+)>;\s*rel\s*=\s*['"]?next['"]?\s*(,|$)/i) > -1)) {
						more = true;
					}
					else {
						more = false;
					}
					return {
						results: data,
						pagination: {
							more: more
						}
					};
				};
				var $request = $.ajax(params);
				$request.then(read_headers).then(success);
				$request.fail(failure);
			},
			processResults: function (data, params) {
				params.page = params.page || 1;

				return {
					results: data.results.map(function (currentValue) {
						return {
							id:currentValue.id,
							text:typeof (currentValue.title) == "string" ?currentValue.title:currentValue.title.rendered
						}
					}),
					pagination: {
						more: data.pagination.more
					}
				};
			}

		}
	});


	$('#cm_modal_add_entry_btn').click(function () {
		var selected_entry = $('#cm_modal_add_entry_select').select2('data');

		let cmTree = $.ui.fancytree.getTree("#cm-tree");
		var selected_node = cmTree.getActiveNode(); //still returns deleted nodes

		if(selected_entry.length==0){
			alert("You must select a valid entry post")
			return; //nothing to add
		}

		addEntry(cmTree, selected_node, selected_entry[0]);


	});

}

function addModule(tree,parent,name) {
	if(parent){ //check that parent exists
		parent=tree.getNodeByKey(parent.key);
	}
	if(parent==null){
		parent = tree.getRootNode();
		if(parent.getChildren().length>0) {
			parent = parent.getChildren()[0];
		}
	}

	if(!parent.isFolder()){
		alert('Kindly select a valid segment');
		return;
	}


	let nodeData = {
		checkbox:false,
		folder:true,
		title:name,
		visible:true
	};
	parent.addNode(nodeData);
	parent.setExpanded(true);
}


function addEntry(tree,parent,entry) {
	if(parent){ //check that parent exists
		parent=tree.getNodeByKey(parent.key);
	}

	if(parent==null){
		parent = tree.getRootNode();
		if(parent.getChildren().length>0) {
			parent = parent.getChildren()[0];
		}
	}

	if(!parent.isFolder()){
		alert('Kindly select a valid segment');
		return;
	}

	let nodeData = {
		checkbox:false,
		folder:false,
		title:entry.text,
		visible:true,
		post_id:entry.id
	};
	parent.addNode(nodeData);
	parent.setExpanded(true);
}


function cmDeleteNode(tree,key) {
	let cmTree = $.ui.fancytree.getTree(tree);
	let node=cmTree.getNodeByKey(key);
	if(node){
		node.remove();
	}
}

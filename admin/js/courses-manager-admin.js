var $ = jQuery;

$(function() {
	initCmCourseModal();
 });


function initCmCourseModal() {

	$("#cm-tree").fancytree({
		extensions: ['glyph','edit','wide','table'],
		glyph:{
			preset:'awesome4',
		},
		edit:{
			triggerStart:['dblclick']
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
			title:'root',
			folder:true,
			isroot:true,
		}],
		renderColumns:function (event,data) {
			var node = data.node,
			$tdList = $(node.tr).find(">td");

			// Column #0 should contain the index as plain text, e.g. '2.7.1'
			$tdList.eq(0)
				.text(node.getIndexHier().substring(2))
				.addClass("alignRight");

			// (Column #1 is rendered by fancytree)
			if(!node.data.isroot){
				$tdList.eq(2).html("<button type='button' role='button' class='button danger' onclick='cmDeleteNode(\"#cm-tree\",\""+node.key+"\")' > <i class=\"fa fa-trash\">delete</i></button>");
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
	let nodeData = {
		checkbox:false,
		folder:true,
		title:name,
		visible:true
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

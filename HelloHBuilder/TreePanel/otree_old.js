/**
 * 页面 JS Tree 的实现
 * Copyright (c) 2009 YaoYiLang 
 * @email  redrainyi@gmail.com
 * @datetime 2009-9-13 15:03:58
 * @version 1.6
 */
OTree = function(){
	this._id = this.getUniqueID();
	this._nodeHash = {};
	this._icoPath = 'img/';
	this.root = null;
	this.selectedNode = null;
	this.clickListeners = [];

	this.searchKeys = '';
	this.searchHash = {};
	this._divider = '\x07';
	this._separator = '\x0f';

	this._separatorRegExp = new RegExp(this._separator, "g");
	
	this.element = document.createElement('div');
	this.element.className='otree';
	this.container = null;
	this.className = 'yyl.OTree';
	this.initialize.apply(this, arguments);
	this.__initEvent();
	window[this._id]=this;
	this.registerDestroy();
};

OTree.prototype={
	pathSeparator: "/",
	initialize : function(info){
		alert(info.isPrototypeOf(Array));
		if(String.isInstance(info['icoPath'])){
			this._icoPath = info['icoPath'];
		};
		this.container = String.isInstance(info['panel']) ? document.getElementById(info['panel']) : info['panel'];
		if(Array.isInstance(info['data'])){
			this.dataFormat(info['data']);
		}else{
			this.dataFormat([]);
		}
	},
	getUniqueID : function(){
		return ('yTree_' + (new Date().getTime()) + '_' + parseInt(Math.random()*10000));
	},
	dataFormat : function(data){
		var keys = [];
		for(var i = 0 ; i < data.length ; i++){
			var model = data[i];
			var node = new OTree.Node(model,this);
			if(model.pid == '-1'){
				this.root = node;
			}
			this._putHash(node);
			keys.push( '' + node.pid + this._divider + node.id);
		}
		this.searchKeys = keys.join(this._separator+this._separator);
	},
	paint : function(){
		this.element.innerHTML = ''
		if(this.root){
			this.root.paint();
		}
		if(this.container){
			this.container.appendChild(this.element);
		}
		//setTimeout( 'window[\'' + this._id + '\'].initAllNodeData()', 100);
	},
	getSelectedNode : function(){
		return this.selectedNode;
	},
	getElement : function(){
		return this.element;
	},
	_putHash : function(node,flag){
		var nodekey = node.pid + this._divider + node.id;
		this._nodeHash[node.id]=node;
		if(!this.searchHash[nodekey]){
			this.searchHash[nodekey] = node;
			if(!flag){
				this.searchKeys = this._separator + nodekey;
			}
		}
	},
	_removeHash : function(node){
		var nodekey = node.pid + this._divider + node.id;
		delete this._nodeHash[node.id];
		delete this.searchHash[nodekey];
	},
	updateNode : function(item,select){
		var node = this._nodeHash[item.id];
		if(node==null){
			this.appendNode(item,select);
		}else{
			node.update(item);
		}
	},
	appendNode : function(item,select){
		var oldNode = this._nodeHash[item.id];
		if(oldNode){
			this.removeNode(oldNode);
		}
		var node = new OTree.Node(item,this);
		var parentNode = node.getParentNode();
		if(parentNode){
			parentNode.appendChild(node);
		}
		if(select===true){
			this.selectNode(node)
		}
	},
	removeNode : function(item){
		var nodeId = String.isInstance(item) ? item : item.id;
		var node = this._nodeHash[nodeId];
		if(node!=null && !node.isRoot()){
			var parentNode = node.getParentNode();
			if(parentNode != null){
				parentNode.removeChild(node);
			}
			if(this.selectedNode==node){
				this.selectedNode = null;
			}
		}
	},
	initAllNodeData : function(){
		if(this.root){
			this.root.initAllData();
		}
	},
	__initEvent : function(){
		var _this = this;
		this.element.onclick=function(event){
			var event = event || window.event;
			var elem=(event.srcElement || event.target);
			var _type = elem['_type_'];
			if(typeof(_type) === undefined){
				return;
			}
			elem = elem.parentNode || elem.parentElement;
			if(_type == 'clip'){
				if(elem.indexId!=null){
					var node = _this._nodeHash[ elem.indexId ];
					if(node.isExpanded()){
						node.collapse();
					}else{
						node.expand();
					}
				}
			}else if(_type == 'icon' || _type == 'text'){
				var node = _this._nodeHash[elem.indexId];
				for(var i=0; i < _this.clickListeners.length; i++){
					_this.clickListeners[i](node);
					_this.selectNode(node);
				}
			}else if(_type == 'checked'){
				var node = _this._nodeHash[elem.indexId];
				node.onCheck();
			}
		};
	},
	addListener : function(type,handler){
		if( type==null || type === 'click'){
			this.clickListeners.push(handler);	
		}
	},
	selectNode : function(node){
		if(this.selectedNode){
			this.selectedNode.unselect();
		}
		this.selectedNode = node;
		if(node.parentNode){
			node.parentNode.expand();
		}
		node.select();
	},
	getNodeIcon : function(node){
		return this._icoPath + ((node.icon==null)?((node.isRoot())?this.icon['root']:(node.isLeaf())?this.icon['node']:(node.isExpanded()?this.icon['folderOpen']:this.icon['folder'])):this.icon[node.icon])
	},
	getNodeClipImg : function(node){
		var icon = 'empty';
		if(node.isRoot()){
			icon = node.isExpanded() ? 'nlMinus':'nlPlus';
		}else{
			if(node.isLeaf()){//是叶节点
				if(node.isLast()){
					icon = 'joinBottom';
				}else{
					icon = 'join';
				}
			}else{//非叶节点
				if(node.isExpanded()){//展开
					if(node.isLast()){
						icon = 'minusBottom';
					}else{
						icon = 'minus';
					}
				}else{//折叠
					if(node.isLast()){
						icon = 'plusBottom';
					}else{
						icon = 'plus';
					}
				}
			}
		};
		return (this._icoPath + this.icon[icon]);
	},
	getNodeCheckBoxImg : function(node){
		var checked = node.checked;
		var icon = (checked==2)?'checkbox2':(checked==1)?'checkbox1':'checkbox0';
		return (this._icoPath + this.icon[icon]);
	},
	getNodeLineImg : function(type){
		return (this._icoPath + this.icon[type]);
	},
	__getChildNodes : function(pid){
		var childNodes = [];
		var divider = this._divider;
		var separator = this._separator;
		var reg = new RegExp("(^|"+separator+")"+ pid + divider + "[^"+separator+divider+"]+("+separator+"|$)", "g");
		var cids = this.searchKeys.match(reg)
		var separatorRegExp = this._separatorRegExp;
		//separatorRegExp = new RegExp(this._separator + '|' + pid + divider, "g");
		if(cids){
			for (var i=0,j=cids.length;i<j;i++){
				var key = cids[i].replace(separatorRegExp,'').replace(pid+divider,'');
				var node = this._nodeHash[key];
				if(node){
					childNodes.push(node);
				}
			}
		}
		//-old 经过测试,使用新的正则查找比循环效率要高(以下是旧的循环查找算法)
		//
		//var childNodes = [];for(var k in this._nodeHash){var node = this._nodeHash[k];if(node.pid==pid){childNodes.push(node);}}
		return childNodes;
	},
	__getNode : function(id){
		return this._nodeHash[id];
	},
	expandAll : function(){
		if(this.root){
			this.root.expandAll();
		}
	},
	registerDestroy : function(){
		var _this = this;
		$(window).one('unload',function(){
			_this.destroy();
		});
		//window[this._id]=this;
	},
	getCheckeds : function(name){
		var checkeds = [];
		name = name||'id';
		for(var k in this._nodeHash){
			var node = this._nodeHash[k];
			if(node.checked==1){
				var value = node.attributes[name]
				if(value != null){
					checkeds.push(value);
				}
			}
		}
		return checkeds;
	},
	//window.onunload=function(){destroy}
	destroy : function(){//IE-overflow
		this.element.onclick = null;
		for(var k in this._nodeHash){
			var node 	= this._nodeHash[k];
			node.ownerTree = null;
		}
		for(var property in this){
			delete this[property];
		}
	}
};

OTree.prototype.icon = {
	root				: 'root.gif',
	folder			: 'folder.gif',
	folderOpen	: 'folderopen.gif',
	node				: 'page.gif',
	empty				: 'empty.gif',
	line				: 'line.gif',
	join				: 'join.gif',
	joinBottom	: 'joinbottom.gif',
	plus				: 'plus.gif',
	plusBottom	: 'plusbottom.gif',
	minus				: 'minus.gif',
	minusBottom	: 'minusbottom.gif',
	nlPlus			: 'nolines_plus.gif',
	nlMinus			: 'nolines_minus.gif',
	checkbox0		:	'checkbox_0.gif',
	checkbox1		:	'checkbox_1.gif',
	checkbox2		:	'checkbox_2.gif'
};

OTree.Node=function(attributes,tree) {
	this['attributes'] = attributes;
	this['html-element'] = false;//null
	this.id = this['attributes']['id'];
	//if(!this.id){this.id = ('yTree_node' + (new Date().getTime()) + '_' + parseInt(Math.random()*10000));};
	this.pid = this['attributes']['pid'];
	this.checked = this['attributes']['checked'];
	this.checked = this.checked==null ? false : this.checked;
	this.icon = this['html-element']['icon'];
	this.parentNode = null;
	this.childNodes = null;
	this.isExpand		= false;
	this.isSelect		= false;
	this._isInit		= false;
	this._isLoad		= false;
	this._afterChildrenPaintFlag = false;
	this.ownerTree = tree;
};

OTree.Node.prototype={
	initEl : function(){
		this['html-element']={};
		this['html-element']['element'] = document.createElement('div');
		this['html-element']['line']	 = document.createElement('span');
		this['html-element']['clip']	 = document.createElement('img');
		this['html-element']['icon']	 = document.createElement('img');
		this['html-element']['text']	 = document.createElement('span');
 		this['html-element']['checkbox'] = document.createElement('img');
		this['html-element']['child'] = document.createElement('div');
		this['html-element']['element'].appendChild(this['html-element']['line']);
		this['html-element']['element'].appendChild(this['html-element']['clip']);
		this['html-element']['element'].appendChild(this['html-element']['icon']);
		this['html-element']['element'].appendChild(this['html-element']['checkbox']);	
		this['html-element']['element'].appendChild(this['html-element']['text']);
		this['html-element']['element'].appendChild(this['html-element']['child']);
		this['html-element']['text'].className='otree'
		this['html-element']['element'].noWrap='true';
		this['html-element']['line']['_type_'] ='line';
		this['html-element']['clip']['_type_'] ='clip';
		this['html-element']['icon']['_type_'] ='icon';
		this['html-element']['text']['_type_'] ='text';
		this['html-element']['checkbox']['_type_'] ='checked';
		if(this.checked===false){
			this['html-element']['checkbox'].style.display='none';
		}
	},
	initData : function(){
		this.getParentNode();
		this.childNodes = this.getChildNodes();
		this._isInit=true;
	},
	initAllData : function(){
		var childNodes = this.getChildNodes();
		for(var i=0,j=childNodes.length;i<j;i++){
			childNodes[i].initAllData();
		}
		if(!this._isInit){
			this.initData();
		}
	},
	update : function(attributes){
		this['attributes'] = attributes;
		this.initData();
		this.paintPrefix();
	},
	getParentNode : function(){
		if(!this.parentNode){
			return (this.parentNode = this.ownerTree.__getNode(this.pid));
		}
		return this.parentNode;
	},
	getPathCount : function(){
		var i=0;
		for(var parent=this; parent!=null; parent=parent.getParentNode()){i++;};
		return i;
	},
	getPathNodes : function(){
		var nodes = [];
		for(var parent=this; parent!=null; parent=parent.getParentNode()){nodes.push(parent);};
		return nodes.reverse();
	},
	getPath : function(attr){
    attr = attr || "id";
    var p = this.parentNode;
    var b = [this['attributes'][attr]];
    while(p){
        b.unshift(p.attributes[attr]);
        p = p.parentNode;
    }
    var sep = this.getOwnerTree().pathSeparator;
    return sep + b.join(sep);
	},
	getOwnerTree : function(){
		if(!this.ownerTree){
    	var p = this;
      while(p){
      	if(p.ownerTree){
        	this.ownerTree = p.ownerTree;
          break;
          }
          p = p.parentNode;
			}
    }
		return this.ownerTree;
	},
	getChildNodes : function(){
		if(!this.childNodes){
			this.childNodes = this.getOwnerTree().__getChildNodes(this.id);
		}
		return this.childNodes;
	},
	getEl : function(){
		return this['html-element']['element'];
	},
	isSelected : function(){
		return this.isSelect;
	},
	isFirst : function(){
		return this.parentNode && (this.parentNode.childNodes[0] === this);
	},
	isLast : function(){
		return (this.parentNode!=null) && (this.parentNode.childNodes[this.parentNode.childNodes.length-1] === this);
	},
	isLeaf : function(){
		return this.getChildNodes().length===0;
	},
	isRoot : function(){
		return (this.ownerTree!=null) && (this.ownerTree.root === this);
	},
	onCheck : function(){
		if(this.checked!==false){
			if(this.checked==1){
				this._subCheck(this.checked=0);
			}else{
				this._subCheck(this.checked=1);
			}
			this.paintCheckboxImg();
			this._supCheck(this.checked);
		}
	},
	_autoCheck : function(){
		var childNodes = this.getChildNodes();
		var checked1 = 0;
		var checked2 = 0;
		for(var i=0,j=childNodes.length;i<j;i++){
			var checked = childNodes[i].checked;
			if(checked==1){
				checked1++;
			}else if(checked==2){
				checked2++;
			}
		}
		this.checked = (childNodes.length==checked1) ? 1 : (checked1>0||checked2>0) ? 2 : 0;
		this.paintCheckboxImg();
	},
	_supCheck : function(checked){
		var pnodes = this.getPathNodes();
		for(var i=pnodes.length-2;i>=0;i--){
			pnodes[i]._autoCheck();
		}
	},
	_subCheck : function(checked){
		this.checked = checked;
		var childNodes = this.getChildNodes();
		for(var i=0,len=childNodes.length;i<len;i++){
			var cnode = childNodes[i];
			cnode._subCheck(checked)
		}
		this.paintCheckboxImg();
	},
	appendChild : function(node){
		var ownerTree = this.getOwnerTree();
		if(this._isLoad && this._afterChildrenPaintFlag){
			node.paint();
		}
		this.getChildNodes().push(node);
		this.refurbishIcon();
		ownerTree._putHash(node);
	},
	removeChild : function(node){
		var ownerTree = this.getOwnerTree();
		if( node._isLoad ){
			var element = node['html-element']['element'];
			element.parentElement.removeChild(element);
		}
		delete ownerTree._nodeHash[node.id];
		node.destroy();
		this.refurbishIcon();
	},
	isExpanded : function(){
		return this.isExpand;
	},
	getLineImg : function(type){
		return this.ownerTree.getNodeLineImg(type);
	},
	getClipImg : function(){
		return this.ownerTree.getNodeClipImg(this);
	},
	getCheckBoxImg : function(){
		return this.ownerTree.getNodeCheckBoxImg(this);
	},
	getIcon : function(){
		return this.ownerTree.getNodeIcon(this);
	},
	select : function(){
		this.isSelect = true;
		this['html-element']['text'].style.backgroundColor='#CCCCFF';
	},
	unselect : function(){
		this.isSelect = false;
		this['html-element']['text'].style.backgroundColor='';
	},
	paint : function(){
		if(!this._isInit){
			this.initData()
		}

		if(!this._isLoad){
			this.initEl();
			this._isLoad = true;
		}

		if(this.isRoot()){
			this.ownerTree.element.appendChild(this['html-element']['element']);
		}else{
			this.parentNode['html-element']['child'].appendChild(this['html-element']['element']);
		}

		if(this.isRoot()===true){
			this.expand();
		}else{
			this.collapse();
		}
		this.paintPrefix();
		this['html-element']['element'].indexId = this.id;
		if(this.isExpanded()){
			this.paintChildren();
		}
	},
	paintPrefix : function(){
		this.paintLine();
		this.paintClipIcoImg();
		this.paintCheckboxImg();
		this.paintIconImg();
		this.paintText();
	},
	refurbishIcon : function(){
		this.initData();
		this.paintPrefix();
		var childNodes = this.getChildNodes();
		if(childNodes.length > 0){
			if(this._afterChildrenPaintFlag){//已经绘制节点
				for(var i=0;i < childNodes.length;i++){
					childNodes[i].refurbishIcon();
				}
			}
		}else{
			this.collapse();
		}
	},
	paintChildren : function(){
		if(!this._afterChildrenPaintFlag){
			this['html-element']['child'].innerHTML = '';
			this._afterChildrenPaintFlag = true;
			var childNodes = this.getChildNodes();
			for(var i=0;i < childNodes.length;i++){
				childNodes[i].paint();
			}
		};
	},
	paintLine : function(){
		this['html-element']['line'].innerHTML = '';
		var pathNodes = this.getPathNodes();
		for(var i = 1 ,count = pathNodes.length-1 ; i < count ; i++){//i=1: [0]是跟节点,根节点没有clip
				var node = pathNodes[i];
				var _line_img = document.createElement('img');
				if( node.parentNode==null || node.isLast() ){
					_line_img.src = this.getLineImg('empty');
				}else{
					_line_img.src = this.getLineImg('line');
				}
				this['html-element']['line'].appendChild(_line_img);
		}
	},
	paintClipIcoImg : function(){
		this['html-element']['clip'].src = this.getClipImg();
		if(this.isRoot()){
			this['html-element']['clip'].style.display='none';//不显示根节点的clip
		}
	},
	paintIconImg : function(){
		this['html-element']['icon'].src = this.getIcon();
	},
	paintCheckboxImg : function(){
		if(this.isLeaf()&&this.checked==2){
			this.checked==1
		}
		if(this['html-element']){
			this['html-element']['checkbox'].src = this.getCheckBoxImg();
		}
	},	
	paintText : function(){
		var text = 	this['attributes']['text'];
		this['html-element']['text'].style.cursor='hand'
		this['html-element']['text'].title=text;
		this['html-element']['text'].innerText=text;
		this['html-element']['text'].textContent=text;
	},
	paintSelectStyle : function(){
		if(this.isSelected()){
			this['html-element']['text'].style.backgroundColor='#CCCCFF'
		}else{
			this['html-element']['text'].style.backgroundColor=''
		}
	},
	collapse : function(){
		this.isExpand=false;
		this['html-element']['child'].style.display='none';
		this.paintIconImg();
		this.paintClipIcoImg();
	},
	expandAll : function(){
		this.expand();
		var childNodes = this.getChildNodes();
		for(var i=0;i<childNodes.length;i++){
			childNodes[i].expandAll();
		}
	},
	expand : function(){
		if(!this.isLeaf()){
			this.isExpand=true;
			this.paintChildren();
			this['html-element']['child'].style.display='block';
		}
		this.paintIconImg();
		this.paintClipIcoImg();
	},
	destroy : function(){
		var ownerTree = this.getOwnerTree();
		ownerTree._removeHash(node);
		if(this.childNodes!=null){
			var childNodes = this.childNodes;
			for(var i=0;i < childNodes.length;i++){
				childNodes[i].destroy();
			}
		}
		for(var p in this['html-element']){
			delete this['html-element'][p];
		}
		for(var p in this){
			delete this[p];
		}
	},
	getString : function(){
		return 'Node['+ this.id + ']';
	}
};
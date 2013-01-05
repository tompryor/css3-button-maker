/* Author: tpryor

 */

// Require the module we just created
/*
 * require(["dvia/hello"], function(myModule) { // Use our module to change the
 * text in the greeting myModule.setText("greeting", "Hello Dojo!"); // After a
 * few seconds, restore the text to its original state setTimeout(function() {
 * myModule.restoreText("greeting"); }, 3000); });
 */
require([ "dojo/dom", "dojo/fx", "dvia/Application", "dvia/Slider",
		"dvia/ShadowSliders", "dvia/Border", "dvia/BorderRadius",
		"dojo/dom-construct", "dojo/parser",
		"dvia/widgets/ColorPicker/ColorPicker", "dvia/widgets/gradientDesigner/GradientDesigner" ], function(dom, fx,
		Application, Slider, ShadowSliders, Border, BorderRadius, domConstruct,
		parse) {
	app = new dvia.Application();
	// slider = new dvia.Slider();

	// CREATE a slider

	// STEP 1
	// create a new element in the dom to attach this slider to

//	var n = domConstruct.create("div", {
//		id : "slider"
//	}, 'controls', "last");
//
//	// STEP 2
//	// Create the slider pass in an id and which property to watch
//	slider = new dvia.Slider({
//		minimum : 0,
//		maximum : 100,
//		pageIncrement : 20,
//		value : app.cssMemoryStore.get('font-size').value,
//		intermediateChanges : true,
//		id : "fontsizeSlider",
//		watchProperty : "font-size",
//		valueType : "px",
//		model : app
//	}, "fontControls");
//
//	// Start up the widget
//	slider.startup();

	// console.log(app.count);
	// init();
});


// CREATE TOOLBAR AT TOP OF PAGE
require([ "dojo/ready", "dijit/Toolbar", "dijit/form/Button",
		"dojo/_base/array", "dijit/DropDownMenu", "dijit/MenuItem",
		"dijit/form/DropDownButton", "dojo/_base/window"
], function(ready, Toolbar, Button, array,
		DropDownMenu, MenuItem, DropDownButton, win) {
	ready(function() {
		console.debug("dojo ready a");

		var toolbar = new Toolbar({}, "toolbar");
		
		array.forEach([ "Size", "Border", "Shadow", "Text", "Color", "States" ], function(label) {
			
			// CREATE SIZE MENU
			if (label === "Size") {
				console.debug("lets make a menu item: ", label);

				var menu = new DropDownMenu({
					style : "display: none;"
				});
				var menuItem1 = new MenuItem({
					label : "Height",
					iconClass : "dijitEditorIcon dijitEditorIconSave",
					onClick : function() {
						scrollTo("sizeSliders");
						addDisplayClass("sizeSlider");

					}
				},this);
				menu.addChild(menuItem1);

				var menuItem2 = new MenuItem({
					label : "Width",
					iconClass : "dijitEditorIcon dijitEditorIconCut",
					onClick : function() {
						scrollTo("sizeSliders");
						addDisplayClass("sizeSlider");

					}
				});
				menu.addChild(menuItem2);

				var menuItem3 = new MenuItem({
					label : "Padding",
					iconClass : "dijitEditorIcon dijitEditorIconCut",
					onClick : function() {
						addDisplayClass("sizeSlider");

					}
				});
				menu.addChild(menuItem3);

				var menuItem4 = new MenuItem({
					label : "Margin",
					iconClass : "dijitEditorIcon dijitEditorIconCut",
					onClick : function() {
						addDisplayClass("sizeSlider");

					}
				});
				menu.addChild(menuItem4);

				
				var button = new DropDownButton({
					// note: should always specify a label, for accessibility
					// reasons.
					// Just set showLabel=false if you don't want it to be
					// displayed
					// normally
					label : label,
					showLabel : true,
					dropDown : menu,

				});

				// add content to the drop down

				// create colorpalet widget

				// place widget domnode into menu item
				// domConstruct.place(colorPalette.domNode, button.domNode,
				// "first");
				// button.addChild(colorPalette);

				toolbar.addChild(button);
			}// end size menu creation
			
			
			
			
			// CREATE BORDER MENU
			if (label === "Border") {
				console.debug("lets make a menu item: ", label);

				var menu = new DropDownMenu({
					style : "display: none;"
				});
				var menuItem1 = new MenuItem({
					label : "Border Size/Color",
					iconClass : "dijitEditorIcon dijitEditorIconSave",
					onClick : function() {
						scrollTo("border-Slider");
						addDisplayClass("borderSlider");

					}
				},this);
				menu.addChild(menuItem1);

				var menuItem2 = new MenuItem({
					label : "Border Radius",
					iconClass : "dijitEditorIcon dijitEditorIconCut",
					onClick : function() {
						scrollTo("borderRadius-Slider");
						addDisplayClass("BorderRadius");

					}
				});
				menu.addChild(menuItem2);

				var button = new DropDownButton({
					// note: should always specify a label, for accessibility
					// reasons.
					// Just set showLabel=false if you don't want it to be
					// displayed
					// normally
					label : label,
					showLabel : true,
					dropDown : menu,

				});

				// add content to the drop down

				// create colorpalet widget

				// place widget domnode into menu item
				// domConstruct.place(colorPalette.domNode, button.domNode,
				// "first");
				// button.addChild(colorPalette);

				toolbar.addChild(button);
			}// end border menu creation



			// CREATE Shadow MENU
			if (label === "Shadow") {
				console.debug("lets make a menu item: ", label);

				var menu = new DropDownMenu({
					style : "display: none;"
				});
				var menuItem1 = new MenuItem({
					label : "Box Shadow",
					iconClass : "dijitEditorIcon dijitEditorIconSave",
					onClick : function() {
						scrollTo("boxShadow-Slider");
						addDisplayClass("ShadowSliders");

					}
				},this);
				menu.addChild(menuItem1);

				var menuItem2 = new MenuItem({
					label : "Text Shadow",
					iconClass : "dijitEditorIcon dijitEditorIconCut",
					onClick : function() {
						scrollTo("textShadow-Slider");
						addDisplayClass("TextShadowSliders");

					}
				});
				menu.addChild(menuItem2);

				var button = new DropDownButton({
					// note: should always specify a label, for accessibility
					// reasons.
					// Just set showLabel=false if you don't want it to be
					// displayed
					// normally
					label : label,
					showLabel : true,
					dropDown : menu,

				});

				// add content to the drop down

				// create colorpalet widget

				// place widget domnode into menu item
				// domConstruct.place(colorPalette.domNode, button.domNode,
				// "first");
				// button.addChild(colorPalette);

				toolbar.addChild(button);
			}// end shadow menu creation


			// CREATE TEXT MENU
			if (label === "Text") {
				console.debug("lets make a menu item: ", label);

				var menu = new DropDownMenu({
					style : "display: none;"
				});
				var menuItem1 = new MenuItem({
					label : "Font Size",
					iconClass : "dijitEditorIcon dijitEditorIconSave",
					onClick : function() {
						scrollTo("fontSliders");
						addDisplayClass("FontSliders");

					}
				},this);
				menu.addChild(menuItem1);

				var menuItem2 = new MenuItem({
					label : "Line Height",
					iconClass : "dijitEditorIcon dijitEditorIconCut",
					onClick : function() {
						addDisplayClass("FontSliders");

					}
				});
				menu.addChild(menuItem2);

				var button = new DropDownButton({
					// note: should always specify a label, for accessibility
					// reasons.
					// Just set showLabel=false if you don't want it to be
					// displayed
					// normally
					label : label,
					showLabel : true,
					dropDown : menu,

				});

				// add content to the drop down

				// create colorpalet widget

				// place widget domnode into menu item
				// domConstruct.place(colorPalette.domNode, button.domNode,
				// "first");
				// button.addChild(colorPalette);

				toolbar.addChild(button);
			}// end text menu creation
			
			
			
			
			// CREATE GD MENU
			if (label === "Color") {
				console.debug("lets make a menu item: ", label);

				var menu = new DropDownMenu({
					style : "display: none;"
				});
				var menuItem1 = new MenuItem({
					label : "Gradient Designer",
					iconClass : "dijitEditorIcon dijitEditorIconSave",
					onClick : function() {
						scrollTo("GDSliders");
						addDisplayClass("GDSliders");

					}
				},this);
				menu.addChild(menuItem1);


				var button = new DropDownButton({
					// note: should always specify a label, for accessibility
					// reasons.
					// Just set showLabel=false if you don't want it to be
					// displayed
					// normally
					label : label,
					showLabel : true,
					dropDown : menu,

				});

				// add content to the drop down

				// create colorpalet widget

				// place widget domnode into menu item
				// domConstruct.place(colorPalette.domNode, button.domNode,
				// "first");
				// button.addChild(colorPalette);

				toolbar.addChild(button);
			}// end GD menu creation
			
			
			// CREATE STATES MENU
			if (label === "States") {
				console.debug("lets make a menu item: ", label);

				var menu = new DropDownMenu({
					style : "display: none;"
				});
				var menuItem1 = new MenuItem({
					label : "Default",
					iconClass : "dijitEditorIcon dijitEditorIconSave",
					onClick : function() {
						win.global.app.updateState("default");
					}
				},this);
				menu.addChild(menuItem1);

				var menuItem2 = new MenuItem({
					label : "Hover",
					iconClass : "dijitEditorIcon dijitEditorIconCut",
					onClick : function() {
						win.global.app.updateState("hover");
					}
				});
				menu.addChild(menuItem2);

				var menuItem3 = new MenuItem({
					label : "Click",
					iconClass : "dijitEditorIcon dijitEditorIconCut",
					onClick : function() {
						win.global.app.updateState("click");
					}
				});
				menu.addChild(menuItem3);


				
				var button = new DropDownButton({
					// note: should always specify a label, for accessibility
					// reasons.
					// Just set showLabel=false if you don't want it to be
					// displayed
					// normally
					iconClass : "dijitEditorIcon dijitEditorIconCut",

					label : label,
					showLabel : true,
					dropDown : menu,

				});

				// add content to the drop down

				// create colorpalet widget

				// place widget domnode into menu item
				// domConstruct.place(colorPalette.domNode, button.domNode,
				// "first");
				// button.addChild(colorPalette);

				toolbar.addChild(button);
			}// end size menu creation			
			
			
		});// end array loop
		
		toolbar.startup();
		console.debug("dojo ready b");
		addDisplayClass("sizeSlider");

		

	});
});


function scrollTo(targetNode){	
   // window.location.hash=targetNode;
}

function addDisplayClass(targetNode){
	require([ "dojo/dom", "dojo/query", "dojo/dom-class"], function(dom, query, domClass) {
		
		console.debug("addDisplayClass fired");
		query('.css3Widget').forEach(function(node){
			console.debug("css3Widget",node);
		    domClass.remove(node, "showMe");


		});
	    domClass.add(targetNode, "showMe");



	});
	
}

define(
		[ 'dojo/_base/kernel', 'dojo/io/script', 'dojo/_base/loader' ],
		function(dojo, ioScript) {
			dojo.provide("dvia.ButtonStates");

			// dojo.provide made sure that my.module was created as a JavaScript
			// object,
			// so properties can be assigned to it:
			dvia.ButtonStates.name = "Button States";
			
			dvia.ButtonStates["default"] = [{
				"id" : "test",
				"test" : "59px",
				"value" : "59px"
			}];
			dvia.ButtonStates["hover"] = [{
				"id" : "test",
				"test" : "59px",
				"value" : "59px"
			}];
			dvia.ButtonStates["click"] = [{
				"id" : "test",
				"test" : "59px",
				"value" : "59px"
			}];

			dvia.ButtonStates["current"] = [

					{
						"id" : "line-height",
						"line-height" : "59px",
						"value" : 59
					},
					{
						"id" : "font-family",
						"font-family" : "Georgia",
						"value" : "Georgia"
					},
					{
						"id" : "border",
						"border" : "4px solid black",
						"value" : 4
					},
					{
						"id" : "padding",
						"padding" : "0px",
						"value" : 0
					},
					{
						"id" : "width",
						"width" : "300px",
						"value" : 300
					},
					{
						"id" : "height",
						"height" : "80px",
						"value" : 80
					},
					{
						"id" : "margin",
						"margin" : "0",
						"value" : 0
					},
					{
						"id" : "color",
						"color" : "white",
						"value" : "white"
					},
					{
						"id" : "font-size",
						"font-size" : "40px",
						"value" : 40
					},
					{
						"id" : "border-radius",
						"border-radius" : "10px 10px 10px 10px",
						"value" : "10px 10px 10px 10px"
					},
					{
						"id" : "background-image",
						"background" : "linear-gradient(#f5d4d4 0%, #ee0e0e 16.4%, #df1c1c 50.4%, #020202 51.2%, #020202 88.6%, #a89f9f 100%)",
						"value" : "linear-gradient(#f5d4d4 0%, #ee0e0e 16.4%, #df1c1c 50.4%, #020202 51.2%, #020202 88.6%, #a89f9f 100%)"
					},
					{
						"id" : "background-color",
						"background-color" : "black",
						"value" : "black"
					},
					{
						"id" : "box-shadow",
						"box-shadow" : "2px 2px 4px 0 rgba(0,0,0,0.6)",
						"value" : "2px 2px 4px 0 rgba(0,0,0,0.6)"
					},
					{
						"id" : "text-shadow",
						"text-shadow" : "2px 2px 4px 0 rgba(0,0,0,0.6)",
						"value" : "2px 2px 4px 0 rgba(0,0,0,0.6)"
					},
					{
						"id" : "transform",
						"transform" : "scale(1) rotate(0deg) translate(0px, 0px) skew(0deg, 0deg)",
						"value" : "scale(1) rotate(0deg) translate(0px, 0px) skew(0deg, 0deg)"
					}, {
						"id" : "transform-origin",
						"transform-origin" : "0% 0%",
						"value" : "0% 0%"
					} ];

			dvia.ButtonStates.shadows = [ {
				"id" : "hOffset",
				"value" : 0
			}, {
				"id" : "vOffset",
				"value" : 0
			}, {
				"id" : "blur",
				"value" : 4
			}, {
				"id" : "spread",
				"value" : 0
			}, {
				"id" : "color",
				"value" : "rgba(109, 91, 101, 0.6)"
			}

			];
			
			dvia.ButtonStates.textShadows = [ {
				"id" : "hOffset",
				"value" : 0
			}, {
				"id" : "vOffset",
				"value" : 2
			}, {
				"id" : "blur",
				"value" : 4
			}, {
				"id" : "color",
				"value" : "rgba(109, 91, 101, 0.6)"
			}

			];

			dvia.ButtonStates.border = [ {
				"id" : "width",
				"value" : 2
			}, {
				"id" : "style",
				"value" : "solid"
			}, {
				"id" : "color",
				"value" : "rgba(109, 91, 101, 0.6)"
			}

			];
			
			dvia.ButtonStates.borderRadius = [ {
				"id" : "border-top-left-radius",
				"value" : 4
			}, {
				"id" : "border-top-right-radius",
				"value" : 4
			}, {
				"id" : "border-bottom-right-radius",
				"value" : 4
			}, {
				"id" : "border-bottom-left-radius",
				"value" : 4
			}

			];

			
		});

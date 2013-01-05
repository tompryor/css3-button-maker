require([ 'dojo/_base/declare', "dojo/dom", 'dojo/store/Memory', 'dvia/ButtonStates', 'dojo/store/Observable', "dojo/_base/window", "dojo/dom", "dojo/dom-construct" ],
		function(declare, dom, Memory, ButtonStates, Observable, win, dom, domConstruct) {
			declare("dvia.Application", null, {

				name : "CSS Model",
				cssData: null,
				cssMemoryStore:null,
				memoryStores: null,
				observer: null,
				results: null,
				observeHandle: null,
				states: null,
				currentState: null,
				previousState: null,
				
				constructor : function(/* Object */args) {
					declare.safeMixin(this, args);
					this.states = {"default":"default","hover":"hover","click":"click"};
					this.currentState = "default";
					this.memoryStores = {};
					this.createCssStores();
				},
				
				updateState: function(state){
					this.previousState = this.currentState;
					this.currentState = state;
					console.debug("current state = ",this.currentState);
					console.debug("previous state = ",this.previousState);

					// update previous state memory store with cssMemoryStore
					this.updatePreviousStateMemoryStore();
					
					// update cssMemoryStore/controls to curernt state values
					this.updateCssMemoryStoreWithCurrentStateMemoryStore();
					
				},
				
				updatePreviousStateMemoryStore : function(){
					console.debug("updatePreviousStateMemoryStore ",this.previousState);
					console.debug("memoryStores ", this.memoryStores[this.previousState]);


				},
				
				updateCssMemoryStoreWithCurrentStateMemoryStore : function(){
					console.debug("updateCssMemoryStoreWithCurrentStateMemoryStore ",this.currentState);
					console.debug("memoryStores ", this.memoryStores[this.currentState]);
				},
				
				createCssStores : function() {
					// create main/current store
					
					// load the data
					this.cssData = ButtonStates["current"];
					// create an onbservable store
		            this.cssMemoryStore = new Observable(new Memory({ data : this.cssData}));	

		            // query the store to get a resultset with an observe method
		            this.results = this.cssMemoryStore.query();
		            
		            // when the store updates call an update method
		            this.observeHandle = this.results.observe(this.storeUpdated, true);
		            
					// create default memory store
		            this.cssDefaultMemoryStore = new Memory({ data : this.cssData});
		            console.debug("xxx default mem store", this.cssDefaultMemoryStore);
					// create hover memory store
		            
		            
		            this.cssHoverMemoryStore = new Memory({ data : ButtonStates["hover"]});
		            console.debug("xxx hover mem store", this.cssHoverMemoryStore);
					// create click memory store
		            this.cssClickMemoryStore = new Memory({ data : ButtonStates["click"]});
		            console.debug("xxx click mem store", this.cssClickMemoryStore);
		            
		            this.memoryStores["default"] = this.cssDefaultMemoryStore;
		            this.memoryStores["hover"] = this.cssHoverMemoryStore;
		            this.memoryStores["click"] = this.cssClickMemoryStore;
		            
				},
				
				// update the browser css
				storeUpdated : function(object, removedFrom, insertedInto){
					// console.log("dvia.Application - STORE UPDATED");
					// console.log("this", this);
					// console.log("win", win);
					// console.log("object", object);
					// console.log("removedFrom", removedFrom);
					// console.log("insertedInto", insertedInto);
					win.global.app.updateButtonElementCss();
				},

				getCss : function(id) {
					return this.cssMemoryStore.get(id) ;
				},
				
				setCss : function(/*Object*/ cssObject) {
					
					if(this.currentState === "default"){
						this.cssDefaultMemoryStore.put(cssObject);
			            console.debug("xxx default mem store", this.cssDefaultMemoryStore);

					}else if(this.currentState === "hover"){					
						this.cssHoverMemoryStore.put(cssObject);
			            console.debug("xxx hover mem store", this.cssHoverMemoryStore);
					}else if(this.currentState === "click"){
						this.cssClickMemoryStore.put(cssObject);
			            console.debug("xxx click mem store", this.cssClickMemoryStore);

					}


					return this.cssMemoryStore.put(cssObject); // create or update the object with the given identity
				},

				queryCss : function(property) {
					var objects = this.cssMemoryStore.query(function(object) {
						return object[property];
					});
					
					return objects;
				},
				
				deleteCss : function(/*String*/ id) {
					
					if(this.currentState === "default"){
						this.cssDefaultMemoryStore.remove(id);
			            console.debug("xxx default mem store", this.cssDefaultMemoryStore);

					}else if(this.currentState === "hover"){					
						this.cssHoverMemoryStore.remove(id);
			            console.debug("xxx hover mem store", this.cssHoverMemoryStore);
					}else if(this.currentState === "click"){
						this.cssClickMemoryStore.remove(id);
			            console.debug("xxx click mem store", this.cssClickMemoryStore);

					}

					
					return	this.cssMemoryStore.remove(id);
				},
				
				updateButtonElementCss : function() {
					// console.log("xxx updateButtonElementCss", this.cssMemoryStore);
					var cssButton = dom.byId("cssButton");
					// console.log("xxx my button", cssButton);
					
					var myDefaultStyles = "button {\r";
					var resultsLength = this.results.length;
					for(i=0;i<resultsLength;i++){
						var currentObject = this.results[i];
						// console.debug("AAAA currentObject",currentObject);
						myDefaultStyles = myDefaultStyles + "\t" + currentObject.id + ": " + currentObject.value + ";\r";
					}
					myDefaultStyles = myDefaultStyles + "}";
					
					// var n = domConstruct.create("style", { innerHTML: "color: red;" }, "defaultButtonStyle");
					var defaultStyleNode = dom.byId("defaultButtonStyle");
					// defaultStyleNode.innerHTML = "button {\r" + "\tcolor: red;" + "\r}\r";
					
	
							myDefaultStyles = PrefixFree.prefixCSS(myDefaultStyles, true);
							
							defaultStyleNode.innerHTML = myDefaultStyles;
							
							//console.debug("updateButtonElementCss",myDefaultStyles);
							
							dom.byId("code").innerHTML = myDefaultStyles;
							prettyPrint();
					
		           // document.getElementsByTagName("head")[0].appendChild(e);

				},
				
				camelize:  function(str) {
					return (str + "").replace(/-\D/g, function(match) {
						return match.charAt(1).toUpperCase();
					});
				},
				// this.camelize("border-bottom-color"); // "borderBottomColor"


				hyphenate: function(str) {
					return (str + "").replace(/[A-Z]/g, function(match) {
						return "-" + match.toLowerCase();
					});
				}
				// this.hyphenate("borderBottomColor"); // "border-bottom-color"

				

				

			});
		});

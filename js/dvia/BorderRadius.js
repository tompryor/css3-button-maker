//>>pure-amd
/*
 * Generate controls to manipulate css border-radius properties
 */
define("dvia/BorderRadius", [ "dojo/_base/declare", "dijit/_Widget",
		"dojox/dtl/_Templated", "dojox/dtl/tag/logic",
		"dojo/text!./templates/borderRadius.html", 'dojo/store/Memory',
		'dojo/store/Observable', "dojo/dom-construct", "dojo/_base/lang", "dojo/dom", "dojo/on", "dojo/dom-style", "dijit/form/CheckBox", "dvia/widgets/ColorPicker/ColorPicker"

], function(declare, _Widget, _Templated, logic, template, Memory, Observable,
		domConstruct, lang, dom, on, domStyle) {
	/**
	 * @name lmig.pm.internet.esales.desktop.common.view.widgets.Textbox
	 * @description Text box widget.
	 */
	return declare("dvia.BorderRadius", [ _Widget, _Templated ], {
		templateString : null,
		borderRadiusStore : null,
		widgetsInTemplate: true,
		sliders : null,

	defaultLabelText : null,
		masterCss : null,

		/**
		 * @name lmig.pm.internet.esales.desktop.common.view.widgets.TextBox#constructor
		 * @description Constructor.
		 */
		constructor : function() {

			this.templateString = template;
			this.sliders = [];
			this.defaultLabelText = "";

		},
		
		postMixInProperties : function(){
			
			this.createStores();

			
		},

		/**
		 * @name lmig.pm.internet.esales.desktop.common.view.widgets.TextBox#postCreate
		 * @description Widget life cycle method. Processing after the DOM
		 *              fragment is created.
		 * @override
		 */
		postCreate : function() {
			var watchProp = this.watchProperty;
			this.masterCss = {
				"id" : watchProp,
				watchProp : "2px 2px 4px 0px rgba(0,0,0,0.6)",
				"value" : "2px 2px 4px 0px rgba(0,0,0,0.6)"
			};
			this.createSliders();
			this.inherited(arguments);
		},

		startup : function() {

		},

		createStores : function() {
			
				this.borderRadiusStore = dojo.store.Observable(new dojo.store.Memory({
					data : dvia.ButtonStates.borderRadius
				}));

		},

		createSliders : function() {
			// DO NOT REMOVE: grab this widgets context so i can pass it in to
			// callback functions via hitch
			var thisWidget = this;

			this.results = this.borderRadiusStore.query();
			
			// console.debug("CCCC sliderId", this.id);
			// console.debug("CCCC borderRadiusStore", this.borderRadiusStore);
			// console.debug("CCCC results", this.results);

			// when the store updates call an update method
			this.observeHandle = this.results.observe(lang.hitch(thisWidget,
					this.storeUpdated), true);

			var myDomNode = this.borderRadiusControlls;

			// do something with the initial result set
			this.results.forEach(function(item, i) {
				var sliderName = item.id;
				var sliderId = thisWidget.id + "-" + sliderName;
				var sliderValue = item.value;


				//console.debug("CCCC sliderId", sliderId);
				//console.debug("CCCC sliderValue", sliderValue);

				// Color Picker - create
				if(sliderName === "color"){
					var pickerName = thisWidget.watchProperty + "-color";
					//console.debug("xxx color value", sliderValue);
					// lang.hitch(thisWidget, thisWidget.createColorPicker);
					// Create a node to attach each slider too (it will be replace
					// by the slider)
					var n = domConstruct.create("div", {
						id : sliderName
					}, myDomNode, "last");

					// Create the color picker
					thisWidget[pickerName] = new dvia.widgets.ColorPicker.ColorPicker({
						value : sliderValue,
						intermediateChanges : true,
						id : pickerName
					}, n, "after");
					//console.debug("xxx color sliderValue",sliderValue);
					thisWidget[pickerName].setColor(sliderValue);
					on(thisWidget[pickerName], "change", dojo.hitch(thisWidget,
							thisWidget._colorChangeHandler));
					thisWidget.storeUpdated();
					return;
				}
				
				// Default Slider props
				var valueTypeIndicator = "px";
				var min = 0;
				var max = 100;
				var pageInc = "20";

				// Opacity props
				if (sliderName === "opacity") {
					valueTypeIndicator = "%";
					// min = "0";
					// max = "1";
					// pageInc = ".1";
					// discreteVal = ".1";

				}
				
				// hOffset & vOffset - props
				if (sliderName === "hOffset" || sliderName === "vOffset") {
					min = -250;
					max = 250;
					// min = "0";
					// max = "1";
					// pageInc = ".1";
					// discreteVal = ".1";

				}
								
				var regEx = valueTypeIndicator;
				// sliderValue = sliderValue.replace(/valueTypeIndicator/, "");
                if(typeof sliderValue === "string"){
                    sliderValue = sliderValue.replace(regEx, "");
                }
				// Create a node to attach each slider too (it will be replace
				// by the slider)
				var node = domConstruct.create("div", {
					id : sliderName
				}, myDomNode, "last");


				// Create the slider
				// console.debug("Create " + thisWidget.id + ": ",sliderName);
				// console.debug("Slider value: ",sliderValue);
				this[sliderName] = new dvia.Slider({
					minimum : min,
					maximum : max,
					onToggle : false,
					pageIncrement : pageInc,
					// discreteValues: discreteVal,
					value : sliderValue,
					intermediateChanges : true,
					id : sliderId,
					watchProperty : sliderName,
					valueType : valueTypeIndicator,
					model : thisWidget
				}, node, "after");

				// Start up the widget
				this[sliderName].startup();
				
				this.sliders.push(this[sliderName]);
				
				

			},this);
			
			
		},
		
		_colorChangeHandler: function(e){
			//console.debug("xxx _colorChangeHandler event", e);
			//console.debug("xxx _colorChangeHandler this", this);
			this.storeUpdated();
		},
		
		// BORDER RADIUS STORE UPDATED
		storeUpdated : function(object, removedFrom, insertedInto) {
			// console.debug(this.id + " storeUpdated: ",object);
			// console.debug("borderRadiusStore: ",this.borderRadiusStore);

			// Create the css rule from the aggregate shadow values
			var tl = this.borderRadiusStore.get("border-top-left-radius").value;
			var tr = this.borderRadiusStore.get("border-top-right-radius").value;
			var br = this.borderRadiusStore.get("border-bottom-right-radius").value;
			var bl = this.borderRadiusStore.get("border-bottom-left-radius").value;
			
			if(this.equal){
				tr = tl;
				br = tl;
				bl = tl;

			}

			//var opacity = this.borderRadiusStore.get("opacity").value;
			// fix opacity's value
			//opacity = this.updateOpacityValue(opacity);
			opacity = "0.6";
			// color uses the opacity slider value AND the value from the color
			// picker
			var color = "";
			//color = this.getColor();

			// assemble the values
			var newBorderRadiusValues = tl + " " + tr + " " + br + " " + bl;
			

			

			// set up the shadow object
			var watchProp = this.watchProperty;
			/* var newBorderRadiusObject = {
				"id" : watchProp,
				watchProp : "2px 2px 4px rgba(0,0,0,0.6)",
				"value" : "2px 2px 4px rgba(0,0,0,0.6)"
			};*/
			var newBorderRadiusObject = {};
			newBorderRadiusObject.id = watchProp;
			// newBorderRadiusObject[watchProp] = "2px 2px 4px 0 rgba(0,0,0,0.6)";
			// newBorderRadiusObject.value = "2px 2px 4px 0 rgba(0,0,0,0.6)";

			newBorderRadiusObject[watchProp] = newBorderRadiusValues;
			newBorderRadiusObject.value = newBorderRadiusValues;

			
			
			
			this._updatePreview(newBorderRadiusValues);
			
			// add it to the apps master css
			this.setMasterCss(newBorderRadiusObject);

		},

		getColor: function(){
			var pickerName = this.watchProperty + "-color";
			//console.debug("zzz get color this", this);
			//console.debug("zzz get color pickerName", pickerName);
			var value = "rgba(0,0,0,1)";
			if(!!this[pickerName]){
				var newValue = "rgba(";
				//console.debug("yyy get color", this[pickerName].get("value"));
				value = this[pickerName].get("value");
				value = newValue + value.r + ", " + value.g + ", " + value.b + ", " + value.a + ")";
			}
			//console.debug("VALUE ", value)
			return value;
		},
		
		setCss : function(/* Object */cssObject) {
			return this.borderRadiusStore.put(cssObject); // update the local
														// widget store with the
														// update style object
		},

		// add the new shadow value to the main store
		setMasterCss : function(/* Object */cssObject) {
			this.model.setCss(cssObject); // update the master store with the
											// update style object
		},

		// remove the shadow value to the main store
		deleteMasterCss : function() {
			// this.model.setCss(cssObject); // update the master store with the
											// update style object
			// console.debug("deleteMasterCss", this.watchProperty);
			this.model.deleteCss(this.watchProperty);
			
		},

		updateOpacityValue : function(opacityValue) {
			// remove opacity % sign, and change to a decimal
			var regexOpacityPercent = /%/;
			var updateOpacityValue = opacityValue.replace(regexOpacityPercent, "");
			// convert it to a decimal
			updateOpacityValue = Number(updateOpacityValue) / 100;

			return updateOpacityValue;
		},

		_onEnabledCheckBox : function(enableFlag) {
			if (enableFlag) {
				this.enableWidget();
			} else {
				this.disableWidget();
			}
		},

		enableWidget : function() {
			this.enableSliders();

			this._disableWidgetToggle(false);
			this.storeUpdated();
		},

		disableWidget : function() {
			this.disableSliders();

			this._disableWidgetToggle(true);
			this.deleteMasterCss();
		},

		_disableWidgetToggle : function(disableflag) {
			var thisWidget = this;
			var sliderSuffix = "Slider";
			var textboxSuffix = "TextBoxWrapper";
			var i;
			var resultsLength = this.results.length;
			//console.debug("ZZZ results", this.results);
			
			var borderRadiusWidetEqualCheckbox = "borderRadiusWidetEqualCheckbox" + this.watchProperty;
			if(!!this[borderRadiusWidetEqualCheckbox]){
				this[borderRadiusWidetEqualCheckbox].disabled = disableflag;
			}
			
			for(i=0;i<resultsLength;i++){
				var currentObject = this.results[i];
				//console.debug("AAAA currentObject",currentObject);
				//console.debug("BBBB sliderSuffix",sliderSuffix);
				// var sliderKey = currentObject.id + sliderSuffix;
				var sliderKey = thisWidget.id + "-" + currentObject.id;
				// console.debug("CCCC sliderkey", sliderKey);

				var textboxKey = thisWidget.id + "-" + currentObject.id + textboxSuffix;
				//if(sliderKey && sliderKey !== "colorSlider"){
				if(!!dijit.byId(sliderKey)){
					dijit.byId(sliderKey).disabled = disableflag;
					dijit.byId(textboxKey).disabled = disableflag;
				}else{
					var pickerName = this.watchProperty + "-color";
					// dijit.byId(pickerName).disabled = disableflag;
					if(disableflag){
						
						domStyle.set(dijit.byId(pickerName).domNode, {visibility:'hidden'});

					}else{
						domStyle.set(dijit.byId(pickerName).domNode, {visibility:'visible'});

					}
				}
			}
			if (disableflag) {
				this.borderRadiusWidetEnableToggleLabel.innerHTML = "Off";

			} else {
				this.borderRadiusWidetEnableToggleLabel.innerHTML = "On";
			}
			
		},
		
		disableSliders : function(){
			this.sliders.forEach(function(item, i) {
				// item.disable
//				console.debug("disable this slider widget", item);
				item.setDisabled(true);
				
			});
			
		},
		
		enableSliders : function(){
			this.sliders.forEach(function(item, i) {
				// item.disable
//				console.debug("enable this slider widget", item);
				item.setDisabled(false);
				
			});
		},
		
		_onEqualCheckBox : function(enableFlag){
			// console.debug("_onInsetCheckBox: this",this);
			if (enableFlag) {
				this.equal = true;
				this._equalSliderViewOn();
			} else {
				this.equal = false;
				this._equalSliderViewOff();
			}
			this.storeUpdated();
		},
		
		_equalSliderViewOn : function() {
//			console.debug("_equalSliderView");

			this.sliders.forEach(function(item, i) {
//				console.debug("slider #" + i + ": ",item);
				if(i===0){
					if(!this.defaultLabelText){
						this.defaultLabelText = item.textBoxLabel.innerHTML;
					}
					item.textBoxLabel.innerHTML = "All Corners";
				}else{
					domStyle.set(item.domNode.parentElement,"display","none");
				}
			});

		},
		
		_equalSliderViewOff : function() {

			this.sliders.forEach(function(item, i) {
				if(i===0){
					if(!!this.defaultLabelText){

						item.textBoxLabel.innerHTML = this.defaultLabelText;
//						item.textBoxLabel.innerHTML = "yyy";

					}
				}else{
					domStyle.set(item.domNode.parentElement,"display","block");

				}
			});

		},
		
		_updatePreview : function(value){
			var borderWidgetWidetCode = "borderWidgetWidetCode" + this.watchProperty;
			this[borderWidgetWidetCode].innerHTML = this.watchProperty + ": " + value + ";";
			var dojoProp = this.dojoProperty;
			var previewDomNode = this[borderWidgetWidetCode];
			domStyle.set(previewDomNode, dojoProp, value);
			//domStyle.set(previewDomNode, {dojoProp: value});


		}

	});

});
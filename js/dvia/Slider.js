//>>pure-amd
/*
 * Slider that updates model, and watches model for changes
 * Uses a couple dojo widgets: HorizontalSlider and NumberTextBox
 * 
 */

define(
		"dvia/Slider",
		[ "dojo/_base/declare", "dijit/form/HorizontalSlider", "dojo/query",
				"dojo/dom-construct", "dojo/on", "dojo/_base/lang", "dojo/NodeList-manipulate",
				"dijit/form/NumberTextBox", "dijit/form/CheckBox", "dijit/form/Select" ],
		function(declare, Slider, query, domConstruct, on, lang) {
			/**
			 * @name lmig.pm.internet.esales.desktop.common.view.widgets.Textbox
			 * @description Text box widget.
			 */
			return declare(
					"dvia.Slider",
					[ Slider ],
					{
						// templateString : null,
						valueTextBox : null,
						valueType : null,
						valueTypeSelect : null,
						model : null, // required model to update
						label : "label",
						onToggle: true,
						labelMap : {"border-top-left-radius":"Top Left",
							"border-top-right-radius":"Top Right",
							"border-bottom-left-radius":"Bottom Left",
							"border-bottom-right-radius":"Bottom Right",
							"hOffset":"Horizontal Offset",
							"vOffset":"Vertical Offset",
							"blur":"Blur",
							"spread":"Spread",
							"height":"Height",
							"width":"Width",
							"margin":"Margin",
							"padding":"Padding",
							"font-size":"Font Size",
							"line-height":"Line Height"






								},
						/**
						 * @name lmig.pm.internet.esales.desktop.common.view.widgets.TextBox#constructor
						 * @description Constructor.
						 */
						constructor : function() {
							this.inherited(arguments);
						},

						postMixInProperties : function() {
							this.inherited(arguments);
						},

						/**
						 * @name lmig.pm.internet.esales.desktop.common.view.widgets.TextBox#postCreate
						 * @description Widget life cycle method. Processing
						 *              after the DOM fragment is created.
						 * @override
						 */
						postCreate : function() {
							// console.debug("Slider postCreate");
							// wrap the slider in a div
							var wrapperId = this.id + "Wrapper";
							var wrapper = '<div class="slider" id="'
									+ wrapperId + '"></div>';
							query(this.domNode).wrap(wrapper);
							// dojo.style(n.domNode, "width", "400px");

							// react when the value changes
							this.watch("value", this.setMasterCss);

							// create a new element in the dom to attach this
							// slider to
							var textBoxWrapperId = this.id + "TextBoxWrapper";
							var n = domConstruct.create("div", {
								id : textBoxWrapperId
							}, wrapperId, "last");

							// create a textbox for the values
							this.valueTextBox = new dijit.form.NumberTextBox(
									{
										name : wrapperId + "Textbox",
										value : 0 /* no or empty value! */,
										placeHolder : "value",
										constraints : {
											min : this.minimum,
											max : this.maximum,
											//pattern: '+0.000;-0.000',
											places : 0
										},
										invalidMessage : 'Invalid: Must be a number between '
												+ this.minimum
												+ ' and '
												+ this.maximum + '.'
									}, n, "last");

							// create the label for the value textbox
							this.textBoxLabel = domConstruct.create("label", {
								"for" : textBoxWrapperId,
								title : "Goto FOO!",
								style : "margin-right:4px;margin-left:24px",
								innerHTML : this.watchProperty
							}, this.valueTextBox.domNode, "before");

							// create a value indicator e.g. px
//							domConstruct.create("span", {
//								title : "Value Type",
//								innerHTML : this.valueType,
//								"class" : "valueTypeIndicator"
//							}, wrapperId, "last");
							
							this.constructValueTypeMenu(wrapperId, this.valueType);

							// set events for the valueTextBox
							on(this.valueTextBox, "keyUp", lang.hitch(this,
									this._keyUpHandler));
							on(this.valueTextBox, "keyDown", lang.hitch(this,
									this._keyDownHandler));
							
							if (this.onToggle) {
								// Create the label for the disabled checkbox
								var checkBoxId = wrapperId + "Checkbox";
								this.checkBoxLabel = domConstruct.create(
										"label", {
											innerHTML : "On",
											"class" : "disabledLabel",
											"for" : checkBoxId
										}, wrapperId, "last");

								// Create a node that will be replaced by the
								// checkbox
								var checkBoxNode = domConstruct.create("div",
										null, wrapperId, "last");

								// create a checkbox for the values
								this.disabledCheckBox = new dijit.form.CheckBox(
										{
											name : checkBoxId,
											id : checkBoxId,
											checked: true
										}, checkBoxNode);

								// attach onchange event for the checkBox
								// pass in the context of this widget
								var sliderWidget = this;
								on(this.disabledCheckBox, "change", lang.hitch(
										sliderWidget,
										this._onEnabledCheckBox));
							}

							dojo.style(this.valueTextBox.domNode, "width",
									"35px");
							dojo.style(this.valueTextBox.domNode,
									"marginRight", "4px");

							this.setMasterCss();
							this._fixLabelText();

							this.inherited(arguments);
						},
						
						constructValueTypeMenu : function(domId, valueType){
							// console.debug("create a value type menu. default to: ", valueType);
							// create a value indicator e.g. px
//							var select = domConstruct.create("select", {
//								title : "Value Type",
//								innerHTML : this.valueType,
//								"class" : "valueTypeIndicator"
//							}, domId, "last");
							
							var pxDefault = false;
							var emDefault = false;
							var percentDefault = false;

							if(this.valueType === "px"){
								pxDefault = true;
							}else if(this.valueType === "em"){
								emDefault = true;
							}else if(this.valueType === "%"){
								percentDefault = true;
							}
							

							
							this.valueTypeSelect = new dijit.form.Select({
							    name: 'select2',
							    options: [
							      { label: 'PX', value: 'px', selected: pxDefault },
							      { label: 'EM', value: 'em', selected: emDefault },
							      { label: '%', value: '%', selected: percentDefault }
							    ]
							  }).placeAt(domId, "last");
							
							on(this.valueTypeSelect, "change", lang.hitch(this,
									this._valueTypeUpdate));
//							on(djSelect, "change", lang.partial(this._valueTypeUpdate,
//									djSelect));

						},
						
						_valueTypeUpdate : function(event){
//							console.debug("_valueTypeUpdate: event", event);
//							console.debug("_valueTypeUpdate: this", this);
//							console.debug("_valueTypeUpdate: djSelect", this.valueTypeSelect);
//							console.debug("_valueTypeUpdate: valueTextBox", this.valueTextBox);
//							console.debug("_valueTypeUpdate: getDisplayedValue", this.valueTextBox.getDisplayedValue());

							
							
							this.valueType = this.valueTypeSelect.value;
							this.setMasterCss();

						},
						
						_fixLabelText : function(){
								var defaultLabelText = this.textBoxLabel.innerHTML;
								if(this.labelMap[defaultLabelText]){
									this.textBoxLabel.innerHTML = this.labelMap[defaultLabelText];
								}
						},

						_onEnabledCheckBox : function(enableFlag) {
							if (enableFlag) {
								this.enableWidget();
							} else {
								this.disableWidget();
							}
						},

						enableWidget : function() {
							this.setDisabled(false);
							this._disableWidgetToggle(false);
							this.setMasterCss();
						},

						disableWidget : function() {
							this.setDisabled(true);
							this._disableWidgetToggle(true);
							this.deleteMasterCss();
						},

						_disableWidgetToggle : function(disableflag) {
							// disable the slider
							this.disabled = disableflag;
							// disable the slider value textbox
							this.valueTextBox.disabled = disableflag;
							if (disableflag) {
								this.checkBoxLabel.innerHTML = "Off";
							} else {
								this.checkBoxLabel.innerHTML = "On";
							}
							

						},

						_keyUpHandler : function(e) {

							if (this.valueTextBox.isValid()) {
								var value = this.valueTextBox.get("value");

								if (e.keyCode !== 40 && e.keyCode !== 38) {
									this.set("value", value);
								}
							}
						},

						_keyDownHandler : function(e) {

							if (this.valueTextBox.isValid()) {
								var value = this.valueTextBox.get("value");

								// up 38
								if (e.keyCode === 38) {
									this.set("value", value + 1);
									return;

								}

								// down 40
								if (e.keyCode === 40) {
									this.set("value", value - 1);
									return;

								}
							}
						},

						setMasterCss : function() {
							var val = null;
							if(this.valueType === "px"){
								val = this.get("value");
							}else {
								val = this.valueTextBox.getDisplayedValue();
							}

							var intvalue = val;
							// var intvalue = Math.floor(val);
							this.valueTextBox.set("value", intvalue);

							var watchProp = this.watchProperty;
							var cssVal = intvalue + this.valueType;

							var newCssObject = {};
							newCssObject.id = watchProp;
							newCssObject[watchProp] = cssVal;
							newCssObject.value = cssVal;
							this.model.setCss(newCssObject);

						},

						// remove this value to the main store
						deleteMasterCss : function() {
							// this.model.setCss(cssObject); // update the master store with the
															// update style object
							//console.debug("deleteMasterCss", this.watchProperty);
							this.model.deleteCss(this.watchProperty);
							
						}

					});

		});
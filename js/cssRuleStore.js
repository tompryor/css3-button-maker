/* Author: tpryor

 */

function init() {
	require(["dojox/data/CssRuleStore", "dijit/form/ComboBox","dojo/dom","dojo/_base/connect"], function(CssRuleStore, ComboBox, dom, connect) {

		console.debug("init");
	var ruleStore = new CssRuleStore({
		'context' : [ 'dijit/themes/claro/claro.css' ]
	});
	var ruleCombo = new ComboBox({
		'store' : ruleStore,
		'searchAttr' : 'selector'
	}, dom.byId('ruleCombo'));

	function setCssText() {
		var item = ruleCombo.item;
		var text = dom.byId("textLoc");
		if (text) {
			while (text.firstChild) {
				text.removeChild(text.firstChild);
			}
			if (item) {
				text.innerHTML = ruleStore.getValue(item, "cssText");
			}
		} else {
			console.log("foo!")
		}
	}
	connect.connect(ruleCombo, "onChange", setCssText);
	});

}

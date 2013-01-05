//>>pure-amd

define("dvia/SliderWrapper", [
    "dojo/_base/declare",
    "dijit/_Widget",
    "dojox/dtl/_Templated",
    "dojox/dtl/tag/logic",
    "dojo/text!./templates/sliderwrapper.html"
], function (declare, _Widget, _Templated, logic, template)
{
    /**
     * @name lmig.pm.internet.esales.desktop.common.view.widgets.Textbox
     * @description Text box widget.
     */
    return declare("dvia/SliderWrapper", [
        _Widget,
        _Templated
    ], {
        templateString : null,

        /**
         * @name lmig.pm.internet.esales.desktop.common.view.widgets.TextBox#constructor
         * @description Constructor.
         */
        constructor : function ()
        {
            this.templateString = template;
        },

        /**
         * @name lmig.pm.internet.esales.desktop.common.view.widgets.TextBox#postCreate
         * @description Widget life cycle method. Processing after the DOM fragment is created.
         * @override
         */
        postCreate : function ()
        {
            //this._toolTipAttachPoint = this.textBox;
            //this._field = this.textBox;
            //this._errorBorder = this.textBox;

            this.inherited(arguments);
        }

    });

});
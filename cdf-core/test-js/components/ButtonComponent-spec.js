/*!
 * Copyright 2002 - 2015 Webdetails, a Pentaho company. All rights reserved.
 *
 * This software was developed by Webdetails and is provided under the terms
 * of the Mozilla Public License, Version 2.0, or any later version. You may not use
 * this file except in compliance with the license. If you need a copy of the license,
 * please go to http://mozilla.org/MPL/2.0/. The Initial Developer is Webdetails.
 *
 * Software distributed under the Mozilla Public License is distributed on an "AS IS"
 * basis, WITHOUT WARRANTY OF ANY KIND, either express or implied. Please refer to
 * the license for the specific language governing your rights and limitations.
 */

define(["cdf/Dashboard.Clean", "cdf/components/ButtonComponent"],
  function(Dashboard, ButtonComponent) {

  /**
   * ## The Button Component
   */
  describe("The Button Component #", function() {

    var dashboard = new Dashboard();

    dashboard.init();

    var buttonComponent = new ButtonComponent({
      name: "buttonComponent",
      type: "button",
      listeners: ["productLine", "territory"],
      htmlObject: "sampleObject",
      label: "A button",
      expression: function() { this.setLabel('Yes, a clickable button'); },
      executeAtStart: true,
      preChange: function() { return true; },
      postChange: function() { return true; },
      successCallback: function(data) {},
      failureCallback: function() {},
      tooltip: "My first dashboard"
    });

    dashboard.addComponent(buttonComponent);

    /**
     * ## The Button Component # allows a dashboard to execute update
     */
    it("allows a dashboard to execute update", function(done) {
      spyOn(buttonComponent, 'update').and.callThrough();

      // listen to cdf:postExecution event
      buttonComponent.once("cdf:postExecution", function() {
        expect(buttonComponent.update).toHaveBeenCalled();
        done();
      });

      dashboard.update(buttonComponent);
    });
  });
});

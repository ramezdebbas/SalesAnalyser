// For an introduction to the Navigation template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232506
(function () {
    "use strict";

    WinJS.Binding.optimizeBindingReferences = true;

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;
    var nav = WinJS.Navigation;

    app.onloaded = function () {

    };

    app.addEventListener("activated", function (args) {
        if (args.detail.kind === activation.ActivationKind.launch) {
            if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
                // TODO: This application has been newly launched. Initialize
                // your application here.
            } else {
                // TODO: This application has been reactivated from suspension.
                // Restore application state here.
            }



            // Adding "settings" in pane (charms)
            WinJS.Application.onsettings = function (e) {
                e.detail.applicationcommands = {
                    "settings": { title: "Settings", href: "/pages/settings/settings.html"},
                    "about": { title: "About", href: "/pages/about/about.html"},
                    "privacy": { title: "Privacy Statement", href: "/pages/privacy/privacy.html"}
                };
                WinJS.UI.SettingsFlyout.populateSettings(e);
            };

            // Navigation history, load the last visited page or go to default "home"
            if (app.sessionState.history) {
                nav.history = app.sessionState.history;
            }
            args.setPromise(WinJS.UI.processAll().then(function () {
                if (nav.location) {
                    nav.history.current.initialPlaceholder = true;
                    return nav.navigate(nav.location, nav.state);
                } else {
                    return nav.navigate(Application.navigator.home);
                }
            }));
        }
    });

    app.oncheckpoint = function (args) {
        // TODO: This application is about to be suspended. Save any state
        // that needs to persist across suspensions here. If you need to 
        // complete an asynchronous operation before your application is 
        // suspended, call args.setPromise().
        app.sessionState.history = nav.history;
    };
    app.start();








    /*
    WinJS.UI.Pages.define("/pages/settings/settings.html", {
        ready: function (element, options) {
            // Set the work weeks first
            getWorkWeeks();
            // Save new value
            document.getElementById("btnSaveSettings").addEventListener("click", saveSettings, false);
            document.getElementById("update").addEventListener("click", runChanges, false);
        }
    });
    */


})();
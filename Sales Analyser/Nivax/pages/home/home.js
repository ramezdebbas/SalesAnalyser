/*
(function () {
    "use strict";
    */


    WinJS.UI.Pages.define("/pages/home/home.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {

            // Set variables
            var startYear = $("#startYear");
            var startYearTotalRevenue = $("#startYearTotalRevenue");
            var startYearAverageOrder = $("#startYearAverageOrder");
            var startYearSalesRepresentatives = $("#startYearSalesRepresentatives");

            var endYear = $("#endYear");
            var endYearTotalRevenue = $("#endYearTotalRevenue");
            var endYearAverageOrder = $("#endYearAverageOrder");
            var endYearSalesRepresentatives = $("#endYearSalesRepresentatives");

            var HitrateStartYearPhoneCalls = $("#HitrateStartYearPhoneCalls");
            var HitrateStartYearSalesMeetings = $("#HitrateStartYearSalesMeetings");
            var HitrateStartYearQuotes = $("#HitrateStartYearQuotes");

            var HitrateEndYearPhoneCalls = $("#HitrateEndYearPhoneCalls");
            var HitrateEndYearSalesMeetings = $("#HitrateEndYearSalesMeetings");
            var HitrateEndYearQuotes = $("#HitrateEndYearQuotes");

            // Variabler för utmatning av data
            var startYearBudgetPerSalesRepresentative = $("#startYearBudgetPerSalesRepresentative");
            var startYearOrdersPerSalesRepresentative = $("#startYearOrdersPerSalesRepresentative");
            var startYearTotalOfOrders = $("#startYearTotalOfOrders");

            var endYearBudgetPerSalesRepresentative = $("#endYearBudgetPerSalesRepresentative");
            var endYearOrdersPerSalesRepresentative = $("#endYearOrdersPerSalesRepresentative");
            var endYearTotalOfOrders = $("#endYearTotalOfOrders");

            var HitrateNumberStartYearPhoneCalls = $("#HitrateNumberStartYearPhoneCalls");
            var HitrateNumberStartYearSalesMeetings = $("#HitrateNumberStartYearSalesMeetings");
            var HitrateNumberStartYearQuotes = $("#HitrateNumberStartYearQuotes");

            var HitrateNumberEndYearPhoneCalls = $("#HitrateNumberEndYearPhoneCalls");
            var HitrateNumberEndYearSalesMeetings = $("#HitrateNumberEndYearSalesMeetings");
            var HitrateNumberEndYearQuotes = $("#HitrateNumberEndYearQuotes");

            var graphStartYear = $("#graphStartYear");
            var graphStartYearPhoneCalls = $("#graphStartYearPhoneCalls");
            var graphStartYearSalesMeetings = $("#graphStartYearSalesMeetings");
            var graphStartYearQuotes = $("#graphStartYearQuotes");
            var graphStartYearOrders = $("#graphStartYearOrders");

            var graphEndYear = $("#graphEndYear");
            var graphEndYearPhoneCalls = $("#graphEndYearPhoneCalls");
            var graphEndYearSalesMeetings = $("#graphEndYearSalesMeetings");
            var graphEndYearQuotes = $("#graphEndYearQuotes");
            var graphEndYearOrders = $("#graphEndYearOrders");

            var weekStartYearOrders = 0;
            var weekStartYearQuotes = 0;
            var weekStartYearSalesMeetings = 0;
            var weekStartYearPhoneCalls = 0;
            var weekEndYearOrders = 0;
            var weekEndYearQuotes = 0;
            var weekEndYearSalesMeetings = 0;
            var weekEndYearPhoneCalls = 0;

            var yearStartYearOrders = 0;
            var yearStartYearQuotes = 0;
            var yearStartYearSalesMeetings = 0;
            var yearStartYearPhoneCalls = 0;
            var yearEndYearOrders = 0;
            var yearEndYearQuotes = 0;
            var yearEndYearSalesMeetings = 0;
            var yearEndYearPhoneCalls = 0;

            var numberOfYears = (startYear - endYear);
            var weeks = Windows.Storage.ApplicationData.current.localSettings.values["workWeeks"];
            var timeframe = "weekly";
            var algorithm;



            function setWorkWeeks() {
                // Load saved data from localSettings (workWeeks)
                var workWeeks = Windows.Storage.ApplicationData.current.localSettings.values["workWeeks"];
                if (workWeeks === undefined) {
                    workWeeks = "48";
                    Windows.Storage.ApplicationData.current.localSettings.values["workWeeks"] = "48";
                }
                if (workWeeks < 1 || workWeeks > 52) {
                    workWeeks = "48";
                    Windows.Storage.ApplicationData.current.localSettings.values["workWeeks"] = "48";
                }
                $("#weeks1").text(workWeeks);
            }
            function CalculationController() {
                // round(x)	Rounds x to the nearest integer
                // ceil(x)	Returns x, rounded upwards to the nearest integer
                this.startYear = 2013;
                this.startYearTotalRevenue = 100000000;
                this.startYearAverageOrder = 10000;
                this.startYearSalesRepresentatives = 50;

                this.endYear = 2016;
                this.endYearTotalRevenue = 200000000;
                this.endYearAverageOrder = 10000;
                this.endYearSalesRepresentatives = 50;

                this.HitrateStartYearPhoneCalls = 20;
                this.HitrateStartYearSalesMeetings = 50;
                this.HitrateStartYearQuotes = 20;

                this.HitrateEndYearPhoneCalls = 20;
                this.HitrateEndYearSalesMeetings = 50;
                this.HitrateEndYearQuotes = 20;

                this.HitrateNumberStartYearPhoneCalls = 20;
                this.HitrateNumberStartYearSalesMeetings = 50;
                this.HitrateNumberStartYearQuotes = 20;

                this.HitrateNumberEndYearPhoneCalls = 20;
                this.HitrateNumberEndYearSalesMeetings = 50;
                this.HitrateNumberEndYearQuotes = 20;

                // These are variables that has calculated values
                this.calcStartYearBudgetPerSalesRepresentant = 0;
                this.calcStartYearOrdersPerSalesRepresentant = 0;
                this.calcStartYearTotalOfOrders = 0;

                this.calcEndYearBudgetPerSalesRepresentant = 0;
                this.calcEndYearOrdersPerSalesRepresentant = 0;
                this.calcEndYearTotalOfOrders = 0;

                // Graph bars (%)
                this.graphStartYearPhoneCalls = 0;
                this.graphEndYearPhoneCalls = 0;

                this.graphStartYearSalesMeetings = 0;
                this.graphEndYearSalesMeetings = 0;

                this.graphStartYearQuotes = 0;
                this.graphEndYearQuotes = 0;

                this.graphStartYearOrders = 0;
                this.graphEndYearOrders = 0;

                // Weekly values for the graph bars
                this.weekStartYearOrders = 0;
                this.weekStartYearQuotes = 0;
                this.weekStartYearSalesMeetings = 0;
                this.weekStartYearPhoneCalls = 0;
                this.weekEndYearOrders = 0;
                this.weekEndYearQuotes = 0;
                this.weekEndYearSalesMeetings = 0;
                this.weekEndYearPhoneCalls = 0;

                // Settings & other values
                this.graphMaxValue = 10;
                this.revenue = 200;
                this.weeks = 48;
                this.timeframe = "weekly";
            }

            function setController() {
                cc.startYear = $("#startYear").val();
                cc.startYearTotalRevenue = $("#startYearTotalRevenue").val();
                cc.startYearAverageOrder = $("#startYearAverageOrder").val();
                cc.startYearSalesRepresentatives = $("#startYearSalesRepresentatives").val();

                cc.endYear = $("#endYear").val();
                cc.endYearTotalRevenue = $("#endYearTotalRevenue").val();
                cc.endYearAverageOrder = $("#endYearAverageOrder").val();
                cc.endYearSalesRepresentatives = $("#endYearSalesRepresentatives").val()

                cc.HitrateStartYearPhoneCalls = $("#HitrateStartYearPhoneCalls").val();
                cc.HitrateStartYearSalesMeetings = $("#HitrateStartYearSalesMeetings").val();
                cc.HitrateStartYearQuotes = $("#HitrateStartYearQuotes").val(); // från quotes till orders

                cc.HitrateEndYearPhoneCalls = $("#HitrateEndYearPhoneCalls").val();
                cc.HitrateEndYearSalesMeetings = $("#HitrateEndYearSalesMeetings").val();
                cc.HitrateEndYearQuotes = $("#HitrateEndYearQuotes").val(); // från quotes till orders

                cc.HitrateNumberStartYearPhoneCalls = $("#HitrateStartYearPhoneCalls").val();
                cc.HitrateNumberStartYearSalesMeetings = $("#HitrateStartYearSalesMeetings").val();
                cc.HitrateNumberStartYearQuotes = $("#HitrateStartYearQuotes").val();

                cc.HitrateNumberEndYearPhoneCalls = $("#HitrateEndYearPhoneCalls").val();
                cc.HitrateNumberEndYearSalesMeetings = $("#HitrateEndYearSalesMeetings").val();
                cc.HitrateNumberEndYearQuotes = $("#HitrateEndYearQuotes").val();

                // Specials
                cc.numberOfYears = cc.endYear - cc.startYear;
                cc.timeframe = $("#timeframe").val();
                cc.weeks = parseInt(Windows.Storage.ApplicationData.current.localSettings.values["workWeeks"]);

                // Budget calculations are done here...
                cc.calcStartYearBudgetPerSalesRepresentant = cc.startYearTotalRevenue / cc.startYearSalesRepresentatives;
                cc.calcStartYearOrdersPerSalesRepresentant = cc.calcStartYearBudgetPerSalesRepresentant / cc.startYearAverageOrder;
                cc.calcStartYearTotalOfOrders = cc.calcStartYearOrdersPerSalesRepresentant * cc.startYearSalesRepresentatives;

                cc.calcEndYearBudgetPerSalesRepresentant = cc.endYearTotalRevenue / cc.endYearSalesRepresentatives;
                cc.calcEndYearOrdersPerSalesRepresentant = cc.calcEndYearBudgetPerSalesRepresentant / cc.endYearAverageOrder;
                cc.calcEndYearTotalOfOrders = cc.calcEndYearOrdersPerSalesRepresentant * cc.endYearSalesRepresentatives;

                // Hitrate calculations are done here
                // These are yearly data
                cc.yearStartYearOrders = cc.calcStartYearBudgetPerSalesRepresentant / cc.startYearAverageOrder;
                cc.yearStartYearQuotes = cc.yearStartYearOrders * (1.0 / (cc.HitrateStartYearQuotes / 100.0));
                cc.yearStartYearSalesMeetings = cc.yearStartYearQuotes * (1.0 / (cc.HitrateStartYearSalesMeetings / 100.0));
                cc.yearStartYearPhoneCalls = cc.yearStartYearSalesMeetings * (1.0 / (cc.HitrateStartYearPhoneCalls / 100.0));

                cc.yearEndYearOrders = cc.calcEndYearBudgetPerSalesRepresentant / cc.endYearAverageOrder;
                cc.yearEndYearQuotes = cc.yearEndYearOrders * (1.0 / (cc.HitrateEndYearQuotes / 100.0));
                cc.yearEndYearSalesMeetings = cc.yearEndYearQuotes * (1.0 / (cc.HitrateEndYearSalesMeetings / 100.0));
                cc.yearEndYearPhoneCalls = cc.yearEndYearSalesMeetings * (1.0 / (cc.HitrateEndYearPhoneCalls / 100.0));

                // Calculate weekly or monthly data
                if (cc.timeframe === "weekly") {
                    algorithm = cc.weeks;
                }
                if (cc.timeframe === "monthly") {
                    cc.weeks = cc.weeks / 52;
                    algorithm = cc.weeks * 12;
                }
                cc.weekStartYearOrders = cc.yearStartYearOrders / algorithm;
                cc.weekStartYearQuotes = cc.yearStartYearQuotes / algorithm;
                cc.weekStartYearSalesMeetings = cc.yearStartYearSalesMeetings / algorithm;
                cc.weekStartYearPhoneCalls = cc.yearStartYearPhoneCalls / algorithm;

                cc.weekEndYearOrders = cc.yearEndYearOrders / algorithm;
                cc.weekEndYearQuotes = cc.yearEndYearQuotes / algorithm;
                cc.weekEndYearSalesMeetings = cc.yearEndYearSalesMeetings / algorithm;
                cc.weekEndYearPhoneCalls = cc.yearEndYearPhoneCalls / algorithm;


                // These are data that will be put into the graph bars
                cc.graphStartYearOrders = cc.weekStartYearOrders;
                cc.graphStartYearQuotes = cc.weekStartYearQuotes;
                cc.graphStartYearSalesMeetings = cc.weekStartYearSalesMeetings;
                cc.graphStartYearPhoneCalls = cc.weekStartYearPhoneCalls;

                cc.graphEndYearOrders = cc.weekEndYearOrders;
                cc.graphEndYearQuotes = cc.weekEndYearQuotes;
                cc.graphEndYearSalesMeetings = cc.weekEndYearSalesMeetings;
                cc.graphEndYearPhoneCalls = cc.weekEndYearPhoneCalls;


                // Calculate graphMaxValue
                cc.graphMaxValue = Math.max(cc.graphStartYearPhoneCalls, cc.graphStartYearSalesMeetings, cc.graphStartYearQuotes, cc.graphStartYearOrders, cc.graphEndYearPhoneCalls, cc.graphEndYearSalesMeetings, cc.graphEndYearQuotes, cc.graphEndYearOrders);
                if (cc.graphMaxValue < 10) {
                    // graphMaxValue should never be lower than 10, else the graph will look strange
                    cc.graphMaxValue = 10;
                }
                else {
                    // graphMaxValue must be higher than highest graph bar value, lets make it 105%
                    cc.graphMaxValue = cc.graphMaxValue * 1.05;
                }
                return true;
            }
            function setValues() {
                // Display all values on the screen..

                // Output start year & end year on graph
                $(graphStartYear).html(cc.startYear);
                $(graphEndYear).html(cc.endYear);

                // Set new numbers on hitrate
                $(HitrateNumberStartYearPhoneCalls).html(cc.HitrateStartYearPhoneCalls + "%");
                $(HitrateNumberStartYearSalesMeetings).html(cc.HitrateStartYearSalesMeetings + "%");
                $(HitrateNumberStartYearQuotes).html(cc.HitrateStartYearQuotes + "%");

                $(HitrateNumberEndYearPhoneCalls).html(cc.HitrateEndYearPhoneCalls + "%");
                $(HitrateNumberEndYearSalesMeetings).html(cc.HitrateEndYearSalesMeetings + "%");
                $(HitrateNumberEndYearQuotes).html(cc.HitrateEndYearQuotes + "%");

                // Set values on sliders
                $(HitrateStartYearPhoneCalls).val(cc.HitrateStartYearPhoneCalls);
                $(HitrateStartYearSalesMeetings).val(cc.HitrateStartYearSalesMeetings);
                $(HitrateStartYearQuotes).val(cc.HitrateStartYearQuotes);

                $(HitrateEndYearPhoneCalls).val(cc.HitrateEndYearPhoneCalls);
                $(HitrateEndYearSalesMeetings).val(cc.HitrateEndYearSalesMeetings);
                $(HitrateEndYearQuotes).val(cc.HitrateEndYearQuotes);

                // Output all calculations
                // Using Math.floor to round numbers downwards
                // Check if input data is valid....
                $(startYearBudgetPerSalesRepresentative).html(Math.floor(cc.calcStartYearBudgetPerSalesRepresentant));
                $(startYearOrdersPerSalesRepresentative).html(Math.floor(cc.calcStartYearOrdersPerSalesRepresentant));
                $(startYearTotalOfOrders).html(Math.floor(cc.calcStartYearTotalOfOrders));

                $(endYearBudgetPerSalesRepresentative).html(Math.floor(cc.calcEndYearBudgetPerSalesRepresentant));
                $(endYearOrdersPerSalesRepresentative).html(Math.floor(cc.calcEndYearOrdersPerSalesRepresentant));
                $(endYearTotalOfOrders).html(Math.floor(cc.calcEndYearTotalOfOrders));

                // Calculate revenue
                cc.revenue = cc.endYearTotalRevenue - cc.startYearTotalRevenue;
                cc.revenue = cc.revenue / cc.startYearTotalRevenue * 100;
                // Display revenue value
                if (cc.revenue < 100) {
                    $("#graphRevenue").html(cc.revenue.toFixed(1) + "%");
                }
                else {
                    $("#graphRevenue").html("+" + cc.revenue.toFixed(0) + "%");
                }
                return true;
            }

            function setGraph() {
                // Calculate the percent values ("value / graphMaxValue") and round them down to nearest integer
                cc.graphStartYearPhoneCalls = Math.floor(cc.graphStartYearPhoneCalls);
                cc.graphEndYearPhoneCalls = Math.floor(cc.graphEndYearPhoneCalls);

                cc.graphStartYearSalesMeetings = Math.floor(cc.graphStartYearSalesMeetings);
                cc.graphEndYearSalesMeetings = Math.floor(cc.graphEndYearSalesMeetings);

                cc.graphStartYearQuotes = Math.floor(cc.graphStartYearQuotes);
                cc.graphEndYearQuotes = Math.floor(cc.graphEndYearQuotes);

                cc.graphStartYearOrders = Math.floor(cc.graphStartYearOrders);
                cc.graphEndYearOrders = Math.floor(cc.graphEndYearOrders);

                // Set new height to each bar in the graph
                // The bars are animated, speed of animation can be adjusted:
                var speed = 0;
                $(graphStartYearPhoneCalls).animate({ "height": cc.graphStartYearPhoneCalls / cc.graphMaxValue * 100 + "%" }, speed);
                $(graphEndYearPhoneCalls).animate({ "height": cc.graphEndYearPhoneCalls / cc.graphMaxValue * 100 + "%" }, speed);

                $(graphStartYearSalesMeetings).animate({ "height": cc.graphStartYearSalesMeetings / cc.graphMaxValue * 100 + "%" }, speed);
                $(graphEndYearSalesMeetings).animate({ "height": cc.graphEndYearSalesMeetings / cc.graphMaxValue * 100 + "%" }, speed);

                $(graphStartYearQuotes).animate({ "height": cc.graphStartYearQuotes / cc.graphMaxValue * 100 + "%" }, speed);
                $(graphEndYearQuotes).animate({ "height": cc.graphEndYearQuotes / cc.graphMaxValue * 100 + "%" }, speed);

                $(graphStartYearOrders).animate({ "height": cc.graphStartYearOrders / cc.graphMaxValue * 100 + "%" }, speed);
                $(graphEndYearOrders).animate({ "height": cc.graphEndYearOrders / cc.graphMaxValue * 100 + "%" }, speed);

                // Set the values (numbers) in the graph bar..
                $(graphStartYearPhoneCalls).children('.graphValue').text(cc.graphStartYearPhoneCalls);
                $(graphStartYearSalesMeetings).children('.graphValue').text(cc.graphStartYearSalesMeetings);
                $(graphStartYearQuotes).children('.graphValue').text(cc.graphStartYearQuotes);
                $(graphStartYearOrders).children('.graphValue').text(cc.graphStartYearOrders);

                $(graphEndYearPhoneCalls).children('.graphValue').text(cc.graphEndYearPhoneCalls);
                $(graphEndYearSalesMeetings).children('.graphValue').text(cc.graphEndYearSalesMeetings);
                $(graphEndYearQuotes).children('.graphValue').text(cc.graphEndYearQuotes);
                $(graphEndYearOrders).children('.graphValue').text(cc.graphEndYearOrders);
                return true;
            }






            /*
            // Set "value" in workWeeks input to the current value
            $("#workWeeks").change(function () {
                $("#workWeeksTitle").val(workWeeks);
            });
            */
            // Change between weekly and monthly
            $("select").change(function () {
                runChanges();
            });
            // For input[type=number]   (input fields)
            $("#startYear,#startYearTotalRevenue,#startYearAverageOrder,#startYearSalesRepresentatives,#endYear,#endYearTotalRevenue,#endYearAverageOrder,#endYearSalesRepresentatives,#weeks").keyup(function () {
                runChanges();
            });
            // For input[type=range]   (sliders)
            $("#HitrateStartYearPhoneCalls,#HitrateStartYearSalesMeetings,#HitrateStartYearQuotes,#HitrateEndYearPhoneCalls,#HitrateEndYearSalesMeetings,#HitrateEndYearQuotes").change(function () {
                runChanges();
            });
            function settingsContainerGoUp() {
                // Check if its portrait or landscape..
                if ($(window).width() <= 800) {
                    $("#settingsContainer").animate({ top: "-250px" }, 750);
                }
                else {
                    // Dont do anything if focus are on input elements inside #settingsBox1
                    if (!($('#settingsBox1 input').is(":focus"))) {
                        $(".settingsBox").animate({ top: "-340px" }, 650);
                    }
                }
            }
            function settingsContainerGoDown() {
                // If input still has focus, dont do anything
                if (!($('input').is(":focus"))) {
                    // Check if its portait or landscape
                    if ($(window).width() <= 800) {
                        $("#settingsContainer").animate({ top: "0px" }, 600);
                    }
                    else {
                        $(".settingsBox").animate({ top: "0px" }, 750);
                    }
                }
            }
            // VISUAL CONTROLLER FOR INPUT AND KEYBOARD
            $('#settingsContainer input').focus(function () {
                settingsContainerGoUp();
            });
            $('#settingsContainer input').blur(function () {
                settingsContainerGoDown();
            });
            // Set default values when app is used first time
            function runChanges() {
                setWorkWeeks();
                setController();
                setValues();
                setGraph()
            }
            // Initialize the object so it can be called (cc)
            var cc = new CalculationController();
            runChanges();









            function getWorkWeeks() {
                var weeks = Windows.Storage.ApplicationData.current.localSettings.values["workWeeks"];
                // If settingsWeeks has no value, set default value to 48
                if (weeks === undefined) {
                    weeks = "48";
                };
                Windows.Storage.ApplicationData.current.localSettings.values["workWeeks"] = weeks;
                // $("#weeks1").text(weeks);
                return weeks;
            }

            function saveSettings() {
                // Save new values and display changes
                Windows.Storage.ApplicationData.current.localSettings.values["workWeeks"] = workWeeks.value;
                runChanges();
            }


            WinJS.UI.Pages.define("/pages/settings/settings.html", {
                ready: function (element, options) {
                    // Set current values and listen to changes on input
                    $("#workWeeks").val(getWorkWeeks());
                    $("#workWeeksTitle").text(getWorkWeeks() + " weeks");
                    $("#workWeeks").change(function () {
                        $("#workWeeksTitle").text($("#workWeeks").val() + " weeks");
                    });
                    // Save on button click
                    document.getElementById("btnSaveSettings").addEventListener("click", saveSettings, false);
                }
            });


        }
    });



  





//    })();
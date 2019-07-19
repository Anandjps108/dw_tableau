(function () {
    var myConnector = tableau.makeConnector();
    const limit = 10000;
    var pagenumber = 1;
    tableData = [];

    $(document).ready(function () {
        $("#submitButton").click(function () {
                tableau.connectionName = "Opd visittrend";
                tableau.submit();
        });
    });

    myConnector.getData = function (table, doneCallback) {
        var modifiedat = table.incrementValue

        if (!modifiedat) {
            modifiedat = "2000-01-01"
        }
        else {
            console.log("modifiedat: " + modifiedat);
        }

        var queryPath = "https://demo.incarnus.com:8850/thirdparty/tableauservice/patientreports/getopdvisittrend/" + limit + "/" + pagenumber + "/" + modifiedat

        $.getJSON(queryPath, function (resp) {
            var data = resp.opdvisittrend;
            var totalrecords = resp.totalrecords;

            if (!modifiedat) {
                modifiedat = "2000-01-01"
            }
            else {
                console.log("modifiedat: " + modifiedat);
            }

            console.log("totalRecords in the collection: " + totalrecords);
            // Iterate over the JSON object
            for (var i = 0, len = data.length; i < len; i++) {
                var serialno = (limit * (pagenumber-1)) + i;
                tableData.push({
                     "VisitID": data[i].visitid,
                "VISITDATETIME": data[i].startdate,
                "HOSPITAL": "",
                "HOSPITALUNIT":"",
                "MRN": data[i].mrn,
                "GENDER":"",
                "Age": "",                               
                "PATIENTTYPE": "",       
                "COUNTRY": data[i].country,              
                "STATE":data[i].state,                  
                "CITY":data[i].city,
                "PLACE":"", 
                "PINCODE": data[i].pincode,
                "DEPARTMENT": data[i].department,
                "DOCTOR": data[i].careprovider,
                "VisitType": "",
                "APPOINTMENTTYPE":"",
                "Payor": data[i].payor1,
                "CREATEDBY": "",
                "MODIFIEDBY": "",
                "CREATEDDATETIME": data[i].createdat,
                "MODIFIEDDATETIME": data[i].modifiedat
                });
            }

            var currentrecords = (limit * pagenumber);
            if (currentrecords < totalrecords) {
                console.log("Fetching Again with currentrecords: " + currentrecords);
                pagenumber++;
                myConnector.getData(table, doneCallback);
            }
            else {
                pagenumber = 1;
                table.appendRows(tableData);
                console.log("CompletedRecords: " + tableData.length);
                tableData = [];
                doneCallback();
            }
            });
        };
        
        myConnector.getSchema = function (schemaCallback) {
            var cols =  [{
            id: "VisitID",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "VISITDATETIME",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "HOSPITAL",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "HOSPITALUNIT",
            dataType: tableau.dataTypeEnum.string
        },{
            id:"MRN",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "GENDER",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "Age",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "COUNTRY",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "STATE",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "CITY",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "PLACE",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "PINCODE",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "DEPARTMENT",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "DOCTOR",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "VisitType",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "APPOINTMENTTYPE",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "Payor",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "CREATEDBY",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "MODIFIEDBY",
            dataType: tableau.dataTypeEnum.string
        },{
            id:"CREATEDDATETIME",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "MODIFIEDDATETIME",
            dataType: tableau.dataTypeEnum.string
        }];
        
            var tableSchema = {
                id: "Patients",
                alias: "Patient reports are listed here...........",
                columns: cols,
                incrementColumnId: "modifieddatetime"
            };
        
            schemaCallback([tableSchema]);
        };

    tableau.registerConnector(myConnector);
    })();

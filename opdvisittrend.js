(function () {
    var myConnector = tableau.makeConnector();
    const limit = 1000;
    var pagenumber = 1;
    tableData = [];

    $(document).ready(function () {
        $("#submitButton").click(function () {
                tableau.connectionName = "outpatientvisittrend List";
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

            
            // Iterate over the JSON object
            for (var i = 0, len = data.length; i < len; i++) {
                tableData.push({
                  
                "VisitID": data[i].visitid,
                "VISITDATETIME": data[i].startdate,
                "HOSPITAL": data[i].hospital,
                "HOSPITALUNIT":data[i].hospitalunit,
                "MRN": data[i].mrn,
                "GENDER":data[i].gender,
                "Age": data[i].Age,                               
                "PATIENTTYPE":data[i].PATIENTTYPE,       
                "COUNTRY": data[i].country,              
                "STATE":data[i].state,                  
                "CITY":data[i].city,
                "PLACE":data[i].PLACE, 
                "PINCODE": data[i].pincode,
                "DEPARTMENT": data[i].department,
                "DOCTOR": data[i].careprovider,
                "VisitType": data[i].visittype,
                "APPOINTMENTTYPE":"",
                "Payor": data[i].payor1,
                "CREATEDBY": data[i].createdby,
                "MODIFIEDBY": data[i].modifiedby,
                "CREATEDDATETIME": data[i].createdat,
                "MODIFIEDDATETIME": data[i].modifiedat
               
                });
            }
    
            table.appendRows(tableData);
            doneCallback();
        });
    };
    
    myConnector.getSchema = function (schemaCallback) {
        var cols = [{
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
        }
    ];
        
            var tableSchema = {
                id: "Patients",
                alias: "outpatientvisittrends are listed here...........",
                columns: cols,
                incrementColumnId: "modifieddatetime"
            };
        
            schemaCallback([tableSchema]);
        };

    tableau.registerConnector(myConnector);
    })();

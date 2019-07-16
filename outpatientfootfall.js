(function () {
    var myConnector = tableau.makeConnector();

    myConnector.getSchema = function (schemaCallback) {

    };

    myConnector.getData = function (table, doneCallback) {

    };

    tableau.registerConnector(myConnector);

    $(document).ready(function () {
        $("#submitButton").click(function () {
            tableau.connectionName = "outPatient Footfall";
            tableau.submit();
        });
    });

    myConnector.getData = function(table, doneCallback) {
        $.getJSON("https://demo.incarnus.com:8850/thirdparty/tableauservice/patientreports/reportingservice/patientreports/getoutpatientfootfall/2016-01-01/2016-10-01", function(resp) {
            var data = resp.outpatientfootfall,
                tableData = [];
    
            // Iterate over the JSON object
            for (var i = 0, len = data.length; i < len; i++) {
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
            id: "patientFeed",
            alias: "Patient reports are listed here...........",
            columns: cols
        };
    
        schemaCallback([tableSchema]);
    };
})();

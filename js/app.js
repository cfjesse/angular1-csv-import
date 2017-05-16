/**
 * Created by Jesse.Nieves on 5/15/2017.
 */
const app = angular.module("CSV", ["ngAnimate"]);

app
    .factory("Data", [function(){
        var data = {};

        return data;
    }])
    .controller("AppCtrl", ["$scope", "Data", "$q", "$http", function($scope, Data, $q, $http){
        var ctrl = this;

        ctrl.appName = "Drop CSV file here";

        ctrl.data = Data;

        ctrl.clear = function(){
            delete Data.csv;
        }

        $scope.log = function(item){

            console.log(item, Data.csv.keep);

        }

        ctrl.PostFile = function(){

            var postData = {
                headers:[],
                tables:[]
            };

            var defer = $q.defer();


            defer.promise.then(function(data){

                console.log("promise resolve");

            })

            var tables = Data.csv.tables;
            var postData = {headers:[], tables:[]};

            for(var h = 0; h < Data.csv.headers.length; h++){

                if(Data.csv.keepFields[h] == true){

                    postData.headers.push(Data.csv.headers[h]);

                }

            }

            for (var l = 0; l < tables.length; l++){


                if(Data.csv.keep[l] == true){

                    var tempArray = [];

                    for(var tracker = 0; tracker < Data.csv.keepFields.length; tracker++ ){


                        if(Data.csv.keepFields[tracker] == true){

                            tempArray.push(tables[l][tracker]);
                            console.log(tables[l][tracker]);
                        }

                    }

                    postData.tables.push(tempArray);
                    console.log(tempArray)

                }


            }

            console.log(postData);

            defer.resolve();


        }

    }])
    .controller("ProcessCsvCtrl", ["$scope", "Data", "$q", function($scope, Data, $q){
        var ctrl = this;

        ctrl.checkFile = function(file){

            if(file.type.match(/application\/vnd\.ms-excel/)){

                // console.log(`file format ${file.name} is correct`);
                return {isValid:true, success:"file format is correct"};

            } else {

                return {isValid:false, error:"invalid file format", solution:"file must be csv format"};

            }

        }

        ctrl.parseFile = function(file){

            Papa.parse(file, {
                complete:function(result){

                    $scope.$apply(function(){

                        Data.csv = {headers:result.data[0]};
                        result.data.shift();
                        Data.csv.tables = result.data;

                        Data.csv.keepFields = [];
                        for(var j = 0; j < Data.csv.headers.length; j++){
                            Data.csv.keepFields.push(true);
                        }

                        Data.csv.keep = [];
                        for(var i = 0; i < Data.csv.tables.length; i++){
                           Data.csv.tables[i].index = i;
                           Data.csv.keep.push(true);
                        }

                        console.log(Data.csv);

                    })

                }
            })

        }


    }])

    .controller("SelectionCtrl", ["$scope", "Data", function($scope, Data){

        var ctrl = this;

        ctrl.selectAll = function(){
            var keep = Data.csv.keep;
            for(var i = 0; i < keep.length; i++){

                keep[i] = true;

            }

        }

        ctrl.deselectAll = function(){

            var keep = Data.csv.keep;
            for(var i = 0; i < keep.length; i++){

                keep[i] = false;

            }

        }

    }])

    .directive("fileRead", [function(){
        return {
            restrict:"A",
            scope:{
                fileRead:"="
            },
            controller:"ProcessCsvCtrl",
            link:function(scope, elem, attr, ctrl){

                elem.bind("change", function(e){
                    var file = e.target.files[0];

                    if(ctrl.checkFile(file).isValid){

                        ctrl.parseFile(file);

                    }

                })

            }
        }
    }])

    .directive("dragAndDrop", ["$q", function($q){

        return {
            restrict:"A",
            controller:"ProcessCsvCtrl",
            link:function(scope, elem, attr, ctrl){
                // console.log($q);

                elem.bind("dragenter", function(e){

                    console.log("dragenter", e);
                    e.preventDefault();
                    e.stopPropagation();
                    e.dataTransfer.dropEffect = "copy";

                    this.classList.toggle("dragover");

                }).bind("dragleave", function(e){

                    console.log("dragleave", e);
                    this.classList.toggle("dragover");

                }).bind("dragover", function(e){
                    e.preventDefault();
                    e.stopPropagation();
                    e.dataTransfer.dropEffect = "copy";
                    // console.log("dragover", e);

                }).bind("drop", function(e){
                    e.preventDefault();

                    e.stopPropagation();
                    e.dataTransfer.dropEffect = "copy";

                    var fileIsValid = false;

                    this.classList.toggle("dragover");
                    var file = e.dataTransfer.files[0];
                    // console.log(e);

                    // console.log(file);
                    var checkFile = ctrl.checkFile(file)

                    if(checkFile.isValid){

                        ctrl.parseFile(file);

                    }


                })

            }
        }

    }])

document.addEventListener("DOMContentLoaded", function(){


    angular.bootstrap(document.querySelector("html"), ["CSV"]);

})
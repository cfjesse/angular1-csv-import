<!---
  Created by Jesse.Nieves on 5/15/2017.
--->
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>CSV Upload and Import</title>
    <link rel="stylesheet" href="lib/bootstrap.min.css">
    <script src="bower_components/angular/angular.min.js"></script>
    <script src="bower_components/angular-animate/angular-animate.min.js"></script>
    <script src="bower_components/papaparse/papaparse.min.js"></script>
    <link rel="stylesheet" href="css/app.css">
</head>
<body>
    <nav class="navbar navbar-default" role="navigation">
    	<!-- Brand and toggle get grouped for better mobile display -->
    	<div class="navbar-header">
    		<button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">
    			<span class="sr-only">Toggle navigation</span>
    			<span class="icon-bar"></span>
    			<span class="icon-bar"></span>
    			<span class="icon-bar"></span>
    		</button>
    		<a class="navbar-brand" href="#">Home</a>
    	</div>

    	<!-- Collect the nav links, forms, and other content for toggling -->
    	<div class="collapse navbar-collapse navbar-ex1-collapse">
    		<ul class="nav navbar-nav">
    			<li class="active"><a href="#">Link</a></li>
    			<li><a href="#">Link</a></li>
    		</ul>
    	</div><!-- /.navbar-collapse -->
    </nav>
    <div>
        <div ng-controller="AppCtrl as app">
            <div class="col-md-2">
                <h3>{{app.appName}}</h3>
                <div drag-and-drop="" class="dragandrop row-fluid"></div>
                <input type="file" file-read="">
                <div ng-show="app.data.csv" class="control-buttons">
                    <div class="btn btn-primary" ng-click="app.clear()">clear file</div>
                    <div class="btn btn-primary" ng-click="app.PostFile()">Post File</div>
                </div>
                <div class="add-record">
                    <div class="btn-btn-primary">Add Record</div>
                </div>
            </div>
            <div class="col-md-10">
                <div ng-if="app.data.csv">

                    <div class="alert alert-info clearfix">
                        <h4>Fields to import</h4>
                        <div class="btn-default">Select All</div>
                        <div class="btn-default">Deselect All</div>
                        <div class="col-sm-2" ng-repeat="field in app.data.csv.keepFields track by $index">

                            <input type="checkbox" ng-model="app.data.csv.keepFields[$index]" class="input-xs"> {{app.data.csv.headers[$index]}}

                        </div>
                    </div>
                    <table class="table table-striped">
                        <tr>
                            <th>Import</th>
                            <th>Index</th>
                            <th ng-repeat="header in app.data.csv.headers" ng-show="app.data.csv.keepFields[$index] == true" nowrap>
                                {{::header}}
                            </th>
                        </tr>
                        <tr ng-repeat="table in app.data.csv.tables">
                            <td><input type="checkbox" ng-model="app.data.csv.keep[$index]" value="app.data.csv.keep[$index]" ng-change="log(app.data.csv.keep[$index])"></td>
                            <td>{{$index + 1}}</td>
                            <td ng-repeat="item in table track by $index" ng-show="app.data.csv.keepFields[$index] == true" nowrap>
                                {{item}}
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
<script src="js/app.js"></script>
var app = angular.module('BlackmailingApp', ['ui.bootstrap']);

app.service('angularService', function($http, $q){
    this.getDateFormat = function (date, days) {
        var formattedDate = new Date((date.getTime()) + (days * 86400000));

        return new Date((formattedDate.getMonth() + 1) + '-' + formattedDate.getDate() + '-' + formattedDate.getFullYear());
    };
    
    //converts Release Date + Release Time into milliseconds
    this.getMilliSecondsFormat = function (date, time) {
        var datePart = date.getTime();
        var miniutePart = time.getMinutes() * 60000;
        var hourPart = time.getHours() * 3600000;
        
        return datePart + miniutePart + hourPart;
    };
    
    this.isNull = function (value){
        if (value === undefined || value === null)
            return 'no data';
        else
            return value;
    }
});

app.controller('HomeController', function($scope, $http, angularService){
    console.log('This is Home Controller');
});

app.controller('SignInController', function($scope, $http, angularService){
    console.log('This is SignIn Controller');
});

app.controller('BlackmailController', function($scope, $http, angularService){
    console.log('This is Blackmail Controller');
    //convert Date + Time format into Date format
    $scope.releaseDate = angularService.getDateFormat(new Date(), 0);
    
    $scope.releaseTime = new Date();
    
    //hour step for timepicker
    $scope.hstep = 1;
    
    //minute step for timepicker
    $scope.mstep = 1;

    $scope.createBlackmail = function(){
        var title = $scope.title;
        var blackmailerName = $scope.blackmailerName;
        var blackmailerEmail = $scope.blackmailerEmail;
        var recipientEmail = $scope.recipientEmail;
        var incriminatingPicture = angularService.isNull(document.getElementById('incriminatingPicture').files[0].name);        
        var demands = $scope.demands;
        var releaseDateTime = angularService.getMilliSecondsFormat($scope.releaseDate, $scope.releaseTime);
        
        $http({
            method: 'POST',
            url: '/blackmail/createblackmail',
            header: {
                'Content-Type': 'application/json'
            },
            data: {
                title: title,
                blackmailerName: blackmailerName,
                blackmailerEmail: blackmailerEmail,
                recipientEmail: recipientEmail,
                incriminatingPicture: incriminatingPicture,
                demands: demands,
                releaseDateTime: releaseDateTime
            }
        }).then(function(response){
            alert('Successfully Created!');
            
            //refresh the page when completing blackmail creation
            location.reload();
        }, function(response){
            alert('Failed!');
        });
    };
});
﻿var app=angular.module('MyApp', []);
app.config(['$httpProvider', function ($httpProvider) {
    // Use x-www-form-urlencoded Content-Type
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    // Override $http service's default transformRequest
    $httpProvider.defaults.transformRequest = [function (data) {
        /**
         * The workhorse; converts an object to x-www-form-urlencoded serialization.
         * @param {Object} obj
         * @return {String}
         */
        $httpProvider.interceptors.push('my401Detector');
        var param = function (obj) {
            var query = '';
            var name, value, fullSubName, subName, subValue, innerObj, i;
            for (name in obj) {
                value = obj[name];
                if (value instanceof Array) {
                    for (i = 0; i < value.length; ++i) {
                        subValue = value[i];
                        fullSubName = name + '[' + i + ']';
                        innerObj = {};
                        innerObj[fullSubName] = subValue;
                        query += param(innerObj) + '&';
                    }
                }
                else if (value instanceof Object) {
                    for (subName in value) {
                        subValue = value[subName];
                        fullSubName = name + '[' + subName + ']';
                        innerObj = {};
                        innerObj[fullSubName] = subValue;
                        query += param(innerObj) + '&';
                    }
                }
                else if (value !== undefined && value !== null) {
                    query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
                }
            }
            return query.length ? query.substr(0, query.length - 1) : query;
        };
        return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
    }];
}]);
// Execute bootstrapping code and any dependencies.
app.run(['$q', '$rootScope',
    function ($q, $rootScope) {
    }]);

app.factory('my401Detector', function ($location, $q) {
    debugger;
    return {
        responseError: function (response) {
            if (response.status === 401) {
                $location.path('/login');
                return $q.reject(response);
            }
            else {
                return $q.reject(response);
            }
        }
    };
});
app.controller('AdminController', function ($scope, $http, $window) {
    debugger;
    if (location.hash)
    {
        if(location.hash.split('access_token='))
        {
            $scope.accessToken = location.hash.split('access_token=')[1].split('&')[0];
        }
        if($scope.accessToken)
        {
            sessionStorage.setItem('ExternalAccessToken', $scope.accessToken);
            sessionStorage.setItem('IsExternalAuthenticated', true);
            var authHeaders = {};
            authHeaders.Authorization = 'Bearer ' + $scope.accessToken;
            $http({
                method: 'GET',
                url: '/api/Account/UserInfo',
                headers: authHeaders
            }).success(function (response) {
                debugger;
                if (response.HasRegistered) {
                    sessionStorage.setItem('UserName', response.userName);
                    location.href ="/EndUser/Login"
                }
                else
                {
                    sessionStorage.setItem('UserName', response.userName);
                    location.href= "/EndUser/Create"
                }
            })
            .error(function (data) {
                alert('error');

            })
        }
    }
    $scope.Login = function () {
        debugger;
        $http({
            url: "/TOKEN",
            method: "POST",
            data: $.param({ grant_type: 'password', username: this.Admin.UserName, password: this.Admin.Password }),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        }).success(function (response) {

            debugger;
            alert('Login Succeful');

            sessionStorage.setItem('accessToken', response.access_token);
            sessionStorage.setItem('UserName', response.userName);
            sessionStorage.setItem('Isauthenticated', true);
            //deferred.resolve(data);
            //$location.url('/ProductDetails/List')
            $window.location.href = "/ProductOwnerRequest/List";
        })
   //$scope.ProductOwners.push(data);

             .error(function (data) {
                 $scope.error = "Something went wrong" + data;
                 //deferred.resolve(data);
             });
    };
})

app.controller('ProductOwnerRequestController', function ($scope, $http, $window, my401Detector) {
     var accesstoken = sessionStorage.getItem('accessToken');
     $scope.UserName = sessionStorage.getItem('UserName');
    var authHeaders = {};
    if (accesstoken) {
        authHeaders.Authorization = 'Bearer ' + accesstoken;
    }
   
    $scope.SaveData = function () {
        $scope.submitForm = function () {
            $scope.submitted = true;
            var defaultForm = {
                Name: "",
                Email: "",
                CompanyName: ""
            }
            if ($scope.AddData.$valid) {
                debugger;

                debugger;
                $http({
                    method: 'POST',
                    url: '/api/ProductOwnerRequestApi/Create',
                    data: this.ProductOwnerRequest,
                    headers: authHeaders
                }).success(function (data) {
                    debugger;
                    alert('Data Submitted Successfully');
                    //$scope.submitForm.$setPristine();
                    $scope.ProductOwnerRequest = null;
                    //$window.location.href = "/ProductOwnerRequest/Message";
                })
                .error(function (data) {
                    debugger;
                    alert($scope.eror);
                });
            }
            else {
                alert("Please correct errors!");
            }
        }

    };
    //$scope.Approve = function () {
    //debugger;
    $http({
        url: '/api/ProductOwnerRequestApi/',
        method: 'GET',
        headers: authHeaders
    }).success(function (response) {
        debugger;
        alert('success');
        $scope.ProductOwnerRequests = response;
        //var path = "C:\\Users\\prince\\Documents\\Visual Studio 2015\\Projects\\MyFollowAppWithAngularJsWebApi\\MyFollowAppWeb\\Images\\";
        //$scope.path = path + data[0].Media;
        //var productId = $routeParams.productId;
    })
       .error(function (response) {
           debugger;
           alert(response.Message);
       });
    $scope.Approve = function () {
        debugger;
        $http({
            url: '/api/ProductOwnerRequestApi/' + this.ProductOwnerRequest.ProductOwnerRequestId,
            headers: authHeaders
        }).success(function (data) {
            debugger;
            alert('success');
            $scope.ProductOwnerRequests = data;
        })
        .error(function (data) {
            debugger;
            alert($scope.error);
        });

    };
    $scope.DisApprove = function () {
        debugger;

        if ($window.confirm("Are You Sure you want to Disapprove?")) {
            var id = this.ProductOwnerRequest.ProductOwnerRequestId;
            $http({
                method: 'Delete',
                url: '/api/ProductOwnerRequestApi/Delete/' + id,
                headers: authHeaders
            }).success(function (data) {
                debugger;
                alert('Deleted Successfully');
                $window.location.href("/ProductOwnerRequest/List")
                $.each($scope.ProductOwnerRequests, function (i) {
                    if ($scope.ProductOwnerRequests[i].Id == id) {
                        $scope.ProductOwnerRequests.splice(i, 1);
                        return false;
                    }
                });
            })
            .error(function (data) {
                debugger;
                alert(data.Message);
            });
        }
    };

})
app.controller('EndUserController', function ($http, $scope, $window, $location) {
    var accesstoken = sessionStorage.getItem('ExternalAccessToken');

    var authHeaders = {};
    if (accesstoken) {
        authHeaders.Authorization = 'Bearer ' + accesstoken;
    }
    $scope.SaveData = function () {
        $scope.submitForm = function () {
            debugger;
            $scope.submitted = true;
            if ($scope.AddData.$valid) {
                debugger;
                $http({
                    method: 'POST',
                    url: '/api/Account/RegisterExternal',
                    data: this.EndUser,
                    headers: authHeaders
                }).success(function (data) {
                    debugger;
                    alert('Data Submitted successfully');
                    $scope.EndUser = null;
                })
                .error(function (data) {
                    alert(data.Message);
                })
            }
            else {
                alert('Please Correct errors');
            }
        }
    }

});
app.controller('ProductOwnerController', function ($http, $scope, $window, $location) {
    debugger;
    var id = ($location.search()).id;
    $scope.SaveData = function () {
        $scope.submitForm = function () {
            debugger;
            $scope.submitted = true;

            if ($scope.AddData.$valid) {
                debugger;
                $http.post('/api/ProductOwnerApi/Create', this.ProductOwner).success(function (data) {

                    alert('Data Submitted Successfully');
                    $scope.ProductOwner = null;
                })
                .error(function (data) {
                    alert(response.Message);
                });

            }
            else {
                alert('Please Correct errors');
            }
        };

    };

});
app.controller('LoginController', function ($http, $scope, $window,$q,$location) {
    $scope.Login = function () {
        debugger;

        //var deferred = $q.defer();

        $http({
            url: "/TOKEN",
            method: "POST",
            data: $.param({ grant_type: 'password', username: this.ProductOwner.Email, password: this.ProductOwner.Password }),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        }).success(function (response) {

            debugger;
            alert('Login Succeful');
           
            sessionStorage.setItem('accessToken', response.access_token);
            sessionStorage.setItem('UserName', response.userName);
            sessionStorage.setItem('Isauthenticated',true);
            //deferred.resolve(data);
            //$location.url('/ProductDetails/List')
            $window.location.href = "/ProductDetails/List";
        })
  //$scope.ProductOwners.push(data);

            .error(function (data) {
                alert(data.Message);
            deferred.resolve(data);
     
});

    };
});

app.controller('ExternalLoginController', function ($http, $scope, $window,$location) {
    var acess_token = $location.search().acess_token;
    alert(acess_token);

    $scope.authExternalProvider = function (provider) {
        debugger;
        var externalProviderURL = "/api/Account/ExternalLogin?provider=" + provider +"&response_type=token&client_id=self&redirect_uri=https%3A%2F%2Flocalhost%3A44335%2F&state=8p0PxWrXh-tZqeHBWoYO7JcQ3iAfIk4ZAdPM_8LoGbs1";
        $window.location.href = externalProviderURL;
        
    }
   
});
        //    method: "GET",
            
        //}).success(function (response) {

        //    debugger;
        //    alert('Login Succeful');
        //    sessionStorage.setItem('IsAuthenticated', 'yes');
        //    sessionStorage.setItem('accessToken', response.access_token);
        //    sessionStorage.setItem('UserName', response.userName);
        //    //
        //})

  //$scope.ProductOwners.push(data);

//.error(function (data) {
//    $scope.error = "Something went wrong" + data;
//});

//    };


   app.controller("LogoutController", function ($http, $scope, $window,$location) {
       //debugger;
       $scope.Logout = function()
       {
           debugger;
           sessionStorage.removeItem('accessToken');
           sessionStorage.removeItem('Isauthenticated');
           $window.location.href = "/ProductOwner/Login";
       }
 })
   app.controller("FollowProductController", function ($scope, $timeout, $location, $rootScope, $window, $http, FileUploadService) {
       debugger;
       var accesstoken = '5gDwbRBLLZjdvfu4Ad526zX25Z7X8rk4c3YU0spBwCFmYHA_J78M_bNuvVh-4sd8Yrnzl1kK7Le0TqZuRHJBUPE4VmwCjyRSzKc9qyfQjVE1';

    var authHeaders = {};
    if (accesstoken) {
        authHeaders.Authorization = 'Bearer ' + accesstoken;
    }
    //var Isauthenticated = sessionStorage.getItem('IsExternalAuthenticated');
    //if (Isauthenticated != null) {
    //    $scope.UserName = sessionStorage.getItem('UserName');
       $scope.ViewImage = function (ProductDetails) {
            debugger;
            //this.MediaDetails.ViewImage = !this.MediaDetails.ViewImage;
            $http({
                url: '/api/ProductDetailsApi/' + this.ProductDetails.ProductId,
                method: 'GET',
                headers: authHeaders
            }).success(function (response) {
                debugger;
                //alert('success');
                $scope.MediaDetails = response;
                $scope.ProductIntro = ProductDetails.ProductIntro;
                $scope.ShowImage = true;
                //var path = "C:\\Users\\prince\\Documents\\Visual Studio 2015\\Projects\\MyFollowAppWithAngularJsWebApi\\MyFollowAppWeb\\Images\\";
                //$scope.path = path + data[0].Media;

            })

           .error(function (data) {
               debugger;
               alert(data.Message);
           });
        }
        $scope.onShowImage = function (Media) {
            debugger;
            $scope.ShowImage = false;
            $scope.AnimationImageName = Media;

            $timeout(function () {
                $scope.ShowImage = true;
            }, 400);

        }
        $http({
            url: '/api/FollowProductApi',
            method: 'GET',
            headers: authHeaders
        }).success(function (data) {
            debugger;
            alert('success');
            $scope.ProductDetails = data;
            //var path = "C:\\Users\\prince\\Documents\\Visual Studio 2015\\Projects\\MyFollowAppWithAngularJsWebApi\\MyFollowAppWeb\\Images\\";
            //$scope.path = path + data[0].Media;
            //var productId = $routeParams.productId;
        })
      .error(function (data) {
          debugger;
          alert(data.Message);
      });
        $scope.Follow = function (ProductDetails) {
            debugger;
            $http.post('/api/FollowProductApi/Create', this.ProductDetails).success(function (data) {

                alert('You have successfully followed product');
                $window.location.href = "/FollowProduct/List";

            })

            .error(function (data) {

                alert(data.Message);
            })

        }
    //}
    //else {
    //    $window.location.href = "/EndUser/Login";
    //}
   }); 
app.controller("UnFollowProductController", function ($scope, $timeout, $location, $rootScope, $window, $http, FileUploadService) {

    var accesstoken = sessionStorage.getItem('accessToken');

    var authHeaders = {};
    if (accesstoken) {
        authHeaders.Authorization = 'Bearer ' + accesstoken;
    }
    $scope.ViewImage = function (ProductDetails) {
        debugger;
        //this.MediaDetails.ViewImage = !this.MediaDetails.ViewImage;
        $http({
            url: '/api/ProductDetailsApi/' + this.ProductDetails.ProductId,
            method: 'GET',
            headers: authHeaders
        }).success(function (response) {
            debugger;
            //alert('success');
            $scope.MediaDetails = response;
            $scope.ProductIntro = ProductDetails.ProductIntro;
            $scope.ShowImage = true;
            //var path = "C:\\Users\\prince\\Documents\\Visual Studio 2015\\Projects\\MyFollowAppWithAngularJsWebApi\\MyFollowAppWeb\\Images\\";
            //$scope.path = path + data[0].Media;

        })

       .error(function (data) {
           debugger;
           alert(data.Message);
       });
    }
    $scope.onShowImage = function (Media) {
        debugger;
        $scope.ShowImage = false;
        $scope.AnimationImageName = Media

        $timeout(function () {
            $scope.ShowImage = true;
        }, 400);

    }
    $http({
        url: '/api/UnFollowProductApi',
        method: 'GET',
        headers: authHeaders
    }).success(function (data) {
        debugger;
        alert('success');
        $scope.ProductDetails = data;
        //var path = "C:\\Users\\prince\\Documents\\Visual Studio 2015\\Projects\\MyFollowAppWithAngularJsWebApi\\MyFollowAppWeb\\Images\\";
        //$scope.path = path + data[0].Media;
        //var productId = $routeParams.productId;
    })
  .error(function (data) {
      debugger;
      alert(data.Message);
  });
    $scope.UnFollow = function (ProductDetails) {

        $http.delete('/api/UnFollowProductApi/Delete/' + this.ProductDetails.ProductId).success(function (data) {

            alert('You have successfully unfollowed a product');
            $window.location.href = "/UnFollowProduct/List";
        })
        .error(function (data) {

            alert(data.Message);
        })
    }
});

app.controller("ProductDetailsController", function ($scope, $timeout, $location, $rootScope, $window, $http, FileUploadService) {
    debugger;
    $scope.Message = "";
    $scope.FileInvalidMessage = "";
    //$scope.SelectedFileForUpload[4];
    $scope.FileDescription_TR = "";
    $scope.IsFormSubmitted = false;
    $scope.IsFileValid = false;
    $scope.IsFormValid = false;
    $scope.SelectedFileForUpload = [];
    $scope.Imagename = [];
  
    //Form Validation
    $scope.$watch("f1.$valid", function (isValid) {
        $scope.IsFormValid = isValid;
    });
    $scope.selectFileforUpload = function (file)
    {
        debugger;
        if (file.length <= 5)
        {
            for (i = 0; i <= file.length - 1; i++) {
                var files = file[i];
                $scope.Imagename.push(files.name);
                $scope.SelectedFileForUpload.push(file[i]);
            }
        }
        else
        {
            alert('Maximum five media files can be uploaded');
        }
     }
            
    var accesstoken = sessionStorage.getItem('accessToken');

    var authHeaders = {};
    if (accesstoken) {
        authHeaders.Authorization = 'Bearer ' + accesstoken;
    }
    var Isauthenticated = sessionStorage.getItem('Isauthenticated');
    if (Isauthenticated != null) {
        $scope.UserName = sessionStorage.getItem('UserName');
        //$scope.Isauthenticated = sessionStorage.getItem('Isauthenticated');


        $scope.ViewImage = function (ProductDetails) {
            debugger;
            //this.MediaDetails.ViewImage = !this.MediaDetails.ViewImage;
            $http({
                url: '/api/ProductDetailsApi/' + this.ProductDetails.ProductId,
                method: 'GET',
                headers: authHeaders
            }).success(function (response) {
                debugger;
                //alert('success');
                $scope.MediaDetails = response;
                $scope.ProductIntro = ProductDetails.ProductIntro;
                $scope.ShowImage = true;
                //var path = "C:\\Users\\prince\\Documents\\Visual Studio 2015\\Projects\\MyFollowAppWithAngularJsWebApi\\MyFollowAppWeb\\Images\\";
                //$scope.path = path + data[0].Media;

            })

           .error(function (data) {
               debugger;
               alert(data.Message);
           });
        }
        $scope.onShowImage = function (Media) {
            debugger;
            $scope.ShowImage = false;
            $scope.AnimationImageName = Media

            $timeout(function () {
                $scope.ShowImage = true;
            }, 400);

        }
        $http({
            url: '/api/ProductDetailsApi/',
            method: 'GET',
            headers: authHeaders
        }).success(function (data) {
            debugger;
            alert('success');
            $scope.ProductDetails = data;
            //var path = "C:\\Users\\prince\\Documents\\Visual Studio 2015\\Projects\\MyFollowAppWithAngularJsWebApi\\MyFollowAppWeb\\Images\\";
            //$scope.path = path + data[0].Media;
            //var productId = $routeParams.productId;
        })
       .error(function (data) {
           debugger;
           alert(data.Message);
       });

        $scope.SaveData = function () {
            $scope.submitForm = function () {
                debugger;
                $scope.submitted = true;
                $scope.IsFormSubmitted = true;

                if ($scope.AddData.$valid) {

                    debugger;
                    var config = {
                        headers: authHeaders
                    }

                    $http.post('/api/ProductDetailsApi/Create', this.ProductDetails, config).success(function (data) {
                        debugger;
                        alert('Data Submitted Successfully');
                        $scope.ProductDetails = null;
                        var id = data.ProductId;
                        $scope.Message = "";
                        $scope.CheckFileValid = function (file) {
                            debugger;
                            var isValid = false;

                            if ($scope.SelectedFileForUpload.length != 0) {

                                if ((file.type == 'image/png' || file.type == 'image/jpeg' || file.type == 'image/gif') && file.size <= (1600 * 1200)) {
                                    $scope.FileInvalidMessage = "";
                                    isValid = true;
                                }
                                else {
                                    $scope.FileInvalidMessage = "Only JPEG/PNG/Gif Image can be upload )";
                                }
                            }

                            else {
                                $scope.FileInvalidMessage = "Image required!";
                            }

                            $scope.IsFileValid = isValid;

                        };

                        for (var i = 0; i < $scope.SelectedFileForUpload.length; i++) {

                            $scope.CheckFileValid($scope.SelectedFileForUpload[i]);
                            if ($scope.IsFileValid) {

                                FileUploadService.UploadFile($scope.SelectedFileForUpload[i], id).then(function (d) {
                                    // var MediaDetails= [];
                                    $scope.MediaDetails;
                                    $scope.MediaDetails = $scope.Imagename[i];
                                    var file = new FormData();
                                    file.append("", $scope.Imagename[i])

                                    alert(d.Message + " Item Saved!");
                                    $scope.IsFormSubmitted = false;
                                    ClearForm();

                                }, function (e) {
                                    alert(e);
                                });
                            }
                        }
                        //$scope.ProductDetails.push(data);
                        //var id = data.Id;
                    })
                    .error(function (data) {
                       alert(data.Message);
                    });

                }
                else {
                    alert('Please Correct errors');
                }

            };
        }
    }
    else
    {
        $window.location.href="/ProductOwner/Login";
    }
})



    .factory('FileUploadService', function ($http, $q) {
        debugger;
        var fac = {};
        fac.UploadFile = function (file,id) {
            debugger;

            var formData = new FormData();
            formData.append("file", file);


            var defer = $q.defer();
            $http.post("/MediaDetails/UploadFile/" + id, formData,
                {
                    withCredentials: true,
                    headers: { 'Content-Type': undefined },
                    transformRequest: angular.identity
                })
            .success(function (d) {
                debugger;
                defer.resolve(d);
            })
            .error(function () {
                defer.reject("File Upload Failed!");
            });

            return defer.promise;

        }
        return fac;


    });

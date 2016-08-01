var app=angular.module('MyApp', []);
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


app.controller('AdminController', function ($scope, $http, $window) {
    debugger;
    $scope.Login = function () {
        debugger;
        $http.post('https://localhost:44335/api/Admin', this.Admin).success(function (data) {
            debugger;
            alert("Login Successful");
            $window.location.href = "https://localhost:44364/ProductOwnerRequest/List";
        })
        .error(function (data) {
            debugger;
            alert($scope.error);
        });
    };
})

app.controller('ProductOwnerRequestController', function ($scope, $http, $window) {
    $scope.SaveData = function () {
        $scope.submitForm = function () {
            $scope.submitted = true;

            if ($scope.AddData.$valid) {
                debugger;

                debugger;
                $http.post('https://localhost:44335/api/ProductOwnerRequestApi', this.ProductOwnerRequest).success(function (data) {
                    debugger;
                    alert('Data Submitted Successfully');
                    $scope.ProductOwnerRequests.push(data);
                    $window.location.href = "https://localhost:44364/ProductOwnerRequest/Message";
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
    $http.get('https://localhost:44335/api/ProductOwnerRequestApi').success(function (data) {
        debugger;
        alert('success');
        $scope.ProductOwnerRequests = data;
    })
    .error(function (data) {
        debugger;
        alert($scope.error);
    });
    $scope.Approve = function () {
        debugger;
        $http.get('https://localhost:44335/api/ProductOwnerRequestApi/' + this.ProductOwnerRequest.ProductOwnerRequestId).success(function (data) {
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
            var id = this.ProductOwnerRequest.Id;
            $http.delete('https://localhost:44335/api/ProductOwnerRequestApi/' + id).success(function (data) {
                debugger;
                alert('Deleted Successfully');
                $.each($scope.ProductOwnerRequests, function (i) {
                    if ($scope.ProductOwnerRequests[i].Id == id) {
                        $scope.ProductOwnerRequests.splice(i, 1);
                        return false;
                    }
                });
            })
            .error(function (data) {
                debugger;
                $scope.error = "An Error Occured while deleting data" + data;
            });
        }
    };

})

app.controller('MyFollowController', function ($http, $scope, $window) {
    var id;
    $http.get('https://localhost:44335/api/MyFollowApi',
        {
            params: { id: id }
        }).success(function (data) {
            debugger;
            alert('success');
            $scope.MyFollows = data;
        })
    .error(function (data) {
        debugger;
        alert($scope.error);
    });

    $scope.SaveData = function () {
        $scope.submitForm = function () {
            debugger;
            $scope.submitted = true;

            if ($scope.AddData.$valid) {
                debugger;

                debugger;
                $http.post('https://localhost:44335/api/MyFollowApi', this.MyFollow).success(function (data) {
                    alert('Data Submitted Successfully');
                    //$scope.MyFollows.push(data);
                    $window.location.href = "https://localhost:44364/ProductOwner/Create";
                })
            .error(function (data) {
                debugger;
                $scope.error = "Something Went Wrong" + data;
            });
            }
            else {
                alert('Please Correct errors');
            }
        }

    };

})


app.controller('ProductOwnerController', function ($http, $scope, $window, $location) {
    debugger;
    var id = ($location.search()).id;
    $scope.SaveData = function () {
        $scope.submitForm = function () {
            debugger;
            $scope.submitted = true;

            if ($scope.AddData.$valid) {
                debugger;
                $http.post('https://localhost:44335/api/ProductOwnerApi/Create', this.ProductOwner).success(function (data) {

                    alert('Data Submitted Successfully');
                    $scope.ProductOwners.push(data);
                })
                .error(function (data) {
                    $scope.error = "Something went wrong" + data;
                });

            }
            else {
                alert('Please Correct errors');
            }
        };

    };

});
app.controller('LoginController', function ($http, $scope, $window,$q) {
    $scope.Login = function () {
        debugger;

        //var deferred = $q.defer();

        $http({
            url: "https://localhost:44335//TOKEN",
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

            $window.location.href = "https://localhost:44364/ProductDetails/List";
        })

  //$scope.ProductOwners.push(data);

.error(function (data) {
    $scope.error = "Something went wrong" + data;
    deferred.resolve(data);
     
});

    };
});

app.controller('ExternalLoginController', function ($http, $scope, $window) {
    $scope.authExternalProvider = function (provider) {
        debugger;
        var externalProviderURL = "https://localhost:44335/api/Account/ExternalLogin?provider=" + provider + "&response_type=token&client_id=self&redirect_uri=https%3A%2F%2Flocalhost%3A44335%2F&state=BtvI7dmyNxwz1DktZPGmnzhjc4DUfE44EQ2PlB13RUw1";
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
           $window.location.href = "https://localhost:44364/ProductOwner/Login";
       }
 })
app.controller("FollowProductController", function ($scope, $timeout, $location, $rootScope, $window, $http, FileUploadService) {
    var Isauthenticated = sessionStorage.getItem('IsAuthenticated');
    if (Isauthenticated != null) {
        $scope.UserName = sessionStorage.getItem('UserName');
        $scope.Isauthenticated = sessionStorage.getItem('IsAuthenticated');
        $scope.URL = "_LoginPartial.cshtml";
    }
    else {
        $scope.Isauthenticated = false;
    }
    var accesstoken = sessionStorage.getItem('accessToken');

    var authHeaders = {};
    if (accesstoken) {
        authHeaders.Authorization = 'Bearer ' + accesstoken;
    }
    $scope.ViewImage = function (ProductDetails) {
        debugger;
        //this.MediaDetails.ViewImage = !this.MediaDetails.ViewImage;
        $http({
            url: 'https://localhost:44335/api/ProductDetailsApi/' + this.ProductDetails.ProductId,
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
           alert($scope.error);
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
        url: 'https://localhost:44335/api/FollowProductApi',
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
       alert($scope.error);
   });
     $scope.Follow = function (ProductDetails) {
         debugger;
         $http.post('https://localhost:44335/api/FollowProductApi/Create', this.ProductDetails).success(function (data) {

             alert('You have successfully followed product');
             $window.location.href = "https://localhost:44364/FollowProduct/List";

         })

         .error(function (data) {

             $scope.error = "Something went wrong" + data;
         })

     }
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
            url: 'https://localhost:44335/api/ProductDetailsApi/' + this.ProductDetails.ProductId,
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
           alert($scope.error);
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
        url: 'https://localhost:44335/api/UnFollowProductApi',
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
      alert($scope.error);
  });
    $scope.UnFollow = function (ProductDetails) {

        $http.delete('https://localhost:44335/api/UnFollowProductApi/Delete/' + this.ProductDetails.ProductId).success(function (data) {

            alert('You have successfully unfollowed a product');
            $window.location.href = "https://localhost:44364/UnFollowProduct/List";
        })
        .error(function (data) {

            $scope.error = "Something went wrong" + data;
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
                url: 'https://localhost:44335/api/ProductDetailsApi/' + this.ProductDetails.ProductId,
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
               alert($scope.error);
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
            url: 'https://localhost:44335/api/ProductDetailsApi/',
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
           alert($scope.error);
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

                    $http.post('https://localhost:44335/api/ProductDetailsApi/Create', this.ProductDetails, config).success(function (data) {
                        debugger;
                        alert('Data Submitted Successfully');
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
                        $scope.error = "Something went wrong" + data;
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
        $window.location.href="https://localhost:44364/ProductOwner/Login";
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
            $http.post("https://localhost:44335/MediaDetailsApi/UploadFile/" + id, formData,
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

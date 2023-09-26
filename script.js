var myApp = angular.module("myModule", ["ui.router"]);

myApp.config([
  "$stateProvider",
  "$urlRouterProvider",
  function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state("main", {
        url: "/main",
        templateUrl: "/html/main.html",
        controller: "mainController",
      })
      .state("login", {
        url: "/login",
        templateUrl: "/html/login.html",
        controller: "loginController",
      })
      .state("registration", {
        url: "/registration",
        templateUrl: "/html/registration.html",
        controller: "registrationController",
      })
      .state("docreg", {
        url: "/docreg",
        templateUrl: "/html/docreg.html",
        controller: "docregController",
      })
      .state("docPatient", {
        url: "/docPatient",
        templateUrl: "/html/docPatient.html",
        controller: "docPatientController",
      })
      .state("appointment", {
        url: "/appointment",
        templateUrl: "/html/appointment.html",
        controller: "appointmentController",
      })
      .state("recAppointment", {
        url: "/recAppointment",
        templateUrl: "/html/recAppointment.html",
        controller: "recAppointmentController",
      })
      .state("receptionist", {
        url: "/receptionist",
        templateUrl: "/html/receptionist.html",
        controller: "recController",
      })
      .state("doctors", {
        url: "/doctors",
        templateUrl: "/html/doctors.html",
        controller: "doctorController",
      })
      .state("dashboard", {
        url: "/dashboard",
        templateUrl: "/html/dashboard.html",
        controller: "dashboardController",
      })
      .state("patient", {
        url: "/patient",
        templateUrl: "/html/patient.html",
        controller: "patientController",
      })
      .state("showappointment", {
        url: "/showappointment",
        templateUrl: "/html/showappointment.html",
        controller: "showAppointmentsController",
      })
      .state("docprofile", {
        url: "/docprofile",
        templateUrl: "/html/docprofile.html",
        controller: "docprofileController",
      });
    $urlRouterProvider.otherwise("/login");
  },
]);

const apiUrl = "https://10.21.87.4:8000";

myApp.controller("registrationController", [
  "$scope",
  "$http",
  "$location",
  function ($scope, $http, $location) {
    $scope.registration = function () {
      let data = {
        firstName: $scope.registerationfirstName,
        lastName: $scope.registerationlastName,
        Phone: $scope.registerationPhone,
        Age: $scope.registerationAge,
        Address: $scope.registerationAddress,
        Email: $scope.registerationEmail,
        username: $scope.registerationUsername,
        Gender: $scope.registerationGender,
        Password: $scope.registerationPassword,
        confirmPassword: $scope.registerationConfirmPassword,
      };

      let pass = $scope.registerationPassword;
      let cpass = $scope.registerationConfirmPassword;

      console.log(data);
      if (
        data.firstName == null ||
        data.lastName == null ||
        data.Phone == null ||
        data.Age == null ||
        data.Address == null ||
        data.username == null ||
        data.Gender == null
      ) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Enter all Details!",
        });
      } else if (data.Email == null) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Enter valid Email!",
        });
      } else if (data.Password == null) {
        Swal.fire({
          icon: "error",
          title: "Enter valid password!",
          text: "Password Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters",
        });
      } else if (data.Password != data.confirmPassword) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Password didnt match correctly!",
        });
      } else {
        if (pass === cpass) {
          $http
            .post(apiUrl + "/hospitalapp/registerpatient/", data, {
              withCredentials: true,
            })
            .then(function (response) {
              console.log(response);
              if (response.data.message == "patient registered!!!") {
                $location.path("/login");
                Swal.fire("Registered!", response.data.message, "success");
              }
            })
            .catch(function (error) {
              console.log(error);
              Swal.fire({
                icon: "error",
                text: error,
              });
            });
        } else {
          Swal.fire({
            icon: "error",
            text: "There is an error!",
          });
        }
      }
    };

    $scope.login = function () {
      $location.path("/login");
    };
  },
]);

myApp.controller("docregController", [
  "$scope",
  "$http",
  "$location",
  function ($scope, $http, $location) {
    $scope.doctors = [];

    $http
      .get(apiUrl + "/hospitalapp/register/")
      .then(function (response) {
        $scope.doctors = response.data;
        console.log($scope.doctors);
      })
      .catch(function (error) {
        console.log(error);
        Swal.fire({
          icon: "error",
          text: error,
        });
      });

    $scope.registration = function () {
      let data = {
        firstName: $scope.registerationfirstName,
        lastName: $scope.registerationlastName,
        Phone: $scope.registerationPhone,
        Fees: $scope.registerationFee,
        Address: $scope.registerationAddress,
        Email: $scope.registerationEmail,
        userName: $scope.registerationUsername,
        Qualification: $scope.registerationQualification,
        Speciality: $scope.registerationSpecialization,
        Password: $scope.registerationPassword,
        confirmPassword: $scope.registerationConfirmPassword,
      };

      let pass = $scope.registerationPassword;
      let cpass = $scope.registerationConfirmPassword;

      console.log(data);
      if (
        data.firstName == null ||
        data.lastName == null ||
        data.Phone == null ||
        data.Address == null ||
        data.userName == null ||
        data.Qualification == null ||
        data.Speciality == null
      ) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Enter all Details!",
        });
      } else if (data.Email == null) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Enter valid Email!",
        });
      } else if (data.Password == null) {
        Swal.fire({
          icon: "error",
          title: "Enter valid password!",
          text: "Password Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters",
        });
      } else if (data.Password != data.confirmPassword) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Password didn't match correctly!",
        });
      } else {
        if (pass === cpass) {
          $http
            .post(apiUrl + "/hospitalapp/registerdoctor/", data, {
              withCredentials: true,
            })
            .then(function (response) {
              console.log(response);
              if (response.data.message == "doctor registered!!!") {
                Swal.fire("Registered!", response.data.message, "success");
                $location.path("/login");
              }
            })
            .catch(function (error) {
              console.log(error);
              Swal.fire({
                icon: "error",
                text: "There is an error!",
              });
            });
        } else {
          Swal.fire({
            icon: "error",
            text: "There is an error!",
          });
        }
      }
    };

    $scope.login = function () {
      $location.path("/login");
    };
  },
]);

myApp.controller("loginController", [
  "$scope",
  "$http",
  "$location",
  "$rootScope",
 
  function ($scope, $http, $location, $rootScope,) {
    $scope.register = function () {
      $location.path("/registration");
    };
    $scope.loading = true;
    $scope.login = function () {
      let login = {
        username: $scope.loginName,
        password: $scope.loginPassword,
      };
      console.log(login);
      if (login.username == null) {
        Swal.fire({
          icon: "error",
          text: "enter all details!",
        });
      }
      if(login.password == null){
        Swal.fire({
          icon: "error",
          title: "Enter valid password!",
          text: "Password Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters",
        });
      }
      else {
        $http
          .post(apiUrl + "/hospitalapp/login_all/", login, {
            withCredentials: true,
          })
          .then(function (response) {
            $scope.loading = false;
            console.log(response.data);
          // .setUser(response.data); // Store user data in the service
  
            Swal.fire("Login!", "success");
            $location.path("/dashboard");
          })
          .catch(function (error) {
            console.log(error);
            Swal.fire({
              icon: "error",
              text: error,
            });
          });
      }
    };
  },
]);

function exportToExcel(tableId, fileName) {
  let table = document.getElementById(tableId);
  let data = table.outerHTML;
  let blob = new Blob([data], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  let url = window.URL.createObjectURL(blob);
  let a = document.createElement("a");
  a.href = url;
  a.download = fileName + ".xlsx";
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

var patientId = "";

myApp.controller("dashboardController", [
  "$http",
  "$scope",
  "$location",
  function ($http, $scope, $location) {
    $scope.loader = true;
    $scope.showcarousel = false;
    $scope.leftPanel = [];
    $http
      .get(apiUrl + "/hospitalapp/panelname/", {
        withCredentials: true,
      })
      .then(function (response) {
        console.log(response.data);
        $scope.leftPanel = response.data;
        $scope.loader = false;
        $scope.showcarousel = true;
      })
      .catch(function (error) {
        console.log(error);
        Swal.fire({
          icon: "error",
          text: error,
        });
      });

    $scope.logout = function () {
      $http
        .get(apiUrl + "/hospitalapp/logout/", {
          withCredentials: true,
        })
        .then(function (response) {
          console.log(response);
          logmess = response.data.message;
          Swal.fire("Great!", response.data.message, "success");
          $location.path("/login");
        })
        .catch(function (error) {
          console.log(error);
          Swal.fire({
            icon: "error",
            text: error,
          });
        });
    };

    $scope.cancel = function () {
      $location.path("/dashboard");
    };

    $scope.patient = function (url) {
      console.log(url);
      $location.path(url);
    };
  },
]);

myApp.controller("appointmentController", [
  "$scope",
  "$http",
  "$location",
  function ($scope, $http, $location) {
    $scope.loader = true;
    $http
      .get(apiUrl + "/hospitalapp/patientdashboard/", {
        withCredentials: true,
      })
      .then(function (response) {
        console.log(response.data);
        $scope.doctors = response.data;
        $scope.loader = false;
      })
      .catch(function (error) {
        console.log(error);
        Swal.fire({
          icon: "error",
          text: error,
        });
      });

    $http
      .get(apiUrl + "/hospitalapp/panelname/", {
        withCredentials: true,
      })
      .then(function (response) {
        console.log(response.data);
        $scope.leftPanel = response.data;
        $scope.loader = false;
      })
      .catch(function (error) {
        console.log(error);
        Swal.fire({
          icon: "error",
          text: error,
        });
      });

    $scope.patient = function (url) {
      console.log(url);
      $location.path(url);
    };

    $http
      .get(apiUrl + "/hospitalapp/patientprofile", {
        withCredentials: true,
      })
      .then(function (response) {
        console.log(response.data);
        $scope.details = response.data;
      })
      .catch(function (error) {
        console.log(error);
        Swal.fire({
          icon: "error",
          text: error,
        });
      });

    $scope.confirm = function () {
      console.log("appointment");
      let data = {
        doc_id: $scope.doc.doctor__id,
        time: $scope.appointmentTime,
        date: formatDate($scope.appDate),
        disease: $scope.appointmentDisease,
        allergy: $scope.allergy,
        symptoms: $scope.appointmentSymptoms,
        alcohol: $scope.alcohol,
      };
      console.log(data);
      function formatDate(dateString) {
        var date = new Date(dateString);
        var year = date.getFullYear();
        var month = String(date.getMonth() + 1).padStart(2, "0");
        var day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
      }

      console.log(data);
      if (
        data.time == null ||
        data.date == null ||
        data.disease == "" ||
        data.disease == null ||
        data.allergy == null ||
        data.symptoms == "" ||
        data.symptoms == null ||
        data.alcohol == null
      ) {
        Swal.fire({
          icon: "error",
          text: "enter all details!",
        });
      } else {
        $http
          .post(apiUrl + "/hospitalapp/appointmentform/", data, {
            withCredentials: true,
          })
          .then(function (response) {
            console.log(response.data.message);
            let mss = response.data.message;
            if (mss == "appointment booked .. waiting for approval") {
              Swal.fire(
                "Great!",
                "You booked an appointment... waiting for approval!",
                "success"
              );
              $location.path("/dashboard");
            } else {
              Swal.fire({
                icon: "error",
                text: response.data.message,
              });
            }
            $location.path("/dashboard");
          })
          .catch(function (error) {
            console.log(error);
            Swal.fire({
              icon: "error",
              text: error,
            });
          });
      }
    };
    $scope.cancel = function () {
      $location.path("/dashboard");
    };
    $scope.logout = function () {
      $http
        .get(apiUrl + "/hospitalapp/logout/", {
          withCredentials: true,
        })
        .then(function (response) {
          console.log(response);
          Swal.fire("Great!", response.data.message, "success");
          $location.path("/login");
        })
        .catch(function (error) {
          console.log(error);
          Swal.fire({
            icon: "error",
            text: error,
          });
        });
    };
  },
]);
myApp.controller("mainController", [
"$scope",
"$http",
"$location",
function ($scope, $http, $location,) {
    $scope.loader = true;
    $scope.leftPanel = [];
    $scope.doctorDetails = [];
    $http
      .get(apiUrl + "/hospitalapp/panelname/", {
        withCredentials: true,
      })
      .then(function (response) {
        console.log(response.data);
        $scope.leftPanel = response.data;
        $scope.loader = false;
      })
      .catch(function (error) {
        console.log(error);
        Swal.fire({
          icon: "error",
          text: error,
        });
      });

    $scope.patient = function (url) {
      console.log(url);
      $location.path(url);
    };
  
      $scope.patientDoctor = true
    $http
      .get(apiUrl + "/hospitalapp/patientprofile", {
        withCredentials: true,
      })
      .then(function (response) {
        console.log(response.data);
        $scope.details = response.data;
      })
      .catch(function (error) {
        console.log(error);
        Swal.fire({
          icon: "error",
          text: error,
        });
      });

    $http
      .get(apiUrl + "/hospitalapp/patientdashboard/", {
        withCredentials: true,
      })
      .then(function (response) {
        console.log(response.data);
        $scope.doctorDetails = response.data;
      })
      .catch(function (error) {
        console.log(error);
        Swal.fire({
          icon: "error",
          text: error,
        });
      });


    $scope.exportTableToExcel = function (id, name) {
      exportToExcel(id, name);
    };

    $scope.logout = function () {
      $http
        .get(apiUrl + "/hospitalapp/logout/", {
          withCredentials: true,
        })
        .then(function (response) {
          console.log(response);
          Swal.fire("Great!", response.data.message, "success");
          $location.path("/login");
        })
        .catch(function (error) {
          console.log(error);
          Swal.fire({
            icon: "error",
            text: error,
          });
        });
    };
  },
]);

myApp.controller("showAppointmentsController", [
  "$scope",
  "$http",
  "$location",
  function ($scope, $http, $location) {
    $scope.loader = true;

    $http
    .get(apiUrl + "/hospitalapp/panelname/", {
      withCredentials: true,
    })
    .then(function (response) {
      console.log(response.data);
      $scope.leftPanel = response.data;
      $scope.loader = false;
    })
    .catch(function (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        text: error,
      });
    });
      $http
    .get(apiUrl + "/hospitalapp/patientprofile", {
      withCredentials: true,
    })
    .then(function (response) {
      console.log(response.data);
      $scope.details = response.data;
      patientId = $scope.details[0].patient__id
      console.log(patientId);
      $http
        .get(apiUrl + "/hospitalapp/patientAppointments/", {
          withCredentials: true,
          params: { id: patientId },
        })
        .then(function (response) {
          $scope.patientAppointment = true;
          console.log(response.data);
          $scope.appointments = response.data;
          if ($scope.appointments.length == 0) {
            Swal.fire({
              title: "No appointments to show",
              confirmButtonText: "Ok",
            });
            $location.path("/dashboard");
          }

        })
        .catch(function (error) {
          console.log(error);
          Swal.fire({
            icon: "error",
            text: error,
          });
        });
    })
    .catch(function (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        text: error,
      });
    });
  

    $scope.exportTableToExcel = function (id, name) {
      exportToExcel(id, name);
    };

    $scope.patient = function (url) {
      console.log(url);
      $location.path(url);
    };
    $scope.logout = function () {
      $http
        .get(apiUrl + "/hospitalapp/logout/", {
          withCredentials: true,
        })
        .then(function (response) {
          console.log(response);
          logmess = response.data.message;
          
          Swal.fire("Great!", response.data.message, "success");
          $location.path("/login");
      
        })
        .catch(function (error) {
          console.log(error);
          Swal.fire({
            icon: "error",
            text: error,
          });
        });
    };
  },
]);

myApp.controller("recAppointmentController", [
  "$scope",
  "$http",
  "$location",
  function ($scope, $http, $location) {
    $scope.appointment =true;
    $http
      .get(apiUrl + "/hospitalapp/panelname/", {
        withCredentials: true,
      })
      .then(function (response) {
        console.log(response);
        $scope.leftPanel = response.data;
      })
      .catch(function (error) {
        console.log(error);
        Swal.fire({
          icon: "error",
          text: error,
        });
      });

    $scope.patient = function (url) {
      console.log(url);
      $location.path(url);
    };

    $http
      .get(apiUrl + "/hospitalapp/appointments/", {
        withCredentials: true,
      })
      .then(function (response) {
        $scope.appointments = response.data;
        console.log($scope.appointments);
        if ($scope.appointments.length == 0) {
          Swal.fire({
            title: "No appointments to show",
            confirmButtonText: "Ok",
          });
        }

        $scope.approve = function (id) {
          let data = {
            id: id,
          };
          $scope.loader = true;
          $scope.appointment = false;
          console.log(data);
          $http
            .post(apiUrl + "/hospitalapp/recpstApptAccept/", data, {
              withCredentials: true,
            })
            .then(function (response) {
              console.log(response.data);
              $scope.loader = false;
              $scope.appointment = true;
              Swal.fire("Good job!", response.data.message, "success");
              $http
                .get(apiUrl + "/hospitalapp/appointments/", {
                  withCredentials: true,
                })
                .then(function (response) {
                  $scope.appointments = response.data;
                  console.log($scope.appointments);
                })
                .catch(function (error) {
                  console.log(error);
                  Swal.fire({
                    icon: "error",
                    text: error,
                  });
                });
            })
            .catch(function (error) {
              console.log(error);
              Swal.fire({
                icon: "error",
                text: error,
              });
            });
        };

        $scope.reject = function (id) {
        

          console.log(id);
          Swal.fire({
            title: "Reason to reject appointment",
            html: `<input type="text" id="reason" class="swal2-input" placeholder="Reason">`,
            confirmButtonText: "Send",
            showCancelButton: true,
            focusConfirm: false,
            preConfirm: () => {
              const reason = Swal.getPopup().querySelector("#reason").value;
              if (!reason) {
                Swal.showValidationMessage(`Please enter reason`);
              }
              return { reason: reason };
            },
          }).then((result) => {
            console.log(result);
            let reason = result.value.reason;
            let data = {
              reason: reason,
              id: id,
            };
            $scope.loader = true;
            $scope.appointment = false;
            console.log(data);
            $http
              .post(apiUrl + "/hospitalapp/recpstApptReject/", data, {
                withCredentials: true,
              })
              .then(function (response) {
                console.log(response);
                Swal.fire("Good job!", response.data.message, "success");
                $http
                  .get(apiUrl + "/hospitalapp/appointments/", {
                    withCredentials: true,
                  })
                  .then(function (response) {
                    $scope.appointments = response.data;
                    console.log($scope.appointments);
              $scope.loader = false;
              $scope.appointment = true;
                  })
                  .catch(function (error) {
                    console.log(error);
                    Swal.fire({
                      icon: "error",
                      text: error,
                    });
                  });
              })
              .catch(function (error) {
                console.log(error);
                Swal.fire({
                  icon: "error",
                  text: error,
                });
              });
          });
        };
      })
      .catch(function (error) {
        console.log(error);
        Swal.fire({
          icon: "error",
          text: error,
        });
      });
    $scope.logout = function () {
      $http
        .get(apiUrl + "/hospitalapp/logout/", {
          withCredentials: true,
        })
        .then(function (response) {
          console.log(response);
          logmess = response.data.message;
          Swal.fire("Great!", response.data.message, "success");
          $location.path("/login");
        })
        .catch(function (error) {
          console.log(error);
          Swal.fire({
            icon: "error",
            text: error,
          });
        });
    };
  },
]);

myApp.controller("doctorController", [
  "$scope",
  "$http",
  "$location",
  function ($scope, $http, $location) {
    $scope.patientDetails = [];
    $http
      .get(apiUrl + "/hospitalapp/panelname/", {
        withCredentials: true,
      })
      .then(function (response) {
        console.log(response);
        $scope.leftPanel = response.data;
      })
      .catch(function (error) {
        console.log(error);
        Swal.fire({
          icon: "error",
          text: error,
        });
      });

    $http
      .get(apiUrl + "/hospitalapp/patientdashboard/", {
        withCredentials: true,
      })
      .then(function (response) {
        console.log(response);
        $scope.doctorDetails = response.data;
      })
      .catch(function (error) {
        console.log(error);
      });

    $scope.exportTableToExcel = function (id, name) {
      exportToExcel(id, name);
    };

    $scope.patient = function (url) {
      console.log(url);
      $location.path(url);
    };

    $scope.view = function(id){
      console.log(id)
      $http.get(apiUrl + '/hospitalapp/recpst_patientDetails/',{
        withCredentials:true,
        params:{doctor_id:id}
      })
      .then(function(response){
        console.log(response)
        $scope.patientDetails = response.data;
      })
      .catch(function(error){
        console.log(error)
      })
    }

    $scope.logout = function () {
      $http
        .get(apiUrl + "/hospitalapp/logout/", {
          withCredentials: true,
        })
        .then(function (response) {
          console.log(response);
          logmess = response.data.message;
          Swal.fire("Great!", response.data.message, "success");
          $location.path("/login");
        })
        .catch(function (error) {
          console.log(error);
          Swal.fire({
            icon: "error",
            text: error,
          });
        });
    };
  },
]);

myApp.controller("docprofileController", [
  "$scope",
  "$http",
  "$location",
  function($scope,$http,$location){
    $scope.patientDetails = [];
    $http
      .get(apiUrl + "/hospitalapp/panelname/", {
        withCredentials: true,
      })
      .then(function (response) {
        console.log(response);
        $scope.leftPanel = response.data;
      })
      .catch(function (error) {
        console.log(error);
        Swal.fire({
          icon: "error",
          text: error,
        });
      });
    $http.get(apiUrl + '/hospitalapp/doctorProfile/',{
      withCredentials: true
    })
    .then(function(response){
      console.log(response)
      $scope.doctorProfile = response.data
    })
    .catch(function(error){
      console.log(error)
    })
    $http.get(apiUrl + '/hospitalapp/approvedAppointment/',{
      withCredentials: true
  })
  .then(function(response){
    console.log(response)
    $scope.approvedAppointments = response.data
    if($scope.approvedAppointments.length == 0){
      $scope.pending =true;
    }
    else{
      $scope.appointment =true;
    }
  })
  .catch(function(error){
    console.log(error)
  })

  $scope.patient = function (url) {
    console.log(url);
    $location.path(url);
  };


}

]);


myApp.controller("patientController", [
  "$scope",
  "$http",
  "$location",
  function ($scope, $http, $location) {
    $scope.leftPanel =[];
    $scope.loader = true;
    $http
      .get(apiUrl + "/hospitalapp/panelname/", {
        withCredentials: true,
      })
      .then(function (response) {
        console.log(response.data);
        $scope.leftPanel = response.data;
        console.log($scope.leftPanel)
        $scope.loader = false;
      })
      .catch(function (error) {
        console.log(error);
        Swal.fire({
          icon: "error",
          text: error,
        });
      });


      $scope.exportTableToExcel = function (id, name) {
        exportToExcel(id, name);
      };

    $scope.patient = function (url) {
      console.log(url);
      $location.path(url);
    };
    $http
      .get(apiUrl + "/hospitalapp/allPatient/", {
        withCredentials: true,
      })
      .then(function (response) {
        console.log(response);
        $scope.patientDetails = response.data;
      })
      .catch(function (error) {
        console.log(error);
        Swal.fire({
          icon: "error",
          text: error,
        });
      });
    $scope.approve = function (id) {
      console.log(id);
    };
    $scope.logout = function () {
      $http
        .get(apiUrl + "/hospitalapp/logout/", {
          withCredentials: true,
        })
        .then(function (response) {
          console.log(response);
          logmess = response.data.message;
         
          Swal.fire("Great!", response.data.message, "success");
          $location.path("/login");
        })
        .catch(function (error) {
          console.log(error);
          Swal.fire({
            icon: "error",
            text: error,
          });
        });
    };
  },
]);


myApp.controller("docPatientController", [
  "$scope",
  "$http",
  "$location",
  function ($scope, $http, $location) {
    $http.get(apiUrl+'/hospitalapp/doctorPatient/',{
      withCredentials:true
    })
    .then(function(response){
      console.log(response)
      $scope.patientDetails = response.data
      if($scope.patientDetails){

      }
    })
    .catch(function(error){
      console.log(error)
    })
  }])
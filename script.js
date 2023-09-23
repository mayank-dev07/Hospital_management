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
      .state("prescription",{
        url: "/prescription",
        templateUrl: "/html/prescription.html",
        controller: "prescriptionController"
      })
    $urlRouterProvider.otherwise("/login");
  },
]);

const apiUrl = "https://10.21.84.248:8000";

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
                Swal.fire("Good job!", response.data.message, "success");
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
    $scope.speciality = [];

    $http
      .get(apiUrl + "/hospitalapp/register/")
      .then(function (response) {
        console.log(response.data);
        $scope.speciality = response.data;
        console.log($scope.speciality);
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
              if (response.data.message == "doctor register") {
                Swal.fire("Good job!", response.data.message, "success");
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

var message = null;
var logmess = null;

myApp.controller("loginController", [
  "$scope",
  "$http",
  "$location",
  function ($scope, $http, $location) {
    $scope.loading = true;
    $scope.login = function () {
      let login = {
        username: $scope.loginName,
        password: $scope.loginPassword,
      };
      console.log(login);
      if (login.username == null || login.password == null) {
        Swal.fire({
          icon: "error",
          text: "enter all details!",
        });
      } else {
        $http
          .post(apiUrl + "/hospitalapp/login_all/", login, {
            withCredentials: true,
          })
          .then(function (response) {
            $scope.loading = false;
            console.log(response.data);
            message = response.data;
            // if (response.data.is_staff == true) {
              $location.path("/dashboard");
            // } else if (response.data.superuser == true) {
              // $location.path("/dashboard");
            // } else if (response.data.message == "user logged in!!!") {
              // $location.path("/dashboard");
            // } else {
              // console.log("error");
              // Swal.fire({
                // icon: "error",
                // text: "There is an error!",
              // });
            // }
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

var patientId = null;

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
        if (message.is_staff == true) {
          $scope.leftPanel = $scope.leftPanel.filter(
            (item) => item.panel !== "Appointment Form"
          );
        }
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
          logmess = response.data.message
          // if (response.data.message == "user is not authenticated") {
          //   Swal.fire("Great!", response.data.message, "success");
            // $location.path('/login')
          // }
          //  if
            Swal.fire("Great!", response.data.message, "success");
            $location.path("/login");
          // }
        })
        .catch(function (error) {
          console.log(error);
          Swal.fire({
            icon: "error",
            text: error,
          });
        });
    };

    $scope.exportTableToExcel = function (id, name) {
      exportToExcel(id, name);
    };

    console.log(message.message);
    if (message.superuser == false && message.is_staff == false) {
      $http
        .get(apiUrl + "/hospitalapp/patientprofile/", {
          withCredentials: true,
        })
        .then(function (response) {
          console.log(response);
          $scope.details = response.data;
          patientId = response.data[0].patient__id;
          console.log(patientId);
        })
        .catch(function (error) {
          console.log(error);
          Swal.fire({
            icon: "error",
            text: error,
          });
        });
    }

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
      .get(apiUrl + "/hospitalapp/register/", {
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
        doc_id: $scope.doc.id,
        // doc: $scope.doc.speciality,
        time: $scope.appointmentTime,
        date: formatDate($scope.appDate),
        disease: $scope.appointmentDisease,
        allergy: $scope.allergy,
        symptoms: $scope.appointmentSymptoms,
        alcohol: $scope.alcohol,
      };
      // console.log(doc)
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
          logmess = response.data.message
          // if (response.data.message == "user is not authenticated") {
          //   Swal.fire("Great!", response.data.message, "success");
            // $location.path('/login')
          // }
          //  if
            Swal.fire("Great!", response.data.message, "success");
            $location.path("/login");
          // }
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
  function ($scope, $http, $location) {
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

    $scope.generatePdf = function (formId, filename) {
      const formElement = document.getElementById(formId);

      const blob = new Blob([formElement.outerHTML], { type: "text/html" });

      const downloadLink = document.createElement("a");
      downloadLink.href = URL.createObjectURL(blob);
      downloadLink.download = filename;
      downloadLink.click();
    };
    $scope.logout = function () {
      $http
        .get(apiUrl + "/hospitalapp/logout/", {
          withCredentials: true,
        })
        .then(function (response) {
          console.log(response);
          logmess = response.data.message
          // if (response.data.message == "user is not authenticated") {
          //   Swal.fire("Great!", response.data.message, "success");
            // $location.path('/login')
          // }
          //  if
            Swal.fire("Great!", response.data.message, "success");
            $location.path("/login");
          // }
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
    // console.log(message.is_staff)
    var id = patientId;
    console.log(id);

    $scope.loader = true;
    $http
      .get(apiUrl + "/hospitalapp/panelname/", {
        withCredentials: true,
      })
      .then(function (response) {
        console.log(response.data);
        $scope.leftPanel = response.data;
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

    // console.log(message)
    if (message.is_staff == false || message.superuser == false) {
      $scope.patientAppointment = true;
      $scope.allAppointments = false;
      $scope.doctorAppointments = false;
      $http
        .get(apiUrl + "/hospitalapp/patientAppointments/", {
          withCredentials: true,
          params: { id: id },
        })
        .then(function (response) {
          console.log(response.data);
          $scope.appointments = response.data;
          if ($scope.appointments.length == 0) {
            Swal.fire({
              title: "No appointments to show",
              confirmButtonText: "Ok",
            });
            $location.path("/dashboard");
          }
          $scope.loader = false;
          $scope.approve = function (id) {
            let data = {
              id: id,
            };

            console.log(data);
            $http
              .post(apiUrl + "/hospitalapp/recpstApptAccept/", data, {
                withCredentials: true,
              })
              .then(function (response) {
                console.log(response.data);
                Swal.fire("Good job!", response.data.message, "success");
                $http
                  .get(apiUrl + "/hospitalapp/appointment/", {
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
              console.log(data);
              $http
                .post(apiUrl + "/hospitalapp/recpstApptReject/", data, {
                  withCredentials: true,
                })
                .then(function (response) {
                  console.log(response);
                  Swal.fire("Good job!", response.data.message, "success");
                  $http
                    .get(apiUrl + "/hospitalapp/appointment/", {
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
    }
    if (message.is_staff == true) {
      $scope.patientAppointment = false;
      $scope.allAppointments = true;
      $scope.doctorAppointments = false;
      $http
        .get(apiUrl + "/hospitalapp/appointment/", {
          withCredentials: true,
        })
        .then(function (response) {
          console.log(response.data);
          $scope.appointments = response.data;
          if ($scope.appointments.length == 0) {
            Swal.fire({
              title: "No appointments to show",
              confirmButtonText: "Ok",
            });
            $location.path("/dashboard");
          }
          $scope.loader = false;
        })
        .catch(function (error) {
          console.log(error);
          Swal.fire({
            icon: "error",
            text: error,
          });
        });
    }
    if(message.superuser == true){
      $scope.patientAppointment = false;
      $scope.allAppointments = false;
      $scope.doctorAppointments = true;
    }
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
          logmess = response.data.message
          // if (response.data.message == "user is not authenticated") {
          //   Swal.fire("Great!", response.data.message, "success");
            // $location.path('/login')
          // }
          //  if
            Swal.fire("Great!", response.data.message, "success");
            $location.path("/login");
          // }
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

myApp.controller("patientController", [
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

    $scope.patient = function (url) {
      console.log(url);
      $location.path(url);
    };
    $http
      .get(apiUrl + "/", {
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
          logmess = response.data.message
          // if (response.data.message == "user is not authenticated") {
          //   Swal.fire("Great!", response.data.message, "success");
            // $location.path('/login')
          // }
          //  if
            Swal.fire("Great!", response.data.message, "success");
            $location.path("/login");
          // }
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
      .get(apiUrl + "/hospitalapp/appointment/", {
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

          console.log(data);
          $http
            .post(apiUrl + "/hospitalapp/recpstApptAccept/", data, {
              withCredentials: true,
            })
            .then(function (response) {
              console.log(response.data);
              Swal.fire("Good job!", response.data.message, "success");
              $http
                .get(apiUrl + "/hospitalapp/appointment/", {
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
            console.log(data);
            $http
              .post(apiUrl + "/hospitalapp/recpstApptReject/", data, {
                withCredentials: true,
              })
              .then(function (response) {
                console.log(response);
                Swal.fire("Good job!", response.data.message, "success");
                $http
                  .get(apiUrl + "/hospitalapp/appointment/", {
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
            logmess = response.data.message
            // if (response.data.message == "user is not authenticated") {
            //   Swal.fire("Great!", response.data.message, "success");
              // $location.path('/login')
            // }
            //  if
            // }
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
      .get(apiUrl + "/hospitalapp/receptionistdashboard", {
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

      $scope.patient = function(id){
        console.log(id)
       $http.get(apiUrl + '/hospitalapp/recpst_patientDetails/',{
        withCredentials: true,
        params: {doctor_id:id}
       })
       .then(function(response){
        console.log(reponse)
        $scope.patientDetails = response.data
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
          logmess = response.data.message
          // if (response.data.message == "user is not authenticated") {
          //   Swal.fire("Great!", response.data.message, "success");
            // $location.path('/login')
          // }
          //  if
            Swal.fire("Great!", response.data.message, "success");
            $location.path("/login");
          // }
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

myApp.controller('prescriptionController',['$scope','$http','$location',function($scope,$http,$location){
  $scope.add = function(){
   
  }
}])
//   $scope.showDetails =true;
//   $scope.details = [];
//   $scope.doctors = [];
//   $scope.select = [];
//   $http.get(apiUrl + '/hospitalapp/patientprofile/', {
//       withCredentials: true
//   })
//   .then(function(response) {
//       console.log(response.data);
//       $scope.details = response.data;
//   })
//   .catch(function(error) {
//       console.log(error);
//   });

//   $scope.showAppointment = false;

//   $scope.toggleAppointment = function() {
//       $scope.showAppointment = !$scope.showAppointment;
//       $scope.showDetails = !$scope.showDetails;
//       $scope.details = [];
//       $scope.doctors = [];
//       $http.get(apiUrl + '/hospitalapp/patientprofile/', {
//           withCredentials: true
//       })
//       .then(function(response) {
//           console.log(response.data);
//           $scope.details = response.data;
//       })
//       .catch(function(error) {
//           console.log(error);
//       });

//       $http.get(apiUrl + '/hospitalapp/patientdashboard/', {
//           withCredentials: true
//       })
//       .then(function(response){
//           console.log(response.data)
//           $scope.doctors = response.data;
//           // console.log($scope.doctors.id)
//       })
//       .catch(function(error){
//           console.log(error)
//       })

//   // }

//   };

//   $scope.Doctors = function() {
//       $http.get(apiUrl + '/hospitalapp/patientdashboard/', {
//           withCredentials: true
//       })
//       .then(function(response){
//           $scope.Modal = true;
//           $scope.doctors = response.data;
//           console.log($scope.doctors)
//           $scope.details = function (doctor) {
//               console.log("Doctor Details:", doctor);
//               $http.get(apiUrl + '/hospitalapp/patientdashboard/', {
//                   withCredentials: true
//               })
//               .then(function (response) {
//                   console.log(response.data)
//                   $scope.select = response.data;
//                   let show =null;
//                   for (var i = 0; i < $scope.select.length; i++) {
//                       if ($scope.select[i].id === doctor) {
//                         show = $scope.select[i];
//                         break;
//                       }
//                   }
//                   if (show) {
//                       $scope.select = show;
//                       $scope.detailsModal = true;
//                       console.log(show)
//                     }
//               })
//               .catch(function (error) {
//                   console.log(error);
//               });

//               $scope.closeDetailsModal = function (){
//                   $scope.detailsModal = false;
//               }

//               // $scope.appdoctor = function(doctor){
// }
//           }
//       })
//       .catch(function(error){
//           console.log(error)
//       })

//   }

//   $scope.closeModal = function() {
//       $scope.Modal = false;
//       $http.get(apiUrl + '/hospitalapp/patientprofile/', {
//           withCredentials: true
//       })
//       .then(function(response) {
//           console.log(response.data);
//           $scope.details = response.data;
//       })
//       .catch(function(error) {
//           console.log(error);
//       });
//   }

// myApp.controller('recController' ,['$scope','$http',function($scope,$http){
//     $scope.doctorDetails = [];
//     $scope.patientList =[];
//     $scope.patients = [];
//     $scope.appointments = [];

//     $http.get(apiUrl + '/hospitalapp/receptionistdashboard',{
//         withCredentials:true
//     })
//     .then(function(response){
//         console.log(response.data)
//         $scope.doctorDetails = response.data

//     })
//     .catch(function(error){
//         console.log(error)
//     })

//     $scope.appointment = function(){
//         $http.get(apiUrl + '/hospitalapp/appointment/',{
//             withCredentials: true
//         })
//         .then(function(response){
//             console.log(response.data)
//             $scope.appointments = response.data
//             $scope.detailsModal = true;
//             $scope.popoverVisible = false;
//     $scope.popoverContent = 'This is the popover content. You can add dynamic data here.';

//     $scope.togglePopover = function () {
//       $scope.popoverVisible = true
//       Swal.fire({
//         html: '<div ng-if="popoverVisible" class="popover">' +
//                 '<div class="popover-title">Popover title</div>' +
//                 '<div class="popover-content">{{ popoverContent }}</div>' +
//               '</div>',
//         showDenyButton: true,
//         confirmButtonText: 'Accept',
//         denyButtonText: 'Reject',
//         allowOutsideClick: false,
//         onOpen: () => {
//           angular.bootstrap(document.querySelector('.popover'), ['YourAppName']);
//         }
//       }).then((result) => {
//         if (result.isConfirmed) {
//           Swal.fire('Accepted!', '', 'success');
//         } else if (result.isDenied) {
//           Swal.fire('Rejected', '', 'info');
//         }
//       });
//     };
//             $scope.app = function(id){
//                 console.log(id)
//                 $http.get(apiUrl + '/hospitalapp/appointmentdetails/',{
//                     withCredentials: true,
//                     params:{id : id}
//                 })
//                 .then(function(response){
//                     console.log(response)
//                 })
//                 .catch(function(error){
//                     console.log(error)
//                 })
//                 $scope.popoverVisible = true
//                 Swal.fire({
//                   html: '<div ng-if="popoverVisible" class="popover">' +
//                           '<div class="popover-title">Popover title</div>' +
//                           '<div class="popover-content">{{ popoverContent }}</div>' +
//                         '</div>',
//                   showDenyButton: true,
//                   confirmButtonText: 'Accept',
//                   denyButtonText: 'Reject',
//                   allowOutsideClick: false,
//                   onOpen: () => {
//                     angular.bootstrap(document.querySelector('.popover'), ['YourAppName']);
//                   }
//                 }).then((result) => {
//                   if (result.isConfirmed) {
//                     Swal.fire('Accepted!', '', 'success');
//                   } else if (result.isDenied) {
//                     Swal.fire('Rejected', '', 'info');
//                   }
//                 });
//             }
//             $scope.view = function(){
//             }

//         })
//         .catch(function(error){
//             console.log(error)
//         })

//         $scope.closeDetailsModal = function(){
//             $scope.detailsModal = false;
//         }
//     }

//     $scope.view = function(id){
//         console.log(id);
//         $http.get(apiUrl +'/hospitalapp/recpst_patientDetails/',{
//             withCredentials:true,
//             params:{doctor_id : id}
//         })
//         .then(function(response){
//             console.log(response.data)
//             $scope.patientList = response.data
//             $scope.Modal = true;
//             $scope.show = function(id){
//                 console.log(id)
//                 $http.get(apiUrl + '/hospitalapp/showAppointment/' ,{
//                     withCredentials: true,
//                     params:{patient_id :id}
//                 })
//                 .then(function(response){
//                     console.log(response)
//                 })
//                 .catch(function(error){
//                     console.log(error)
//                 })
//             }
//         })
//         .catch(function(error){
//             console.log(error)
//         })
//         $scope.closeModal = function(){
//             $scope.Modal = false
//         }
//     }

//     $scope.Patient = function(){
//         $http.get(apiUrl + '/hospitalapp/allPatient/',{
//             withCredentials: true
//         })
//         .then(function(response){
//             console.log(response.data)
//             $scope.patients = response.data
//             $scope.patientDetailsModal = true
//         })
//         .catch(function(error){
//             console.log(error)
//         })
//         $scope.closepatientDetailsModal = function(){
//             $scope.patientDetailsModal = false
//         }
//     }
// }])

// $http
//   .get(apiUrl + "/hospitalapp/register/", {
//     withCredentials: true,
//   })
//   .then(function (response) {
//     console.log(response.data);
//     $scope.doctors = response.data;
//   })
//   .catch(function (error) {
//     console.log(error);
//     Swal.fire({
//       icon: "error",
//       text: error,
//     });
//   });

// if (id == 3) {
//   $scope.showcarousel = false;
//   $scope.showAppointmentDetails = true;
//   $scope.showDoctorDetails = false;
//   $scope.showAppointment = false;
//   $scope.showDetails = false;

//   $http
//     .get(apiUrl + "/hospitalapp/appointmentdetails/", {
//       withCredentials: true,
//     })
//     .then(function (response) {
//       console.log(response.data);
//       $scope.appointments = response.data;
//     })
//     // }).then((result) => {
//     //   if (result.isConfirmed) {
//     //     Swal.fire('Accepted!', '', 'success');
//     //   } else if (result.isDenied) {
//     //     Swal.fire('Rejected', '', 'info');
//     //   }
//     .catch(function (error) {
//       console.log(error);
//       Swal.fire({
//         icon: "error",
//         text: error,
//       });
//     });
// }

// $scope.receptionist = function (id) {
//   console.log(id);
//   if (id == 1) {
//     $scope.showcarousel = true;
//     $scope.showDetails = false;
//     $scope.showAppointment = false;
//     $scope.showAppointmentDetails = false;
//     $scope.showDoctorDetails = false;
//   }

//   if (id == 2) {
//     $scope.showcarousel = false;
//     $scope.showDetails = false;
//     $scope.showAppointment = false;
//     $scope.showAppointmentDetails = false;
//     $scope.showDoctorDetails = true;

//     $http
//       .get(apiUrl + "/hospitalapp/patientdashboard/", {
//         withCredentials: true,
//       })
//       .then(function (response) {
//         console.log(response.data);
//         $scope.doctorDetails = response.data;
//         // console.log($scope.doctors.id)
//       })
//       .catch(function (error) {
//         console.log(error);
//         Swal.fire({
//           icon: "error",
//           text: error,
//         });
//       });
//   }

//   if (id == 3) {
//     $scope.showAppointments = true;
//     $scope.showcarousel = false;
//     $scope.showDetails = false;
//     $scope.showAppointment = false;
//     $scope.showAppointmentDetails = false;
//     $scope.showDoctorDetails = false;

//     $http
//       .get(apiUrl + "/hospitalapp/appointment/", {
//         withCredentials: true,
//       })
//       .then(function (response) {
//         $scope.appointments = response.data;
//         console.log($scope.appointments);
//         if ($scope.appointments.length == 0) {
//           $scope.showAppointments = false;
//           $scope.showcarousel = true;
//           $scope.showDetails = false;
//           $scope.showAppointment = false;
//           $scope.showAppointmentDetails = false;
//           $scope.showDoctorDetails = false;
//           Swal.fire({
//             title: "No appointments to show",
//             confirmButtonText: "Ok",
//           });
//         }

//         $scope.approve = function (id) {
//           let data = {
//             id: id,
//           };
//           console.log(data);
//           $http
//             .post(apiUrl + "/hospitalapp/recpstApptAccept/", data, {
//               withCredentials: true,
//             })
//             .then(function (response) {
//               console.log(response.data);
//               Swal.fire("Good job!", response.data.message, "success");
//               $http
//                 .get(apiUrl + "/hospitalapp/appointment/", {
//                   withCredentials: true,
//                 })
//                 .then(function (response) {
//                   $scope.appointments = response.data;
//                   console.log($scope.appointments);
//                 })
//                 .catch(function (error) {
//                   console.log(error);
//                   Swal.fire({
//                     icon: "error",
//                     text: error,
//                   });
//                 });
//             })
//             .catch(function (error) {
//               console.log(error);
//               Swal.fire({
//                 icon: "error",
//                 text: error,
//               });
//             });
//         };

//         $scope.reject = function (id) {
//           console.log(id);
//           Swal.fire({
//             title: "Reason to reject appointment",
//             html: `<input type="text" id="reason" class="swal2-input" placeholder="Reason">`,
//             confirmButtonText: "Send",
//             showCancelButton: true,
//             focusConfirm: false,
//             preConfirm: () => {
//               const reason = Swal.getPopup().querySelector("#reason").value;
//               if (!reason) {
//                 Swal.showValidationMessage(`Please enter reason`);
//               }
//               return { reason: reason };
//             },
//           }).then((result) => {
//             console.log(result);
//             let reason = result.value.reason;
//             let data = {
//               reason: reason,
//               id: id,
//             };
//             console.log(data);
//             $http
//               .post(apiUrl + "/hospitalapp/recpstApptReject/", data, {
//                 withCredentials: true,
//               })
//               .then(function (response) {
//                 console.log(response);
//                 Swal.fire("Good job!", response.data.message, "success");
//                 $http
//                   .get(apiUrl + "/hospitalapp/appointment/", {
//                     withCredentials: true,
//                   })
//                   .then(function (response) {
//                     $scope.appointments = response.data;
//                     console.log($scope.appointments);
//                   })
//                   .catch(function (error) {
//                     console.log(error);
//                     Swal.fire({
//                       icon: "error",
//                       text: error,
//                     });
//                   });
//               })
//               .catch(function (error) {
//                 console.log(error);
//               });
//           });
//         };
//       })
//       .catch(function (error) {
//         console.log(error);
//         Swal.fire({
//           icon: "error",
//           text: error,
//         });
//       });
//   }

//   if (id == 5) {
//     $scope.showPatientDetails = true;
//     $scope.showAppointments = false;
//     $scope.showcarousel = false;
//     $scope.showDetails = false;
//     $scope.showAppointment = false;
//     $scope.showAppointmentDetails = false;
//     $scope.showDoctorDetails = false;

//     $http
//       .get(apiUrl + "/hospitalapp/allPatient/", {
//         withCredentials: true,
//       })
//       .then(function (response) {
//         console.log(response);
//         $scope.doctorDetails = response.data;
//       })
//       .catch(function (error) {
//         console.log(error);
//       });
//   }
// };

// $scope.submitRejection = function (reject) {
//   console.log(reject);
//   let data = {
//     reason: $scope.reason,
//     reject: reject,
//   };

//   console.log(data);
//   $http
//     .post(apiUrl + "/hospitalapp/", {
//       withCredentials: true,
//     })
//     .then(function (response) {
//       console.log(response);
//     })
//     .catch(function (error) {
//       console.log(error);
//       Swal.fire({
//             icon: "error",
//             text: error,
//           });
//     });
// };

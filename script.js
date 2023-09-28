var myApp = angular.module("myModule", ["ui.router"]);

myApp.config([
  "$stateProvider",
  "$urlRouterProvider",
  function ($stateProvider, $urlRouterProvider) {
    $stateProvider
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
      .state("dashboard", {
        url: "/dashboard",
        templateUrl: "/html/dashboard.html",
        controller: "dashboardController",
      })
      .state("dashboard.profile", {
        url: "/main",
        templateUrl: "/html/main.html",
        controller: "mainController",
      })
      .state("dashboard.appointment", {
        url: "/appointment",
        templateUrl: "/html/appointment.html",
        controller: "appointmentController",
      })
      .state("dashboard.showappointment", {
        url: "/showappointment",
        templateUrl: "/html/showappointment.html",
        controller: "showAppointmentsController",
      })
      .state("dashboard.doctors", {
        url: "/doctors",
        templateUrl: "/html/doctors.html",
        controller: "doctorController",
      })
      .state("dashboard.recAppointment", {
        url: "/recAppointment",
        templateUrl: "/html/recAppointment.html",
        controller: "recAppointmentController",
      })
      .state("dashboard.docprofile", {
        url: "/docprofile",
        templateUrl: "/html/docprofile.html",
        controller: "docprofileController",
      })
      .state("dashboard.patient", {
        url: "/patient",
        templateUrl: "/html/patient.html",
        controller: "patientController",
      })
      .state("dashboard.docPatient", {
        url: "/docPatient",
        templateUrl: "/html/docPatient.html",
        controller: "docPatientController",
      })
      .state("dashboard.prescription", {
        url: "/prescription",
        templateUrl: "/html/prescription.html",
        controller: "prescriptionController",
      })
      .state("dashboard.patientDoc", {
        url: "/patientDoc",
        templateUrl: "/html/patientDoc.html",
        controller: "patientDocController",
      })
      .state("dashboard.allDoctorappt", {
        url: "/allDoctorappt",
        templateUrl: "/html/allDoctorappt.html",
        controller: "allDoctorapptController",
      });

    $urlRouterProvider.otherwise("/login");
  },
]);

const apiUrl =
  "https://e683-2401-4900-c12-2ce6-2cbd-8981-dc7f-f58b.ngrok-free.app/";

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

  function ($scope, $http, $location) {
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
      if (login.password == null) {
        Swal.fire({
          icon: "error",
          title: "Enter valid password!",
          text: "Password Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters",
        });
      } else {
        $http
          .post(apiUrl + "/hospitalapp/login_all/", login, {
            withCredentials: true,
          })
          .then(function (response) {
            $scope.loading = false;
            console.log(response.data);
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

    $scope.patientDoctor = true;
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

    $scope.exportTableToExcel = function (id, name) {
      exportToExcel(id, name);
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
        patientId = $scope.details[0].patient__id;
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

    $scope.view = function (id) {
      console.log(id);
      $http
        .get(apiUrl + "/hospitalapp/appointmentStatus/", {
          withCredentials: true,
          params: { id: id },
        })
        .then(function (response) {
          console.log(response);
          Swal.fire({
            title: " Your Appointment is " + response.data.message,
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    };
  },
]);

myApp.controller("patientDocController", [
  "$scope",
  "$http",
  "$location",
  function ($scope, $http, $location) {
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
  },
]);

myApp.controller("recAppointmentController", [
  "$scope",
  "$http",
  "$location",
  function ($scope, $http, $location) {
    $scope.loader = true;
    $scope.appointment = true;

    $http
      .get(apiUrl + "/hospitalapp/appointments/", {
        withCredentials: true,
      })
      .then(function (response) {
        $scope.appointments = response.data;
        console.log($scope.appointments);
        $scope.loader = false;
        if ($scope.appointments.length == 0) {
          Swal.fire({
            title: "No appointments to show",
            confirmButtonText: "Ok",
          });
          $location.path("/dashboard");
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
                    if ($scope.appointments.length == 0) {
                      Swal.fire({
                        title: "No appointments to show",
                        confirmButtonText: "Ok",
                      });
                      $location.path("/dashboard");
                    }
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
  },
]);

myApp.controller("doctorController", [
  "$scope",
  "$http",
  "$location",
  function ($scope, $http, $location) {
    $scope.loader = true;
    $scope.patientDetails = [];

    $http
      .get(apiUrl + "/hospitalapp/patientdashboard/", {
        withCredentials: true,
      })
      .then(function (response) {
        console.log(response);
        $scope.loader = false;
        $scope.doctorDetails = response.data;
      })
      .catch(function (error) {
        console.log(error);
      });

    $scope.exportTableToExcel = function (id, name) {
      exportToExcel(id, name);
    };

    $scope.view = function (id) {
      console.log(id);
      $http
        .get(apiUrl + "/hospitalapp/recpst_patientDetails/", {
          withCredentials: true,
          params: { doctor_id: id },
        })
        .then(function (response) {
          console.log(response);
          $scope.patientDetails = response.data;
          if ($scope.patientDetails.length == 0) {
            $scope.patients = [{ id: "No patient" }];
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    };
  },
]);

myApp.controller("docprofileController", [
  "$scope",
  "$http",
  "$location",
  function ($scope, $http, $location) {
    $scope.loader = true;
    $scope.patientDetails = [];
    $http
      .get(apiUrl + "/hospitalapp/doctorProfile/", {
        withCredentials: true,
      })
      .then(function (response) {
        console.log(response);
        $scope.doctorProfile = response.data;
        let id = $scope.doctorProfile[0].doctor__id;
        console.log(id);
        $http
          .get(apiUrl + "/hospitalapp/pendingAppointment/", {
            withCredentials: true,
            params: { id: id },
          })
          .then(function (response) {
            console.log(response);
            $scope.appointments = response.data;
            if ($scope.appointments.length == 0) {
              $scope.pending = true;
            } else {
              $scope.appointment = true;
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      })
      .catch(function (error) {
        console.log(error);
      });
    $scope.view = function (id) {
      console.log(id);
      let data = {
        id: id,
      };
      Swal.fire({
        title: "Appointment status",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Approve",
        denyButtonText: `Reject`,
        cancelButtonText: `Update`,
      }).then((result) => {
        console.log(result);
        if (result.isConfirmed) {
          $scope.loader = true;
          $http
            .post(apiUrl + "/hospitalapp/doctorApptApprove/", data, {
              withCredentials: true,
            })
            .then(function (response) {
              console.log(response.data);
              Swal.fire(response.data.message);
              $http
                .get(apiUrl + "/hospitalapp/doctorProfile/", {
                  withCredentials: true,
                })
                .then(function (response) {
                  $scope.loader = true;
                  console.log(response);
                  $scope.doctorProfile = response.data;
                  let id = $scope.doctorProfile[0].doctor__id;
                  console.log(id);
                  $http
                    .get(apiUrl + "/hospitalapp/pendingAppointment/", {
                      withCredentials: true,
                      params: { id: id },
                    })
                    .then(function (response) {
                      console.log(response);
                      $scope.appointments = response.data;
                      $scope.loader = false;
                      if ($scope.appointments.length == 0) {
                        $scope.pending = true;
                        $scope.appointment = false;
                      } else {
                        $scope.appointment = true;
                      }
                    })
                    .catch(function (error) {
                      console.log(error);
                    });
                })
                .catch(function (error) {
                  console.log(error);
                });
            })
            .catch(function (error) {
              console.log(error);
            });
        } else if (result.isDenied) {
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

            console.log(data);
            $http
              .post(apiUrl + "/hospitalapp/doctorApptReject/", data, {
                withCredentials: true,
              })
              .then(function (response) {
                console.log(response);
                Swal.fire("Good job!", response.data.message, "success");
                $http
                  .get(apiUrl + "/hospitalapp/doctorProfile/", {
                    withCredentials: true,
                  })
                  .then(function (response) {
                    console.log(response);
                    $scope.doctorProfile = response.data;
                    let id = $scope.doctorProfile[0].doctor__id;
                    console.log(id);
                    $http
                      .get(apiUrl + "/hospitalapp/pendingAppointment/", {
                        withCredentials: true,
                        params: { id: id },
                      })
                      .then(function (response) {
                        console.log(response);
                        $scope.appointments = response.data;
                        $scope.loader = false;

                        if ($scope.appointments.length == 0) {
                          $scope.pending = true;
                          $scope.appointment = false;
                        } else {
                          $scope.appointment = true;
                        }
                      })
                      .catch(function (error) {
                        console.log(error);
                      });
                  })
                  .catch(function (error) {
                    console.log(error);
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
        } else if (result.dismiss == "cancel") {
          Swal.fire({
            title: "Login Form",
            html: `<input type="date" id="date" class="swal2-input" placeholder="Username">
            <input type="time" id="time" class="swal2-input" placeholder="time">`,
            confirmButtonText: "Update",
            focusConfirm: false,
            preConfirm: () => {
              const date = Swal.getPopup().querySelector("#date").value;
              const time = Swal.getPopup().querySelector("#time").value;
              if (!date || !time) {
                Swal.showValidationMessage(`Please enter Date and Time`);
              }
              return { date: date, time: time };
            },
          }).then((result) => {
            let date = result.value.date;
            let time = result.value.time;
            let data = {
              date: date,
              time: time,
              id: id,
            };
            $scope.loader = true;

            $http
              .post(apiUrl + "/hospitalapp/updateApptDoctor/", data, {
                withCredentials: true,
              })
              .then(function (response) {
                console.log(response);
                $http
                  .get(apiUrl + "/hospitalapp/doctorProfile/", {
                    withCredentials: true,
                  })
                  .then(function (response) {
                    console.log(response);
                    $scope.doctorProfile = response.data;
                    let id = $scope.doctorProfile[0].doctor__id;
                    console.log(id);
                    $http
                      .get(apiUrl + "/hospitalapp/pendingAppointment/", {
                        withCredentials: true,
                        params: { id: id },
                      })
                      .then(function (response) {
                        console.log(response);
                        $scope.appointments = response.data;
                        $scope.loader = false;

                        if ($scope.appointments.length == 0) {
                          $scope.pending = true;
                        } else {
                          $scope.appointment = true;
                        }
                      })
                      .catch(function (error) {
                        console.log(error);
                      });
                  })
                  .catch(function (error) {
                    console.log(error);
                  });
              })
              .catch(function (error) {
                console.log(error);
              });
          });
        }
      });
    };

    $scope.exportTableToExcel = function (id, name) {
      exportToExcel(id, name);
    };
  },
]);

myApp.controller("patientController", [
  "$scope",
  "$http",
  "$location",
  function ($scope, $http, $location) {
    $scope.leftPanel = [];
    $scope.loader = true;

    $scope.exportTableToExcel = function (id, name) {
      exportToExcel(id, name);
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
  },
]);

myApp.controller("docPatientController", [
  "$scope",
  "$http",
  "$location",
  function ($scope, $http, $location) {
    $http
      .get(apiUrl + "/hospitalapp/identifyDoctor/", {
        withCredentials: true,
      })
      .then(function (response) {
        console.log(response.data);
        let id = response.data[0].id;
        console.log(id);
        $http
          .get(apiUrl + "/hospitalapp/doctorPatient/", {
            withCredentials: true,
            params: { id: id },
          })
          .then(function (response) {
            console.log(response.data);
            $scope.patientDetails = response.data;
            if ($scope.patientDetails.length == 0) {
              $location.path("/dashboard");
              Swal.fire({
                icon: "error",
                text: "No Patient to show",
              });
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      })
      .catch(function (error) {
        console.log(error);
      });

    $scope.exportTableToExcel = function (id, name) {
      exportToExcel(id, name);
    };
    $scope.view = function (id) {
      console.log(id);
    };
  },
]);

myApp.controller("allDoctorapptController", [
  "$scope",
  "$http",
  "$location",
  "sharedDataService",
  "$window",
  function ($scope, $http, $location, sharedDataService, $window) {
    $http
      .get(apiUrl + "/hospitalapp/identifyDoctor/", {
        withCredentials: true,
      })
      .then(function (response) {
        console.log(response.data);
        let id = response.data[0].id;
        console.log(id);
        $http
          .get(apiUrl + "/hospitalapp/doctorAppointment/", {
            withCredentials: true,
            params: { id: id },
          })
          .then(function (response) {
            console.log(response);
            $scope.appointments = response.data;
            if ($scope.appointments.length == 0) {
              $location.path("/dashboard");

              Swal.fire({
                icon: "error",
                text: "No Appointment to show",
              });
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      })
      .catch(function (error) {
        console.log(error);
      });

    $scope.exportTableToExcel = function (id, name) {
      exportToExcel(id, name);
    };

    $scope.view = function (id) {
      console.log(id);
      sharedDataService.setId(id);
      $http
        .get(apiUrl + "/hospitalapp/prescriptionDetails/", {
          withCredentials: true,
          params: { id: id },
        })
        .then(function (response) {
          console.log(response.data);
          $scope.prescription = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    };

    $scope.$on("prescriptionSubmitted", function () {
      $http
        .get(apiUrl + "/hospitalapp/identifyDoctor/", {
          withCredentials: true,
        })
        .then(function (response) {
          console.log(response.data);
          let id = response.data[0].id;
          console.log(id);
          $http
            .get(apiUrl + "/hospitalapp/doctorAppointment/", {
              withCredentials: true,
              params: { id: id },
            })
            .then(function (response) {
              console.log(response);
              $scope.appointments = response.data;
              if ($scope.appointments.length == 0) {
                $location.path("/dashboard");

                Swal.fire({
                  icon: "error",
                  text: "No Appointment to show",
                });
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        })
        .catch(function (error) {
          console.log(error);
        });
    });

    $scope.download = function (id) {
      console.log(id);
      $http
        .get(apiUrl + "/hospitalapp/generate_pdf_response/", {
          withCredentials: true,
          params: { id: id },
          responseType: "arraybuffer",
        })
        .then(function (response) {
          console.log(response);
          var blob = new Blob([response.data], { type: "application/pdf" });
          var objectUrl = URL.createObjectURL(blob);
          $window.open(objectUrl);
        });
    };
  },
]);

myApp.service("sharedDataService", function () {
  var id = null;
  return {
    getId: function () {
      return id;
    },
    setId: function (newId) {
      id = newId;
    },
  };
});

myApp.controller("prescriptionController", [
  "$scope",
  "$http",
  "$location",
  "sharedDataService",
  "$rootScope",
  function ($scope, $http, $location, sharedDataService, $rootScope) {
    $scope.prescriptions = [];
    var id = sharedDataService.getId();
    console.log(id);
    $scope.add = function () {
      if (
        $scope.medicine.trim() !== "" &&
        $scope.dosage.trim() !== "" &&
        $scope.Purpose.trim() !== ""
      ) {
        $scope.prescriptions.push({
          medicine: $scope.medicine,
          dosage: $scope.dosage,
          Purpose: $scope.Purpose,
        });
        console.log($scope.prescriptions);
        $scope.medicine = "";
        $scope.dosage = "";
        $scope.Purpose = "";
      } else {
        Swal.fire({
          icon: "error",
          text: "No Data to enter",
        });
      }
    };
    $scope.del = function (index) {
      $scope.prescriptions.splice(index, 1);
    };
    $scope.confirm = function () {
      $location.path("/dashboard/allDoctorappt");
      console.log($scope.prescriptions);
      if ($scope.prescriptions.length > 0) {
        let data = {
          id: id,
          arrayy: $scope.prescriptions,
        };
        $http
          .post(apiUrl + "/hospitalapp/PrescriptionForm/", data, {
            withCredentials: true,
          })
          .then(function (response) {
            console.log(response);
            $rootScope.$broadcast("prescriptionSubmitted");
            Swal.fire({
              icon: "success",
              title: response.data.message,
            });
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        Swal.fire({
          icon: "error",
          text: "Cant submit empty prescription",
        });
      }
      $scope.prescriptions = [];
    };
  },
]);

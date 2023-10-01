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
      .state("dashboard.pendingappointment", {
        url: "/pendingappointment",
        templateUrl: "/html/pendingappointment.html",
        controller: "pendingappointmentController",
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
      .state("dashboard.prescriptionDetails", {
        url: "/prescriptionDetails",
        templateUrl: "/html/prescriptionDetails.html",
        controller: "prescriptionDetailsController",
      })
      .state("dashboard.patientDoc", {
        url: "/patientDoc",
        templateUrl: "/html/patientDoc.html",
        controller: "patientDocController",
      })
      .state("dashboard.patientPrescription", {
        url: "/patientPrescription",
        templateUrl: "/html/patientPrescription.html",
        controller: "patientPrescriptionController",
      })
      .state("dashboard.patientPrecDetails", {
        url: "/patientPrecDetails",
        templateUrl: "/html/patientPrecDetails.html",
        controller: "patientPrecDetailsController",
      })
      .state("dashboard.Medicalhistory", {
        url: "/Medicalhistory",
        templateUrl: "/html/Medicalhistory.html",
        controller: "MedicalhistoryController",
      })
      .state("dashboard.allDoctorappt", {
        url: "/allDoctorappt",
        templateUrl: "/html/allDoctorappt.html",
        controller: "allDoctorapptController",
      });

    $urlRouterProvider.otherwise("/login");
  },
]);

const apiUrl = "https://10.21.80.207:8000";


myApp.controller("pendingappointmentController", [
  "$scope",
  "$http",
  "$location",
  function ($scope, $http, $location) {
     
    $scope.patientDetails = [];
    $http
      .get(apiUrl + "/hospitalapp/doctorProfile/", {
        withCredentials: true,
      })
      .then(function (response) {
        console.log(response);
        $scope.doctorProfile = response.data;
        $scope.data = true;
       
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
            console.log(error.data);
          });
      })
      .catch(function (error) {
        console.log(error.data);
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
                        $scope.appointment = false;
                      } else {
                        $scope.appointment = true;
                      }
                    })
                    .catch(function (error) {
                      console.log(error.data);
                    });
                })
                .catch(function (error) {
                  console.log(error.data);
                });
            })
            .catch(function (error) {
              console.log(error.data);
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
                return false;
              }
              return { reason: reason };
            },
          }).then((result) => {
            if (result.isConfirmed) {
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
                  Swal.fire(response.data.message);
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
                            $scope.appointment = false;
                          } else {
                            $scope.appointment = true;
                          }
                        })
                        .catch(function (error) {
                          console.log(error.data);
                        });
                    })
                    .catch(function (error) {
                      console.log(error.data);
                    });
                })
                .catch(function (error) {
                  console.log(error.data);
                  Swal.fire({
                    icon: "error",
                    text: error.data.message,
                  });
                });
            }
          });
        } else if (result.dismiss == "cancel") {
          const doctor = $scope.appointments.find(
            (appointment) => appointment.id === id
          );
          console.log(doctor);
          if (doctor) {
            let date = doctor.date;
            let time = doctor.time;
            Swal.fire({
              title: "Update Appointment",
              html: `<div style="display: flex-column; justify-content: space-between;">
              <input type="date" id="date" class="swal2-input" placeholder="Date" style="flex: 1;" value="${date}">
              <input type="time" id="time" class="swal2-input" placeholder="Time" style="flex: 1;" value="${time}">
            </div>`,
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
              if (result.isConfirmed) {
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
                    Swal.fire(response.data.message);
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
                            Swal.fire(response.data.message);
                            if ($scope.appointments.length == 0) {
                              $scope.pending = true;
                            } else {
                              $scope.appointment = true;
                            }
                          })
                          .catch(function (error) {
                            console.log(error.data);
                          });
                      })
                      .catch(function (error) {
                        console.log(error.data);
                      });
                  })
                  .catch(function (error) {
                    console.log(error.data);
                  });
              }
            });
          }
        }
      });
    };

    $scope.exportTableToExcel = function (id, name) {
      exportToExcel(id, name);
    };
  }])

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
          text: "Enter all Details Correct!",
        });
      } else if (isNaN(data.Age)) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Age should be number!",
        });
      } else if (data.firstName == null || data.lastName == null) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Name should contain alphabet only",
        });
      } else if (data.username == null) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Username should contain alphabet only",
        });
      } else if (data.Phone == null || data.Phone == "") {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Number should be max of 10 chars & First digit is not zero",
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
            .post(
              apiUrl + "/hospitalapp/registerpatient/",
              { username: undefined },
              {
                withCredentials: true,
              }
            )
            .then(function (response) {
              console.log(response);
              if (response.data.message == "patient registered!!!") {
                $location.path("/login");
                Swal.fire("Registered!", response.data.message, "success");
              }
            })
            .catch(function (error) {
              console.log(error.data);
              Swal.fire({
                icon: "error",
                text: error.data.message,
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
        console.log(error.data);
        Swal.fire({
          icon: "error",
          text: error.data.message,
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
        data.firstName == "" ||
        data.lastName == null ||
        data.lastName == "" ||
        data.Address == null ||
        data.Address == "" ||
        data.userName == null ||
        data.userName == "" ||
        data.Qualification == null ||
        data.Qualification == "" ||
        data.Speciality == null ||
        data.Speciality == ""
      ) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Enter all Details!",
        });
      } else if (isNaN(data.Phone)) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Phone should be number!",
        });
      } else if (isNaN(data.Fees)) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Fees should be number!",
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
              console.log(error.data);
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
    $http
      .get(apiUrl + "/hospitalapp/checkuser/", {
        withCredentials: true,
      })
      .then(function (response) {
        console.log(response.status);
        if (response.status == 200) {
          $location.path("/dashboard");
        }
      })
      .catch(function (error) {
        console.log(error);
      });

    $scope.login = function () {
      let login = {
        username: $scope.loginName,
        password: $scope.loginPassword,
      };
      console.log(login.username);
      if (
        login.username == null ||
        login.username == "" ||
        login.password == ""
      ) {
        Swal.fire({
          icon: "error",
          text: "Enter all details!",
        });
      } else if (login.username != null && login.password == null) {
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
            console.log(response.data);
            $location.path("/dashboard");
          })
          .catch(function (error) {
            console.log(error.data);
            Swal.fire({
              icon: "error",
              text: error.data.message,
            });
          });
      }
    };
  },
]);

function exportToExcel(tableId, fileName) {
  let table = document.getElementById(tableId).cloneNode(true);
  let remove = table.getElementsByClassName("btn");
  for (let i = remove.length - 1; i >= 0; i--) {
    remove[i].parentNode.removeChild(remove[i]);
  }
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

myApp.controller("dashboardController", [
  "$http",
  "$scope",
  "$location",
  function ($http, $scope, $location) {
    $http.get(apiUrl +'/hospitalapp/checkuser/',{
      withCredentials:true
    })
    .then(function(response){
      console.log(response)
    })
    .catch(function(error){
      $location.path('/login')
      console.log(error)
    })
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
          text: error.data.message,
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
          Swal.fire("logged out!");
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
    $scope.data = false;
    $http
      .get(apiUrl + "/hospitalapp/register/", {
        withCredentials: true,
      })
      .then(function (response) {
        console.log(response.data);
        $scope.doctors = response.data;
        $scope.loader = false;
        $scope.data = true;
      })
      .catch(function (error) {
        console.log(error.data);
        Swal.fire({
          icon: "error",
          text: error.data.message,
        });
      });

    $scope.department = function (id) {
      console.log(id);
      $http
        .get(apiUrl + "/hospitalapp/dependentDropdown/", {
          withCredentials: true,
          params: { id: id },
        })
        .then(function (response) {
          console.log(response);
          $scope.select = response.data;
        })
        .catch(function (error) {
          console.log(error.data);
          Swal.fire({
            icon: "error",
            text: error.data.message,
          });
        });
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
        console.log(error.data);
        Swal.fire({
          icon: "error",
          text: error.data.message,
        });
      });

    $scope.getCurrentDate = function () {
      var currentDate = new Date();
      var year = currentDate.getFullYear();
      var month = String(currentDate.getMonth() + 1).padStart(2, "0");
      var day = String(currentDate.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    $scope.confirm = function () {
      console.log("appointment");
      let data = {
        doc_id: $scope.doct,
        time: $scope.appointmentTime,
        date: formatDate($scope.appDate),
        disease: $scope.appointmentDisease,
        allergy: $scope.allergy,
        symptoms: $scope.appointmentSymptoms,
        alcohol: $scope.alcohol,
      };
      console.log(data);
      function formatDate(date) {
        var date = new Date(date);
        var year = date.getFullYear();
        var month = String(date.getMonth() + 1).padStart(2, "0");
        var day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
      }

      console.log(data);
      if (
        data.doc_id == null ||
        data.doc_id == "" ||
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
              Swal.fire("You booked an appointment... waiting for approval!");
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
            console.log(error.data);
            Swal.fire({
              icon: "error",
              text: error.data.message,
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
    $scope.data = false;
    $scope.leftPanel = [];
    $scope.doctorDetails = [];

    $scope.patientDoctor = true;
    $http
      .get(apiUrl + "/hospitalapp/patientprofile", {
        withCredentials: true,
      })
      .then(function (response) {
        console.log(response.data);
        $scope.loader = false;
        $scope.data = true;
        $scope.details = response.data;
      })
      .catch(function (error) {
        console.log(error.data);
        Swal.fire({
          icon: "error",
          text: error.data.message,
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
    $scope.data = false;
    $http
      .get(apiUrl + "/hospitalapp/panelname/", {
        withCredentials: true,
      })
      .then(function (response) {
        console.log(response.data);
        $scope.leftPanel = response.data;
        $scope.loader = false;
        $scope.data = true;
      })
      .catch(function (error) {
        console.log(error.data);
        Swal.fire({
          icon: "error",
          text: error.data.message,
        });
      });
    $http
      .get(apiUrl + "/hospitalapp/patientprofile", {
        withCredentials: true,
      })
      .then(function (response) {
        console.log(response.data);
        $scope.details = response.data;
        var patientId = $scope.details[0].id;
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
            console.log(error.data);
            Swal.fire({
              icon: "error",
              text: error.data.message,
            });
          });
      })
      .catch(function (error) {
        console.log(error.data);
        Swal.fire({
          icon: "error",
          text: error.data.message,
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
          console.log(error.data);
        });
    };
  },
]);

myApp.controller("patientDocController", [
  "$scope",
  "$http",
  "$location",
  function ($scope, $http, $location) {
    $scope.loader = true;
    $scope.data = false;
    $http
      .get(apiUrl + "/hospitalapp/patientdashboard/", {
        withCredentials: true,
      })
      .then(function (response) {
        console.log(response.data);
        $scope.loader = false;
        $scope.data = true;
        $scope.doctorDetails = response.data;
      })
      .catch(function (error) {
        console.log(error.data);
        Swal.fire({
          icon: "error",
          text: error.data.message,
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
    $scope.appointment = false;

    $http
      .get(apiUrl + "/hospitalapp/appointments/", {
        withCredentials: true,
      })
      .then(function (response) {
        $scope.appointments = response.data;
        console.log($scope.appointments);
        $scope.loader = false;
        $scope.appointment = true;
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
          $scope.appointment = false;
          console.log(data);
          $http
            .post(apiUrl + "/hospitalapp/recpstApptAccept/", data, {
              withCredentials: true,
            })
            .then(function (response) {
              console.log(response.data);
              $scope.appointment = true;
              Swal.fire({
                title: "The appointmnet is " + response.data.message,
                confirmButtonText: "Ok",
              });
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
                  console.log(error.data);
                  Swal.fire({
                    icon: "error",
                    text: error.data.message,
                  });
                });
            })
            .catch(function (error) {
              console.log(error.data);
              Swal.fire({
                icon: "error",
                text: error.data.message,
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
                Swal.fire({
                  title: "The appointmnet is " + response.data.message,
                  confirmButtonText: "Ok",
                });
                $http
                  .get(apiUrl + "/hospitalapp/appointments/", {
                    withCredentials: true,
                  })
                  .then(function (response) {
                    $scope.appointments = response.data;
                    console.log($scope.appointments);
                    $scope.loader = false;
                    $scope.appointment = true;
                    if ($scope.appointments.length == 0) {
                      Swal.fire({
                        title: "No appointments to show",
                        confirmButtonText: "Ok",
                      });
                      $location.path("/dashboard");
                    }
                  })
                  .catch(function (error) {
                    console.log(error.data);
                    Swal.fire({
                      icon: "error",
                      text: error.data.message,
                    });
                  });
              })
              .catch(function (error) {
                console.log(error.data);
                Swal.fire({
                  icon: "error",
                  text: error.data.message,
                });
              });
          });
        };
      })
      .catch(function (error) {
        console.log(error.data);
        Swal.fire({
          icon: "error",
          text: error.data.message,
        });
      });

    $scope.exportTableToExcel = function (id, name) {
      exportToExcel(id, name);
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
      .get(apiUrl + "/hospitalapp/patientdashboard/", {
        withCredentials: true,
      })
      .then(function (response) {
        console.log(response);
       
        $scope.data = true;
        $scope.doctorDetails = response.data;
      })
      .catch(function (error) {
        console.log(error.data);
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
          console.log(error.data);
        });
    };
  },
]);

myApp.controller("docprofileController", [
  "$scope",
  "$http",
  "$location",
  function ($scope, $http, $location) {
    
    $scope.patientDetails = [];
    $http
      .get(apiUrl + "/hospitalapp/doctorProfile/", {
        withCredentials: true,
      })
      .then(function (response) {
        console.log(response);
        $scope.doctorProfile = response.data;
        $scope.data = true;
       
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
            console.log(error.data);
          });
      })
      .catch(function (error) {
        console.log(error.data);
      }); 
}]);

myApp.controller("patientController", [
  "$scope",
  "$http",
  function ($scope, $http) {
    $scope.leftPanel = [];
    $scope.loader = true;
    $scope.data = false;

    $scope.exportTableToExcel = function (id, name) {
      exportToExcel(id, name);
    };

    $http
      .get(apiUrl + "/hospitalapp/allPatient/", {
        withCredentials: true,
      })
      .then(function (response) {
        console.log(response);
        $scope.loader = false;
        $scope.data = true;
        $scope.patientDetails = response.data;
      })
      .catch(function (error) {
        console.log(error.data);
        Swal.fire({
          icon: "error",
          text: error.data.message,
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
    $scope.loader = true;
    $scope.data = false;
    $http
      .get(apiUrl + "/hospitalapp/identifyDoctor/", {
        withCredentials: true,
      })
      .then(function (response) {
        console.log(response.data);
        $scope.loader = false;
        $scope.data = true;
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
            console.log(error.data);
            Swal.fire({
              icon: "error",
              text: error.data.message,
            });
          });
      })
      .catch(function (error) {
        console.log(error.data);
        Swal.fire({
          icon: "error",
          text: error.data.message,
        });
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
  "$rootScope",
  function ($scope, $http, $location, sharedDataService, $rootScope) {
    $scope.loader = true;
    $scope.data = false;
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
            $scope.loader = false;
            $scope.data = true;
            if ($scope.appointments.length == 0) {
              $location.path("/dashboard");

              Swal.fire({
                icon: "error",
                text: "No Appointment to show",
              });
            }
          })
          .catch(function (error) {
            console.log(error.data);
            Swal.fire({
              icon: "error",
              text: error.data.message,
            });
          });
      })
      .catch(function (error) {
        console.log(error.data);
        Swal.fire({
          icon: "error",
          text: error.data.message,
        });
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
          $scope.prescription = response.data.allDetails;
        })
        .catch(function (error) {
          console.log(error.data);
          Swal.fire({
            icon: "error",
            text: error.data.message,
          });
        });
    };

    $rootScope.$on("prescriptionSubmitted", function () {
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
              console.log(error.data);
              Swal.fire({
                icon: "error",
                text: error.data.message,
              });
            });
        })
        .catch(function (error) {
          console.log(error.data);
          Swal.fire({
            icon: "error",
            text: error.data.message,
          });
        });
    });
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
            console.log(error.data);
            Swal.fire({
              icon: "error",
              text: error.data.message,
            });
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

myApp.controller("patientPrescriptionController", [
  "$scope",
  "$http",
  "$location",
  "$window",
  "sharedDataService",
  function ($scope, $http, $location, $window, sharedDataService) {
    $scope.loader = true;
    $scope.data = false;
    $http
      .get(apiUrl + "/hospitalapp/patientPrescription/", {
        withCredentials: true,
      })
      .then(function (response) {
        console.log(response);
        $scope.prescriptions = response.data;
        $scope.loader = false;
        $scope.data = true;
        if ($scope.prescriptions.length == 0) {
          $location.path("/dashboard");
          Swal.fire({
            icon: "error",
            text: "No prescription to show",
          });
        }
      })
      .catch(function (error) {
        console.log(error.data);
        Swal.fire({
          icon: "error",
          text: error.data.message,
        });
        $location.path("/dashboard");
      });

    $scope.bill = function (id) {
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
        })
        .catch(function (error) {
          console.log(error);
          Swal.fire({
            icon: "error",
            text: error.data.message,
          });
        });
    };

    $scope.prescription = function (id) {
      console.log(id);
      sharedDataService.setId(id);
      $location.path("/dashboard/prescriptionDetails");
    };
  },
]);

myApp.controller("prescriptionDetailsController", [
  "$scope",
  "$http",
  "$location",
  "$window",
  "sharedDataService",
  function ($scope, $http, $location, $window, sharedDataService) {
    var id = sharedDataService.getId();
    console.log(id);
    if (id == null) {
      $location.path("/dashboard/patientPrescription");
    } else {
      $http
        .get(apiUrl + "/hospitalapp/prescriptionDetails/", {
          withCredentials: true,
          params: { id: id },
        })
        .then(function (response) {
          console.log(response.data);
          $scope.allDetails = response.data.allDetails;
          $scope.medication = response.data.medicineDetails;
        })
        .catch(function (error) {
          console.log(error);
          Swal.fire({
            icon: "error",
            text: error.data.message,
          });
        });

      $scope.print = function () {
        const data = document.getElementById("patientPrescription").innerHTML;
        const display = window.open("", "_blank"); 
        display.document.write(data);
        display.document.close();
        display.focus();
        display.print();
        display.close();
      };
    }
  },
]);
 
myApp.controller("patientPrecDetailsController", [  
  "$scope",
  "$http",
  "$location",
  "$window",
  "sharedDataService",
  function ($scope, $http, $location, $window, sharedDataService) {
    $scope.loader = true;
    $scope.data = false;
    $http
      .get(apiUrl + "/hospitalapp/recpstPrescription/", {
        withCredentials: true,
      })
      .then(function (response) {
        console.log(response);
        $scope.recstPrescription = response.data;
        $scope.loader = false;
        $scope.data = true;
      })
      .catch(function (error) {
        console.log(error);
      });

    $scope.bill = function (id) {
      console.log(id);
      $http
        .get(apiUrl + "/hospitalapp/presStatus/", {
          withCredentials: true,
          params: { id: id },
        })
        .then(function (response) {
          console.log(response);
          if (response.data[0].prescription_status) {
            console.log("bill");
            $http
              .get(apiUrl + "/hospitalapp/generate_pdf_response/", {
                withCredentials: true,
                params: { id: id },
                responseType: "arraybuffer",
              })
              .then(function (response) {
                console.log(response);
                var blob = new Blob([response.data], {
                  type: "application/pdf",
                });
                var objectUrl = URL.createObjectURL(blob);
                $window.open(objectUrl);
              })
              .catch(function (error) {
                console.log(error);
                Swal.fire({
                  icon: "error",
                  text: error.data.message,
                });
              });
          } else {
            Swal.fire({
              icon: "error",
              text: "No bill found",
            });
          }
        })
        .catch(function (error) {
          console.log(error);
          Swal.fire({
            icon: "error",
            text: error.data.message,
          });
        });
    };

    $scope.prescription = function (id) {
      console.log(id);
      $http
        .get(apiUrl + "/hospitalapp/presStatus/", {
          withCredentials: true,
          params: { id: id },
        })
        .then(function (response) {
          if (response.data[0].prescription_status) {
            console.log("bill");
            sharedDataService.setId(id);
            $location.path("/dashboard/prescriptionDetails");
          } else {
            Swal.fire({
              icon: "error",
              text: "No prescription found",
            });
          }
        })
        .catch(function (error) {
          console.log(error);
          Swal.fire({
            icon: "error",
            text: error.data.message,
          });
        });
    };
  },
]);
myApp.controller("MedicalhistoryController", [
  "$http",
  "$scope",
  function ($http, $scope) {
    random();
    $scope.loader = true;
    $scope.data = false;
    $http
      .get(apiUrl + "/hospitalapp/graphdetails", {
        withCredentials: true,
      })
      .then(function (response) {
        $scope.loader = false;
        $scope.data = true;
        console.log(response);
        new Chart("myChart", {
          type: "bar",
          data: {
            labels: response.data.speciality,
            datasets: [
              {
                label: "Doctor Count",
                data: response.data.doctor_count,
                backgroundColor: [
                  "rgba(255, 99, 132, 0.2)",
                  "rgba(255, 159, 64, 0.2)",
                  "rgba(255, 205, 86, 0.2)",
                  "rgba(75, 192, 192, 0.2)",
                  "rgba(54, 162, 235, 0.2)",
                  "rgba(153, 102, 255, 0.2)",
                  "rgba(201, 203, 207, 0.2)",
                ],
                borderColor: [
                  "rgb(255, 99, 132)",
                  "rgb(255, 159, 64)",
                  "rgb(255, 205, 86)",
                  "rgb(75, 192, 192)",
                  "rgb(54, 162, 235)",
                  "rgb(153, 102, 255)",
                  "rgb(201, 203, 207)",
                ],
                borderWidth: 2,
              },
            ],
          },
          options: {
            responsive: true,
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  font: {
                    size: 20,
                  },
                },
              },
              x: {
                ticks: {
                  font: {
                    size: 20,
                  },
                },
              },
            },
          },
        });
      })
      .catch(function (error) {
        console.log(error);
      });

    $http
      .get(apiUrl + "/hospitalapp/graph_appt/", {
        withCredentials: true,
      })
      .then(function (response) {
        console.log(response);

        new Chart("myChart1", {
          type: "pie",
          data: {
            labels: response.data.doctor_name,
            datasets: [
              {
                data: response.data.patient_count,
                backgroundColor: [
                  "rgba(255, 99, 132, 0.2)",
                  "rgba(255, 159, 64, 0.2)",
                  "rgba(255, 205, 86, 0.2)",
                  "rgba(75, 192, 192, 0.2)",
                  "rgba(54, 162, 235, 0.2)",
                  "rgba(153, 102, 255, 0.2)",
                  "rgba(201, 203, 207, 0.2)",
                ],
                borderColor: [
                  "rgb(255, 99, 132)",
                  "rgb(255, 159, 64)",
                  "rgb(255, 205, 86)",
                  "rgb(75, 192, 192)",
                  "rgb(54, 162, 235)",
                  "rgb(153, 102, 255)",
                  "rgb(201, 203, 207)",
                ],
                borderWidth: 2,
                hoverOffset: 4,
              },
            ],
          },
          options: {
            responsive: true,
          },
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  },
]);

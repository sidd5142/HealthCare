var app = angular.module("myApp", ['ui.router']);
app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) { 
	$stateProvider
		.state('Home', {
            url: '/home',
			templateUrl: 'HomePage.html',
			controller: 'HomePageController'
		})
        .state('Register', {
            url: '/register',
			templateUrl: 'Register.html',
			controller: 'RegisterController'
		})
		.state('Login', {
            url: '/login',
			templateUrl: 'login.html',
			controller: 'LogInController'
		})
		.state('DoctorRegisteration', {
            url: '/Doctorreg',
			templateUrl: 'DoctorReg.html',
			controller: 'DocLogInController'
		})
		.state('Dashboard', {
            url: '/dashboard',
			templateUrl: 'dashboard.html',
			controller: 'DashboardController'
		})
		.state('Dashboard.Appointment', {
			url: '/appointment',
			templateUrl: 'appoint.html',
			controller: 'AppointmentController'
		})
		.state('Dashboard.Personal', {
			url: '/personal',
			templateUrl: 'personinfo.html',
			controller: 'PersonalController'
		})
		.state('Receptionist', {
            url: '/reception',
			templateUrl: 'registrar.html',
			controller: 'ReceptionistController'
		})
		.state('Dashboard.Records', {
            url: '/records',
			templateUrl: 'records.html',
			controller: 'RecordsController'
		})
		.state('RecepDashboard', {
            url: '/recepdashboard',
			templateUrl: 'receptionistdash.html',
			controller: 'RecepDashboardController'
		})
		.state('RecepDashboard.Doctor', {
            url: '/recepdashboarddoctor',
			templateUrl: 'receptiondoctor.html',
			controller: 'RecepDoctorController'
		})
		.state('RecepDashboard.Appointment', {
            url: '/recepdashboardappoint',
			templateUrl: 'receptionapp.html',
			controller: 'RecepAppointController'
		})
		.state('RecepDashboard.Record', {
            url: '/recepdashboardrecord',
			templateUrl: 'receptionistrecord.html',
			controller: 'RecepRecordController'
		})
		.state('RecepDashboard.Patient', {
            url: '/recepdashboardpatient',
			templateUrl: 'recepdoctorpatient.html',
			controller: 'RecepPatientController'
		})
		.state('DoctorDashboard', {
            url: '/doctordashboard',
			templateUrl: 'doctordashboard.html',
			controller: 'DoctorDashboardController'
		})
		.state('DoctorDashboard.DoctPersonal', {
            url: '/doctpersonal',
			templateUrl: 'doctinfo.html',
			controller: 'DoctPersonalController'
		})
		.state('DoctorDashboard.DoctAppoint', {
            url: '/doctappoint',
			templateUrl: 'doctappoint.html',
			controller: 'DoctAppointController'
		})
		.state('DoctorDashboard.DoctRecord', {
            url: '/doctrecord',
			templateUrl: 'DoctRecord.html',
			controller: 'DoctRecordController'
		})
		.state('DoctorDashboard.Prescriptions', {
            url: '/doctprescriptions',
			templateUrl: 'prescription.html',
			controller: 'PrescriptionsController'
		})

		$urlRouterProvider.otherwise('/home');
		

}]);

var api = 'https://10.21.80.245:8000/healthcare/'

app.controller('RegisterController',function($scope,$http,$window,$state){

	$scope.Registrationfrom = function(){
        console.log('FirstName :', $scope.firstname)
		console.log('LstName :', $scope.lastname)
		console.log('Username : ', $scope.username)
		console.log('Email:', $scope.email)
		console.log('Pass :', $scope.password)
		console.log('ConfPass :', $scope.confpassword)
		console.log('Contact :', $scope.contact)
		console.log('Age :', $scope.age)
		console.log('Address :', $scope.address)
		console.log('Gender :', $scope.gender)
	}

	$scope.validatePassword = function(){
		$scope.passwordMismatch = $scope.password !== $scope.confpassword;
	  }


	 $scope.register = function(){
		var pass = $scope.password;
		var confpass = $scope.confpassword;

		var regdata = {
            first_name: $scope.firstname,
            last_name : $scope.lastname,
            password : $scope.password,
            // confirmpassword : $scope.confpassword
			email : $scope.email,
			username : $scope.username,
			age : $scope.age,
			gender : $scope.gender,
			contact : $scope.contact,
			address : $scope.address,
			// blood_group : $scope.blood
		};
		console.log(regdata);

		if(pass == confpass){
			
			$http.post(api+'registeruser/', regdata, {
			headers: {'Content-Type': undefined},
		    withCredentials: true
		})
          .then(function(response){
            
            console.log(response.data)
			Swal.fire(
				'Congratulations!',
				'You are logged in!',
				'success'
			  )
			$state.go('Login');
		  })
		  .catch(function(error){
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Inputs are wrong!'
			  })
			// $window.alert(error);
		  })
		}
		else{
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Incorrect password'
			  })
			LoadingService.stopLoading();
		}

	 } 
});

app.controller('HomePageController',function($scope,$http,$window,$state){
	
});

app.controller('LogInController',function($scope,$http,$window,$state){
	$scope.LoginForm = function(){
        
		console.log('Username : ', $scope.username)
		console.log('Pass :', $scope.password)
	}
	$scope.login = function(){
		var data = {
			username : $scope.username,
			password : $scope.password
	}
	if($scope.password)
	{
	$http.post(api+'login/', data, {
			// headers: {'Content-Type': undefined},
		    withCredentials: true
     })
	 .then(function(response){
		
		console.log(response.data)

		var msg = response.data.role
		console.log(msg)
		// $state.go('Dashboard');

		// var msg = msgdata.role

		if(msg === 'receptionist'){
			$state.go('RecepDashboard')
		}
		else if(msg === 'Doctor') 
        {
		    $state.go('DoctorDashboard');
		}
		else {
			$state.go('Dashboard')
		}

	  })
	  .catch(function(error){
		$window.alert(error);
	  })
	}
	else{
		$window.alert('Fields Are Empty');
			// LoadingService.stopLoading();
	}
}
});

app.controller('DocLogInController',function($scope,$http,$window,$state){
	console.log("Hit")
		$http.get(api+'departdrop/', {
			withCredentials : true
		})
		.then(function(response){
			console.log(response)
			$scope.departs = response.data;
			console.log($scope.departs)
		})
		.catch(function(error){
			console.log(error)
		})
	$scope.DocRegistrationfrom = function(){
        console.log('FirstName :', $scope.firstname)
		console.log('LstName :', $scope.lastname)
		console.log('Username : ', $scope.username)
		console.log('Email:', $scope.email)
		console.log('Pass :', $scope.password)
		console.log('ConfPass :', $scope.confpassword)
		console.log('Contact :', $scope.contact)
		console.log('Age :', $scope.age)
		console.log('Address :', $scope.address)
		console.log('Gender :', $scope.gender)
		console.log('Department :', $scope.department)
		console.log('Qualification :', $scope.qualification)
		console.log('Fees :', $scope.fees)
	}

	$scope.validatePassword = function(){
		$scope.passwordMismatch = $scope.password !== $scope.confpassword;
	  }


	 $scope.Docregister = function(){
		var pass = $scope.password;
		var confpass = $scope.confpassword;

		var regdata = {
            first_name: $scope.firstname,
            last_name : $scope.lastname,
            password : $scope.password,
			email : $scope.email,
			username : $scope.username,
			age : $scope.age,
			gender : $scope.gender,
			contact : $scope.contact,
			address : $scope.address,
			qualification : $scope.qualification,
			department_id : $scope.department,
			doctorFee : $scope.fees
		};
		console.log(regdata);

		if(pass == confpass){
			
			$http.post(api+'registerdoctor/', regdata, {
			headers: {'Content-Type': undefined},
		    withCredentials: true
		})
          .then(function(response){
            
            console.log(response.data)
			Swal.fire(
				'Congratulations!',
				'You are logged in!',
				'success'
			  )
			$state.go('Login');
		  })
		  .catch(function(error){
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Incorrect username or password!!'
			  })
		})
		}
		else{
			// $window.alert('Incorrect Password');
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Incorrect password!!'
			  })
			LoadingService.stopLoading();
		}

	 } 
});

app.controller('AppointmentController',function($scope,$http,$window,$state){

	$scope.depart = [];

	$http.get(api+'departdrop/', {
		withCredentials : true
	})
	.then(function(response){
		console.log(response)
		$scope.departs = response.data;
		console.log($scope.departs)
		$scope.categories = [];


		var ids = $scope.selectdeapart;

		$scope.selectdeapart = function(depart){
        console.log(depart.id)
		var Params = {department_id : depart.id}
		$http.get(api+'doctordrop/', {params : Params}, {
			withCredentials:true
		})
		.then(function(response){
			console.log(response)
			$scope.categories = response.data;
			console.log($scope.categories);
		})
	}	

		})
		.catch(function(error){
			console.log(error)
	})

	$scope.appoint = function(){
        console.log($scope.selectdepartment)
		console.log($scope.selectcategory)
		var appointdata = {
			appointmentDate : $scope.date,
			department_id : $scope.selectdepartment,
			doctor_id : $scope.selectcategory,
			// doctor_id : $scope.selectdoctor,
			time : $scope.time
		}
		console.log(appointdata)
		$http.post(api+'bookappointment/', appointdata, {
			withCredentials : true
		})
		.then(function(response){
          console.log(response)
		  Swal.fire({
			icon: 'success',
			title: 'Congratulations',
			text: response.data.message
		  })
		})
		.catch(function(error){
			console.log(error)
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Someting Missing!!'
			  })
		})
	}
	
	})

	
app.controller('PersonalController',function($scope,$http,$window,$state){
});

app.controller('DashboardController',function($scope,$http,$window,$state){

	$scope.patients = [];
	$scope.patient = [];
	$scope.dashboards = [];

	$http.get(api + 'getpanel/', {
		withCredentials:true
	})
	.then(function(response){
		console.log(response);
		$scope.dashboards = response.data
		console.log($scope.dashboards)
		// console.log($scope.patient[0].first_name)

   })
   .catch(function(error){
	   Swal.fire({
		   icon: 'error',
		   title: 'Oops...',
		   text: 'Something went wrong..'
		 })
   })


	$http.get(api+'getpatient/', {
		withCredentials: true
	})
	.then(function(response){
         console.log(response);
		 $scope.patient = response.data
		 console.log($scope.patient)
		 console.log($scope.patient[0].first_name)

	})
	.catch(function(error){
		Swal.fire({
			icon: 'error',
			title: 'Oops...',
			text: 'Something went wrong..'
		  })
	})

	
});

app.controller('RecordsController',function($scope,$http,$window,$state){
		$scope.record = [];

		$http.get(api+'getprappoint/' , {
			withCredentials	: true
		})
		.then(function(response){
			console.log(response);
			$scope.record = response.data
			console.log($scope.record)
		})
		.catch(function(error){
			console.log(error)
		})

		$scope.exportToExcel = function () {
			const table = document.getElementById('exportTable');

			const doc = document.createElement('table');
			doc.innerHTML = table.outerHTML;

			// Convert the HTML document to a blob
			const blob = new Blob(['\ufeff', doc.outerHTML], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

			// Create a URL for the blob
			const url = window.URL.createObjectURL(blob);

			// Create a download link and trigger the click event
			const a = document.createElement('a');
			a.href = url;
			a.download = 'Records.xlsx';
			document.body.appendChild(a);
			a.click();

			window.URL.revokeObjectURL(url);
			document.body.removeChild(a);
		};
});

// app.controller('ReceptionistController',function($scope,$http,$window,$state){
// });

app.controller('DoctorDashboardController',function($scope,$http,$window,$state){
});

app.controller('DoctPersonalController',function($scope,$http,$window,$state){

	$scope.doctinfo = [];
	$http.get(api + 'doctorinfo/', {
		withCredentials	: true
	})
	.then(function(response){
		console.log(response);
		$scope.doctinfo = response.data
		console.log($scope.doctinfo) 
	})
	.catch(function(error){
		console.log(error)
		Swal.fire({
			icon: 'error',
			title: 'Oops...',
			text: 'Something went wrong..'
		  })
	})
});	


var dltid = {};
var edtid = {};

app.controller('DoctAppointController',function($scope,$http,$window,$state){
	$scope.doctappoint = [];
	$http.get(api + 'getunapproved/', {
		withCredentials	: true
	})
	.then(function(response){
		console.log(response);
		$scope.doctappoint = response.data
		console.log($scope.doctappoint) 
	})
	.catch(function(error){
		console.log(error)
		Swal.fire({
			icon: 'error',
			title: 'Oops...',
			text: 'Something went wrong..'
		  })
	})

	$scope.accept = function(appoint){

		var success = {appointment_id : appoint.pk}

		$http.post(api + 'confirmappointment/', success, {
			withCredentials	: true
		})
		.then(function(response){
			console.log(response)
			Swal.fire({
				icon: 'success',
				title: 'Done...',
				text: 'Appointment Approved'
			  })
			  $state.reload('DoctorDashboard.DoctAppoint')
		})
		.catch(function(error){
			console.log(error)
		})
	}
	$scope.reject = function(appoint){
		dltid = appoint.pk
	}

	$scope.edit = function(appoint){
		edtid = appoint.pk
	}
});

	app.service('SharedDataService', function () {
		this.reasonInput = ""; // Initialize the shared variable
	});

	app.controller('ModalController', function ($scope, $http, $window, $state, SharedDataService) {
		$scope.reasonInput = ""; 
		$scope.reasonInput = SharedDataService.reasonInput;

		$scope.submit = function (appoint) {
		  var data = {
			appointment_id: dltid,
			reason: $scope.reasonInput, 
		  };
	  console.log(data)
		  $http.delete(api + 'confirmappointment/', {params : data ,
			withCredentials : true
		  })
			.then(function (response) {
			  console.log(response);
			  Swal.fire({
				icon: 'success',
				title: 'Deleted...',
				text: 'Appointment Deleted'
			  });
			  $scope.reasonInput = "";
			})
			.catch(function (error) {
			  console.log(error);
			});

			SharedDataService.reasonInput = "";
		};
  });

  app.service('SharedData2Service', function () {
	this.date = "";
	this.time = "";
	this.reason = ""; // Initialize the shared variable
});

  app.controller('Modal2Controller', function ($scope, $http, $window, $state, SharedData2Service) {
	$scope.reason = ""; 
	$scope.reason = SharedData2Service.reason;
	// $scope.date = SharedData2Service.reason
	// $scope.time = SharedData2Service.reason

	$scope.submit = function (appoint) {
	  var data = {
		appointment_id: edtid,
		new_appointmentDate: $scope.date, 
		new_time : $scope.time,
		reason : $scope.reason
	  };
  console.log(data)
	  $http.put(api + 'confirmappointment/', data, {
		withCredentials : true
	  })
		.then(function (response) {
		  console.log(response);
		  Swal.fire({
			icon: 'success',
			title: 'Edited...',
			text: response.data.message
		  });
		  $state.reload('Dashboard.Appointment')
		})
		.catch(function (error) {
		  console.log(error);
		});

		SharedData2Service.time = "";
		SharedData2Service.date = "";
	};
});

var prescribeid = {};

app.controller('DoctRecordController',function($scope,$http,$window,$state){
	$scope.doctrecord = [];
	$scope.press = [];

	$http.get(api + 'getapproved/', {
		withCredentials	: true
	})
	.then(function(response){
		console.log(response)
		$scope.doctrecord = response.data
		console.log($scope.doctrecord)

		$scope.prescribed  = function(record){

			var ids = {id : record.patient}
            console.log(ids)

				$http.get(api + 'getmedicalhistory/',{params : ids,
				withCredentials:true
			})
			.then(function(response){
				console.log(response)
				$scope.press = response.data
				console.log($scope.press)

				$scope.contacts = [];
                $scope.medicine = "";
				$scope.dosage = "";
                $scope.timing = "";
				$scope.prescribed = {}

                $scope.addfield = function(){
                    $scope.contacts.push({ 
						medicine: $scope.medicine,
						dosage: $scope.dosage,
						timing: $scope.timing
					});
					$scope.medicine = "";
                    $scope.dosage = "";
                    $scope.timing = "";
                 };

                $scope.removeContactField = function(index){ 
                    $scope.contacts.splice(index, 1);
                };

	            $scope.submit = function () {
	              var data = {
	            	prescribed: $scope.prescribed,
                    contacts: $scope.contacts
	              };
                 console.log(data)
				 $http.post(api + 'prescribed/', data, {
					withCredentials: true
				 })
				 .then(function(response){
					console.log(response)
					$scope.press = response.data
					console.log($scope.press)
				 })
				 .catch(function(error){
					console.log(error)
					Swal.fire({
						icon: 'error',
						title: 'cancel...',
						text: response.data.message
					  })
					})
	            }

			})
			.catch(function(error){
				console.log(error)
				Swal.fire({
					icon: 'error',
					title: 'cancel...',
					text: response.data.message
				  })
				})
		}

		
	})
	.catch(function(error){
		console.log(error)
		Swal.fire({
			icon: 'error',
			title: 'cancel...',
			text: 'Missing any key'
		  })
		})

		// $scope.downpdf = function(){
		// 		const pdf = new jsPDF();
		// 		const resumeContent = document.getElementById('myModal2'); // Replace 'resume-content' with the ID of your resume content div.
		// 		pdf.html(resumeContent, {
		// 		  callback: function(pdf) {
		// 			pdf.save('resume.pdf');
		// 		  }
		// 		});
		// 	  };


	// 	var app = angular.module("app", []);

	//  app.controller("mainController", ["$scope",
	// 	$scope.export = function(){
	// 		html2canvas(document.getElementById('exportthis'), {
	// 			onrendered: function (canvas) {
	// 				var data = canvas.toDataURL();
	// 				var docDefinition = {
	// 					content: [{
	// 						image: data,
	// 						width: 500,
	// 					}]
	// 				};
	// 				pdfMake.createPdf(docDefinition).download("test.pdf");
	// 			}
	// 		});
	// 	}
	//  ]);
  

		
});		
app.controller('Modal3Controller', function ($scope, $http, $window, $state) {    
});

app.controller('RecepDashboardController',function($scope,$http,$window,$state){
	// $scope.recepts = [];

	// $http.get(api + 'recptionist/',{
	// 	withCredentials:true
	// })
	// .then(function (response) {
	// 	console.log(response);
	// 	$scope.recepts = response.data
	// 	console.log($scope.recepts)
	//   })
	//   .catch(function (error) {
	// 	console.log(error);
	// 	Swal.fire({
	// 		icon: 'error',
	// 		title: 'Wrong...',
	// 		text: 'Something went wrong'
	// 	  });
	//   });
});	

var doctorid = {};
app.controller('RecepDoctorController',function($scope,$http,$window,$state){
	$scope.doctor = [];

	$http.get(api + 'availdoctors',{
		withCredentials:true
	})
	.then(function(response){
		console.log(response)
		$scope.doctor = response.data;
		console.log($scope.doctor)
	})
	.catch(function(error){
		console.log(error)
		Swal.fire({
			icon: 'error',
			title: 'Oops...',
			text: 'Something went wrong..'
		  })
	})

	$scope.view = function(doctors){
		// doctorid = doctors.user
			$scope.modal = [];
		
			var id = {doctor_id : doctors.pk}
			console.log(id)
			$http.get(api + 'doctorfulldetail/', {params : id , 
			withCredentials:true
			 })
			 .then(function(response){
				console.log(response)
				$scope.modal = response.data;
				console.log($scope.modal)
			})
			.catch(function(error){
				console.log(error)
				Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: 'Something went wrong..'
				  })
			})
		
	}

});	

var dltid = {};
app.controller('RecepAppointController',function($scope,$http,$window,$state){

	$scope.appoints= [];
	$scope.searchText = " ";

		$http.get(api + 'getpatientappointment/',{
			withCredentials:true
		})
		.then(function(response){
			console.log(response)
			$scope.appoints = response.data;
			console.log($scope.appoints)
		})
		.catch(function(error){
			console.log(error)
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Something went wrong..'
			  })
		})

	$scope.accept = function(appoint){
		var confirmed = {
			appointment_id : appoint.pk,
			rApproval : 1
		}
		 console.log(confirmed)
		$http.post(api + 'approveappointment/', confirmed, {
			withCredentials	: true
		})
		.then(function(response){
			console.log(response)
			Swal.fire({
				icon: 'success',
				title: 'Done...',
				text: 'Appointment Approved'
			  })
			  $state.reload('RecepDashboard.Appointment')
		})
		.catch(function(error){
			console.log(error)
			Swal.fire({
				icon: 'error',
				title: 'Something Wrong...',
				text: "Error"
			  })
		})
	}

	$scope.reject = function(appoint){
		dltid = appoint.pk
	}

	$scope.export = function () {
		const table = document.getElementById('recepappoint');

		const doc = document.createElement('table');
		doc.innerHTML = table.outerHTML;

		const blob = new Blob(['\ufeff', doc.outerHTML], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

		const url = window.URL.createObjectURL(blob);

		const a = document.createElement('a');
		a.href = url;
		a.download = 'Records.xlsx';
		document.body.appendChild(a);
		a.click();

		window.URL.revokeObjectURL(url);
		document.body.removeChild(a);
	};
});


app.service('SharedDataService', function () {
	this.reasonInput = ""; 
});

app.controller('ModalController', function ($scope, $http, $window, $state, SharedDataService) {
	$scope.reasonInput = ""; 
	$scope.reasonInput = SharedDataService.reasonInput;

	$scope.submit = function (appoint) {
	  var data = {
		appointment_id : dltid,
		reason : $scope.reasonInput, 
	  };
  console.log(data)
	  $http.delete(api + 'approveappointment/',  { data, 
		withCredentials : true
	  })
		.then(function (response) {
		  console.log(response);
		  Swal.fire({
			icon: 'success',
			title: 'Rejected...',
			text: response.data.message
		  });
		  $scope.reasonInput = "";
		  $state.reload('RecepDashboard.Appointment')

		})
		.catch(function (error) {
		  console.log(error);
		});

		SharedDataService.reasonInput = "";
	};
});

app.service('SharedData2Service', function () {
this.date = "";
this.time = "";
this.reason = ""; // Initialize the shared variable
});

// app.controller('Modal2Controller', function ($scope, $http, $window, $state, SharedData2Service) {
// $scope.reason = ""; 
// $scope.reason = SharedData2Service.reason;
// // $scope.date = SharedData2Service.reason
// // $scope.time = SharedData2Service.reason

// $scope.submit = function (appoint) {
//   var data = {
// 	appointment_id: edtid,
// 	new_appointmentDate: $scope.date, 
// 	new_time : $scope.time,
// 	reason : $scope.reason
//   };
// console.log(data)
//   $http.put(api + 'confirmappointment/', data, {
// 	withCredentials : true
//   })
// 	.then(function (response) {
// 	  console.log(response);
// 	  Swal.fire({
// 		icon: 'success',
// 		title: 'Edited...',
// 		text: response.data.message
// 	  });
// 	})
// 	.catch(function (error) {
// 	  console.log(error);
// 	});

// 	SharedData2Service.time = "";
// 	SharedData2Service.date = "";
// };
// });

app.controller('RecepRecordController', function ($scope, $http, $window, $state) {
   $scope.records = [];

   $http.get(api + 'checkedpatient/', {
	withCredentials : true
   })
   .then(function (response) {
	console.log(response);
	$scope.records = response.data
	console.log($scope.records)
    })
    .catch(function (error) {
	console.log(error);
	Swal.fire({
		icon: 'error',
		title: 'Error...',
		text: 'Something went wrong'
		});
    });
})

app.controller('RecepPatientController', function ($scope, $http, $window, $state) {
	$scope.patient = [];
	$scope.records = [];

	$http.get(api + 'availdoctors/', {
		withCredentials : true
	})
	.then(function (response) {
		console.log(response);
		$scope.records = response.data
		console.log($scope.records)

		$scope.show = function(doctors){
			var id = { doctor_id : doctors.pk}
			console.log(id)
			   $http.get(api + 'ptunderdoct/', {params : id ,
			   withCredentials: true
				})
				.then(function (response) {
					console.log(response);
					$scope.patient = response.data
					console.log($scope.patient)
				})
				.catch(function(error){
					console.log(error)
					Swal.fire({
						icon: 'error',
						title: 'Error...',
						text: 'Something went wrong'
						});
				})
			  }
		})
		.catch(function (error) {
		console.log(error);
		Swal.fire({
			icon: 'error',
			title: 'Error...',
			text: 'Something went wrong'
			});
		});
});

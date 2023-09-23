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

		$urlRouterProvider.otherwise('/login');
		

}]);

var api = 'https://10.21.83.216:8000/healthcare/'

app.controller('RegisterController',function($scope,$http,$window,$state){


	// $scope.departs = [];
	// $scope.department = function(){
		
	// }


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
			blood_group : $scope.blood
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
			headers: {'Content-Type': undefined},
		    withCredentials: true
     })
	 .then(function(response){
		
		console.log(response.data)

		// var msgdata = response.data
		// var msg = msgdata.

		$state.go('DoctorDashboard.DoctPersonal');

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
			department : $scope.department,
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
		$http.get(api+'doctordrop', {params : Params}, {
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
			doctor_name : $scope.selectcategory,
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
			text: 'Your form is submited!!'
		  })
		})
		.catch(function(error){
			console.log(error)
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Incorrect password!!'
			  })
		})
	}
	
	})

	// $scope.idd = $scope.department
	// console.log($scope.idd)

	
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

	// $scope.dash = function(panelname){
	// 	$http
	// }
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
			// Get the table element
			const table = document.getElementById('exportTable');

			// Create a new HTML document
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

			// Clean up
			window.URL.revokeObjectURL(url);
			document.body.removeChild(a);
		};
});

// app.controller('ReceptionistController',function($scope,$http,$window,$state){
// });

app.controller('RecepDashboardController',function($scope,$http,$window,$state){
});	

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
		  $http.delete(api + 'confirmappointment/', data, {
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

	$http.get(api + 'getapproved/', {
		withCredentials	: true
	})
	.then(function(response){
		console.log(response)
		$scope.doctrecord = response.data
		console.log($scope.doctrecord)

		$scope.prescribed = function(record){
			prescribeid = record.id
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
});		
app.controller('Modal3Controller', function ($scope, $http, $window, $state) {
	$scope.reason = ""; 
	// $scope.reason = SharedData2Service.reason;
	// $scope.date = SharedData2Service.reason
	// $scope.time = SharedData2Service.reason

	$scope.prescribed = function (record) {
	  var data = {
		prescribeid_id: prescribeid,
		// new_appointmentDate: $scope.date, 
		// new_time : $scope.time,
		// reason : $scope.reason
	  };
     console.log(data)
	  $http.post(api + 'getapproved/', data, {
		withCredentials : true
	  })
		.then(function (response) {
		  console.log(response);
		  Swal.fire({
			icon: 'success',
			title: 'Edited...',
			text: response.data.message
		  });
		})
		.catch(function (error) {
		  console.log(error);
		});

		// SharedData2Service.time = "";
		// SharedData2Service.date = "";
	};
});

app.controller('PrescriptionsController',function($scope,$http,$window,$state){
});	

app.controller('RecepDoctorController',function($scope,$http,$window,$state){

});	

app.controller('RecepAppointController',function($scope,$http,$window,$state){

});	
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
			
			$http.post('https://10.21.83.175:8000/healthcare/registeruser/', regdata, {
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
	$http.post('https://10.21.80.123:8000/healthcare/login/', data, {
			headers: {'Content-Type': undefined},
		    withCredentials: true
     })
	 .then(function(response){
            
		console.log(response.data)

		$state.go('Dashboard.Appointment');

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
		$http.get('https://10.21.80.123:8000/healthcare/departdrop/', {
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
			
			$http.post('https://10.21.83.175:8000/healthcare/registerdoctor/', regdata, {
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

	$http.get('https://10.21.80.123:8000/healthcare/departdrop/', {
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
		$http.get('https://10.21.80.123:8000/healthcare/doctordrop', {params : Params}, {
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
			time : $scope.time
		}
		console.log(appointdata)
		$http.post('https://10.21.80.123:8000/healthcare/bookappointment/', appointdata, {
			withCredentials : true
		})
		.then(function(response){
          console.log(response)
		})
		.catch(function(error){
			console.log(error)
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


	$http.get('https://10.21.80.123:8000/healthcare/getpanel/', {
		withCredentials : true
	})
	.then(function(response){
		console.log(response)
		$scope.dashboards = response.data
		console.log($scope.dashboards)
	})
	.catch(function(error){
		Swal.fire({
			icon: 'error',
			title: 'Oops...',
			text: 'Something went wrong..'
		  })
	})

	$http.get('https://10.21.80.123:8000/healthcare/getpatient/', {
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

	// $scope.dash = function(){
	// 	$http
	// }
});

app.controller('RecordsController',function($scope,$http,$window,$state){
    $scope.record = [];

	$http.get('https://10.21.80.123:8000/healthcare/getprappoint' , {
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
});

app.controller('ReceptionistController',function($scope,$http,$window,$state){
});

app.controller('RecepDashboardController',function($scope,$http,$window,$state){
});	

app.controller('DoctorDashboardController',function($scope,$http,$window,$state){
});

app.controller('DoctPersonalController',function($scope,$http,$window,$state){
});	

app.controller('DoctAppointController',function($scope,$http,$window,$state){
});	

app.controller('DoctRecordController',function($scope,$http,$window,$state){
});		

app.controller('PrescriptionsController',function($scope,$http,$window,$state){
});		
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
		.state('DoctorRegister', {
            url: '/Doctorreg',
			templateUrl: 'DoctorReg.html',
			controller: 'DocLogInController'
		})
		.state('Dashboard', {
            url: '/dashboard',
			templateUrl: 'dashboard.html',
			controller: 'DashboardController'
		})

		$urlRouterProvider.otherwise('/home');
}]);

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
			address : $scope.address
		};
		console.log(regdata);

		if(pass == confpass){
			
			$http.post('https://10.21.86.182:8000/healthcare/registeruser/', regdata, {
			headers: {'Content-Type': undefined},
		    withCredentials: true
		})
          .then(function(response){
            
            console.log(response.data)
			$state.go('Login');
		  })
		  .catch(function(error){
			$window.alert(error);
		  })
		}
		else{
			$window.alert('Incorrect Password');
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
	$http.post('https://10.21.86.182:8000/healthcare/login/', data, {
			headers: {'Content-Type': undefined},
		    withCredentials: true
     })
	 .then(function(response){
            
		console.log(response.data)

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
			
			$http.post('https://10.21.86.182:8000/healthcare/registerdoctor/', regdata, {
			headers: {'Content-Type': undefined},
		    withCredentials: true
		})
          .then(function(response){
            
            console.log(response.data)
			$state.go('Login');
		  })
		  .catch(function(error){
			$window.alert(error);
		  })
		}
		else{
			$window.alert('Incorrect Password');
			LoadingService.stopLoading();
		}

	 } 
});
app.controller('DashboardController',function($scope,$http,$window,$state){
	$scope.login = function(){

	}
});
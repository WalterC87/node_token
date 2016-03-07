angular
	.module("tokenApp.controllers")
	.controller("SignUpController", SignUpController);
	.controller("LoginController", LoginController);
	.controller("LogoutController", LogoutController);

function SignUpController($auth, $location){
	var vm = this;
	this.signup = function(){
		$auth.signup({
			email: vm.email,
			password: vm.password
		})
		.then(function(){
			$location.path("/private");
		})
		.catch(function (response){
			console.log(response);
		})
	}
}

function LoginController($auth, $location){
	var vm = this;
	this.login = function(){
		$auth.login({
			email: vm.email,
			password: vm.password
		})
		.then(function(){
			$location.path("/private");
		})
		.catch(function (response){
			console.log(response);
		})
	}
}

function LogoutController($auth, $location){
	$auth.logout()
		.then(function(){
			$location.path("/")
		});
}
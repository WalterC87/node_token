angular
	.module("tokenApp", ["satellizer", "ui.router"])
	.config(function($authProvider, $stateProvider){
		//Parametros de configuarcion del auth
		$authProvider.loginUrl = "http://127.0.0.1:3000/auth/login";
		$authProvider.singupUrl = "http://127.0.0.1:3000/auth/signup";
		$authProvider.tokenName = "token";
		$authProvider.tokenPrefix = "tokenApp";


		//Configuracion de las rutas/estados
		$stateProvider
			.state("home", {
				url: "/",
				templateUrl: "index.html",
				controller: "HomeController"
			})
			.state("login", {
				url: "/login",
				templateUrl: "views/login.html",
				controller: "LoginController",
				controllerAs: "login"
			})
			.state('signup', {
				url: "/signup",
				templateUrl: "views/signup.html",
				controller: "SignUpController",
				controlleras: "signup"
			})
			.state("logout", {
				url: "/logout",
				templateUrl: null,
				controller: "LogoutController"
			})
			.state("private", {
				url: "/private",
				templateUrl: "views/private.html",
				controller: "PrivateController",
				controllerAs: "private"
			});
	});
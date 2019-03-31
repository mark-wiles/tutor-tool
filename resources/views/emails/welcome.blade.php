<!DOCTYPE html>
<html>
<head>
    <title>Welcome Email</title>
</head>

<style>

	body{
		font-family: Arial, Helvetica, sans-serif;
	}

	a {
		text-decoration: none;
	}

	header {
		background-color: #FFA500;
		color: #FFF;
		display: flex;
		height: 100px;
		justify-content: center;
		align-content: center;
	}

	h1 {
		padding: 10px;
	}

	h3 {
		font-weight: 600;
	}

	h4 {
		font-weight: 200;
	}

	.orange {
		color: orange;
	}

	.container {
		margin: auto;
		width: 80%;
	}

</style>

<body>

	<header class="header">

		<h1>TutorApp</h1>

	</header>

	<div class="container">
		
		<h3>{{$user['name']}},</h3>

		<h4>Welcome to TutorApp.</h4>

		<h4>Your registered email is <span class="orange">{{$user['email']}}.<span></h4>

		<h4>If you have any questions you can contact us at <a href="mailto:support@tutorapp.app"><span class="orange">support@tutorapp.app</span></a></h4>

	</div>

</body>

</html>
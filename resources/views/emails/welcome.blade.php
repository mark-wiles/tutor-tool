<!DOCTYPE html>
<html>
<head>
    <title>Welcome Email</title>
</head>

<style>
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

	h2 {
		font-family: cursive;
		text-transform: uppercase;
	}

	h3 {
		font-family: cursive;
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
		
		<h2>{{$user['name']}},</h2>

		<h3>Welcome to TutorApp</h3>

		<h3>Your registered email is <span class="orange">{{$user['email']}}<span></h3>

		<h3>If you have any questions you can contact us at <a href="mailto:support@tutorapp.com"><span class="orange">support@tutorapp.app</span></a></h3>

	</div>

</body>

</html>
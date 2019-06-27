<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="description" content="Manage your tutoring business. Add students, schedule lessons, and track income.">
        <meta name="keywords" content="tutor, tutoring, app, student, lesson, schedule, income, business, resource">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="apple-mobile-web-app-capable" content="yes">

        <title>Tutor App</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet" type="text/css">

        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
        <link rel="manifest" href="/site.webmanifest">

        <!-- Styles -->
        <style>
            html, body {
                background: darkorange;
                background: linear-gradient(to right, darkorange, #FFC233);
                color: #636b6f;
                font-family: 'Nunito', sans-serif;
                font-weight: 200;
                margin: 0;
                min-height: 100vh;
            }

            .content {
                text-align: center;
            }

            .flex-basis-100 {
                flex-basis: 100%;
            }

            .flex-center {
                align-items: center;
                display: flex;
                justify-content: center;
            }

            .flex-column {
                flex-direction: column;
            }

            .flex-row {
                flex-direction: row;
            }

            .flex-wrap {
                flex-wrap: wrap;
            }

            .full-height {
                height: 100vh;
            }

            .full-min-height {
                min-height: 100vh;
            }

            .links > a {
                color: #636b6f;
                padding: 0 1.5rem;
                font-size: 0.8rem;
                font-weight: 600;
                letter-spacing: 0.075rem;
                text-decoration: none;
                text-transform: uppercase;
                -webkit-transition: font-size 1s, color 1s; /* Safari */
                transition: font-size 1s, color 1s; 
            }

            .m-b-0 {
                margin-bottom: 0;
            }

            .m-b-md {
                margin-bottom: 1.8rem;
            }

            .more-btn {
                background: #636b6f;
                border: 0.44rem double silver;
                border-radius: 50%;
                color: white;
                font-size: 1rem;
                letter-spacing: 0.075rem;
                margin-top: 1.25rem;
                padding: 0.625rem;
            }

            .more-btn:hover, #to-top-btn:hover, #to-top-btn {
                cursor: pointer;
            }

            .more-btn:focus {
                outline: none;
            }

            .more-image {
                display: block;
                height: 70vh;
                margin: auto;
                position: relative;
                width: auto;
            }

            .more-image-container {
                display: inline-block;
                letter-spacing: 0.075rem;
                padding: 0 1.25rem;
                position: relative;
            }

            .more-image-text {
                font-weight: 600;
                color: #636b6f;
            }

            .position-ref {
                position: relative;
            }

            .sign-up-text a:hover {
                color: #fff;
                font-size: 1rem;
            }

            .subtitle {
                font-size: 1.5rem;
                font-style: italic;
                font-weight: 200;
                letter-spacing: 0.075rem;
                margin-top: 0;
            }

            .text-white{
                color: #fff;
            }

            .title {
                font-size: 5.25rem;
                margin: 0;
            }

            .top-right {
                position: absolute;
                right: 0.7rem;
                top: 1.2rem;
            }
            
            @media screen and (max-width: 420px) {
                .more-image {
                    height: auto;
                    width: 70vw;
                }
                
                .title {
                    font-size: 4rem;
                }
            }
        </style>
    </head>
    <body>
        <div class="flex-center position-ref full-height" id="top-container">
            @if (Route::has('login'))
                <div class="top-right links">
                    @auth
                        <a href="{{ url('/students') }}">Home</a>
                    @else
                        <a href="{{ route('login') }}">Login</a>

                        @if (Route::has('register'))
                            <a href="{{ route('register') }}">Register</a>
                        @endif
                    @endauth
                </div>
            @endif

            <div class="content">
                <div class="m-b-md">
                    <h1 class="title">Tutor App</h1>
                    <h3 class="subtitle">Add Students, Schedule Lessons, Track Earnings</h3>
                    <button class="more-btn" id="more-btn" onclick="handleMoreClick()">Learn More</button>
                </div>
            </div>
        </div>

        <div class="flex-center flex-wrap full-min-height position-ref" id="more-container">
            <div class="more-image-container">
                <h3 class="flex-center more-image-text">Add Students</h3>
                <img
                    class="more-image"
                    src="https://res.cloudinary.com/dfonttj4w/image/upload/c_scale,h_700,q_100/v1558634953/tutorApp/students.png"
                    alt="Image of an iPhone opened to the students page."
                >
            </div>

            <div class="more-image-container">
                <h3 class="flex-center more-image-text">Schedule Lessons</h3>
                <img
                    class="more-image"
                    src="https://res.cloudinary.com/dfonttj4w/image/upload/c_scale,h_700,q_100/v1558634961/tutorApp/lessons.png"
                    alt="Image of an iPhone opened to the Lessons page."
                >
            </div>

            <div class="more-image-container">
                <h3 class="flex-center more-image-text">Track Earnings</h3>
                <img
                    class="more-image"
                    src="https://res.cloudinary.com/dfonttj4w/image/upload/c_scale,h_700,q_100/v1558637082/tutorApp/earnings.png"
                    alt="Image of an iPhone opened to the students page."
                >
            </div>

            <p class="flex-basis-100 flex-center m-b-0 links sign-up-text"><a href="/register">Sign up today for a free account!</a></p>
            <p class="flex-basis-100 flex-center text-white" id="to-top-btn" onclick="handleToTop()">back to top</p>
        </div>

    <script>
        function handleMoreClick() {
            var moreContainer = document.getElementById('more-container');
            console.log(event.target);
            moreContainer.scrollIntoView({ behavior: 'smooth' });
        }

        function handleToTop() {
            var topContainer = document.getElementById('top-container');
            console.log(event.target);
            topContainer.scrollIntoView({ behavior: 'smooth' });
        }
    </script>
    </body>
</html>

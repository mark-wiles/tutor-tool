<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="description" content="Manage your tutoring business. Add students, schedule lessons, and track income.">
    <meta name="keywords" content="tutor, tutoring, app, student, lesson, schedule, income, business, resource">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="apple-mobile-web-app-capable" content="yes">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Tutor App') }}</title>

    <!-- Scripts -->
    <script src="{{ asset('js/app.js') }}" defer></script>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet" type="text/css">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossorigin="anonymous">

    <!-- Favicon -->
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
    <link rel="manifest" href="/site.webmanifest">

    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
</head>
<body>
        @guest
        <div class="container-fluid" id="container">
            <a class="top-left" href="{{ url('/') }}">
                {{ config('app.name', 'Tutor App') }}
            </a>
            
            <!-- Authentication Links -->
            @if (\Route::current()->getName() !== 'login')
            <div class="top-right links">
                <a href="{{ route('login') }}">{{ __('Login') }}</a>
            </div>
            @endif

            @if (\Route::current()->getName() !== 'register')
            <div class="top-right links">
                <a href="{{ route('register') }}">{{ __('Register') }}</a>
            </div>
            @endif

            <main class="align-items-center d-flex guest h-100 justify-content-center row">
                @yield('content')
            </main>
        </div>
        @endguest

        @auth
        <div class="container" id="container">
            <main class="container">
                @yield('react-content')
            </main>
        </div>
        @endauth

</body>
</html>

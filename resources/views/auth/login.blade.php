@extends('layouts.app')

@section('content')
        <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div class="card card-signin">
                <div class="card-body">
                    <h5 class="card-title text-center">{{ __('Login') }}</h5>
                        <form class="form-signin" method="POST" action="{{ route('login') }}">
                            @csrf
                            <div class="form-label-group">
                                <input
                                    id="inputEmail"
                                    type="email"
                                    class="form-control{{ $errors->has('email') ? ' is-invalid' : '' }}"
                                    name="email"
                                    value="{{ old('email') }}"
                                    required
                                    autofocus
                                />

                                <label for="inputEmail">{{ __('E-Mail Address') }}</label>

                                @if ($errors->has('email'))
                                    <span class="invalid-feedback pl-4" role="alert">
                                        <strong>{{ $errors->first('email') }}</strong>
                                    </span>
                                @endif
                            </div>

                            <div class="form-label-group">
                                
                                <input 
                                    id="inputPassword" 
                                    type="password" 
                                    class="form-control{{ $errors->has('password') ? ' is-invalid' : '' }}" 
                                    name="password"
                                    required
                                />

                                <label for="inputPassword">{{ __('Password') }}</label>

                                @if ($errors->has('password'))
                                    <span class="invalid-feedback pl-4" role="alert">
                                        <strong>{{ $errors->first('password') }}</strong>
                                    </span>
                                @endif
                            </div>

                            <div class="form-label-group pl-1">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" name="remember" id="remember" {{ old('remember') ? 'checked' : '' }}/>

                                    <label class="form-check-label" for="remember">
                                        {{ __('Remember Me') }}
                                    </label>
                                </div>
                            </div>

                            <button class="bg-orange btn btn-lg btn-block text-uppercase" type="submit">{{ __('Login') }}</button>

                            @if (Route::has('password.request'))
                                <a class="btn btn-link" href="{{ route('password.request') }}">
                                    {{ __('Forgot Your Password?') }}
                                </a>
                            @endif
                        </form>
                    </div>
                </div>
            </div>
        </div>
@endsection

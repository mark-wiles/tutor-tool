@extends('layouts.app')

@section('content')
<div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
    <div class="card card-signin">
        <div class="card-body">
            <h5 class="card-title text-center">{{ __('Reset Password') }}</h5>
                <form class="form-reset" method="POST" action="{{ route('password.update') }}">
                    @csrf
                    <input type="hidden" name="token" value="{{ $token }}">

                    <div class="form-label-group">
                        <input
                            id="email"
                            type="email"
                            class="form-control{{ $errors->has('email') ? ' is-invalid' : '' }}"
                            name="email"
                            value="{{ $email ?? old('email') }}"
                            required
                            autofocus
                        />
                        <label for="email">{{ __('E-Mail Address') }}</label>

                        @if ($errors->has('email'))
                            <span class="invalid-feedback pl-4" role="alert">
                                <strong>{{ $errors->first('email') }}</strong>
                            </span>
                        @endif
                    </div>

                    <div class="form-label-group">
                        <input
                            id="password"
                            type="password"
                            class="form-control{{ $errors->has('password') ? ' is-invalid' : '' }}"
                            name="password"
                            required
                        />

                        <label for="password">{{ __('Password') }}</label>

                        @if ($errors->has('password'))
                            <span class="invalid-feedback" role="alert">
                                <strong>{{ $errors->first('password') }}</strong>
                            </span>
                        @endif
                    </div>

                    <div class="form-label-group">
                        <input
                            id="password-confirm"
                            type="password"
                            class="form-control"
                            name="password_confirmation"
                            required
                        />

                        <label for="password-confirm">{{ __('Confirm Password') }}</label>
                    </div>

                    <button class="bg-orange btn btn-lg btn-block text-uppercase" type="submit">{{ __('Reset Password') }}</button>
                </form>
            </div>
        </div>
    </div>
</div>
@endsection

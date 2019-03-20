@extends('layouts.app')

@section('content')
<div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
    <div class="card card-register">
        <div class="card-body">
            <h5 class="card-title text-center">{{ __('Register') }}</h5>

            <form class="form-register" method="POST" action="{{ route('register') }}">
                @csrf
                <div class="form-label-group">
                    <input
                        id="name"
                        type="text"
                        class="form-control{{ $errors->has('name') ? ' is-invalid' : '' }}"
                        name="name"
                        value="{{ old('name') }}"
                        required
                        autofocus
                    />

                    <label for="name">{{ __('Name') }}</label>

                    @if ($errors->has('name'))
                        <span class="invalid-feedback pl-4" role="alert">
                            <strong>{{ $errors->first('name') }}</strong>
                        </span>
                    @endif
                </div>

                <div class="form-label-group">
                    <input
                        id="email"
                        type="email"
                        class="form-control{{ $errors->has('email') ? ' is-invalid' : '' }}"
                        name="email" value="{{ old('email') }}"
                        required
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
                        <span class="invalid-feedback pl-4" role="alert">
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

                <button type="submit" class="bg-orange btn btn-lg btn-block text-uppercase">{{ __('Register') }}</button>
            </form>
        </div>
    </div>
</div>
@endsection

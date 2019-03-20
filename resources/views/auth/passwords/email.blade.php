@extends('layouts.app')

@section('content')
<div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
    <div class="card card-signin">
        <div class="card-body">
            <h5 class="card-title text-center">{{ __('Reset Password') }}</h5>
                @if (session('status'))
                    <div class="alert alert-success" role="alert">
                        {{ session('status') }}
                    </div>
                @endif

                <form class="form-email" method="POST" action="{{ route('password.email') }}">
                    @csrf

                    <div class="form-label-group">
                        <input
                            id="email"
                            type="email"
                            class="form-control{{ $errors->has('email') ? ' is-invalid' : '' }}"
                            name="email"
                            value="{{ old('email') }}"
                            required
                        />

                        <label for="email">{{ __('E-Mail Address') }}</label>   

                        @if ($errors->has('email'))
                            <span class="invalid-feedback pl-4" role="alert">
                                <strong>{{ $errors->first('email') }}</strong>
                            </span>
                        @endif
                    </div>

                    <button class="bg-orange btn btn-lg btn-block text-uppercase" type="submit">{{ __('Send Link') }}</button>
                </form>
            </div>
        </div>
    </div>
</div>
@endsection

<?php

namespace App\Http\Controllers;

use App\Address;
use Illuminate\Http\Request;

class AddressController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($id)
    {
        $addresses = Address::where(['student_id' => $id, 'user_id' => auth()->id()])->get();

        return ($addresses);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $attributes = $this->validateAddress();

		$attributes['user_id'] = auth()->id();

        $address = Address::create($attributes);
        
        return ($address);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Address  $address
     * @return \Illuminate\Http\Response
     */
    public function show($address)
    {
        $id = $address;
        
        $user = auth()->id();

        $address = Address::where(['id' => $id, 'user_id' => $user])->first();

        return($address);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Address  $address
     * @return \Illuminate\Http\Response
     */
    public function update($address)
    {
        $attributes = $this->validateAddress();

        $updatedAddress = Address::where(['id' => $address, 'user_id' => auth()->id()])->update($attributes);
        
        return ($updatedAddress);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Address  $address
     * @return \Illuminate\Http\Response
     */
    public function destroy($address)
    {
        $id = $address;
        
        $user = auth()->id();

        $result = Address::where(['id' => $id, 'user_id' => $user])->delete();

        return($result);
    }

    public function validateAddress() {

		return request()->validate([
            
            'venue' => ['required', 'min:2', 'max:255'],

            'street' => ['nullable', 'min:3', 'max:255'],

            'city' => ['min:2', 'max:255'],

            'state' => ['min:2', 'max:2'],

            'zip' => ['nullable', 'min:5', 'max:25'],

            'student_id' => ['min:1', 'integer'],

        ]);
			
	}
}

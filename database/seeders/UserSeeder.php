<?php

namespace Database\Seeders;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'firstname' => 'Victorien',
            'lastname'  => 'Rodrigues',
            'birthday'  => Carbon::parse('2001-08-15'),
            'tel'       => '0695350994',
            'email'     => 'rodriguesvictorien37@gmail.com',
            'password'  => Hash::make('DQt1u$EtI@YTi0D5xHAs')
        ]);
    }
}

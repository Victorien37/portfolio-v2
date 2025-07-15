<?php

namespace Database\Seeders;

use App\Models\Config;
use App\Services\TranslationService;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ConfigSeeder extends Seeder
{

    protected TranslationService $translator;

    public function __construct(TranslationService $translator)
    {
        $this->translator = $translator;
    }

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Config::create([
            'job'               => $this->translator->translate("Développeur web et mobile"),
            'description'       => $this->translator->translate("Passionné par le développement d'applications modernes et performantes, je crée des expériences digitales innovantes qui allient design et fonctionnalité."),
            'dark_background'   => "#343A40", // dark
            'dark_primary'      => "#FFC107", // yellow
            'dark_secondary'    => "#E3E3E3", // grey
            'light_background'  => "#FFFFFF", // white
            'light_primary'     => "#884DA7", // purple
            'light_secondary'   => "#212529", // black
        ]);
    }
}

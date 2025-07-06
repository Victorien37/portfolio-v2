<?php

namespace App\Services;

use Stichoza\GoogleTranslate\GoogleTranslate;

class TranslationService
{
    protected GoogleTranslate $translator;

    public function __contruct()
    {
        $this->translator = new GoogleTranslate();
        $this->translator->setSource('fr');
    }

    public function translate(string $text) : array
    {
        return [
            'fr' => $text,
            'en' => $this->translator->setTarget('en')->translate($text),
            'pt' => $this->translator->setTarget('pt')->translate($text),
        ];
    }

    public function translateArray(array $fields) : array
    {
        $translated = [];

        foreach ($fields as $key => $value) {
            $translated[$key] = $this->translate($value);
        }

        return $translated;
    }
}

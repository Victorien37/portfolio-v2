<?php

namespace App\Services;

use Stichoza\GoogleTranslate\GoogleTranslate;

class TranslationService
{
    protected function getTranslator(): GoogleTranslate
    {
        return new GoogleTranslate('en', 'fr'); // target, source
    }

    public function translate(string $text) : array
    {
        return [
            'fr' => $text,
            'en' => $this->getTranslator()->setTarget('en')->translate($text),
            'pt' => $this->getTranslator()->setTarget('pt')->translate($text),
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

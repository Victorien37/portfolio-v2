<?php

namespace App\Services;

use Stichoza\GoogleTranslate\GoogleTranslate;

class TranslationService
{
    protected function getTranslator(): GoogleTranslate
    {
        return new GoogleTranslate('en', 'fr'); // target, source
    }

    /**
     * Translate text immediately (blocking - slow)
     */
    public function translate(string $text) : array
    {
        return [
            'fr' => $text,
            'en' => $this->getTranslator()->setTarget('en')->translate($text),
            'pt' => $this->getTranslator()->setTarget('pt')->translate($text),
        ];
    }

    /**
     * Return only French text for immediate storage
     * Translations will be done asynchronously via job
     */
    public function translateDeferred(string $text): array
    {
        return [
            'fr' => $text,
            'en' => $text, // Will be translated by job
            'pt' => $text, // Will be translated by job
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

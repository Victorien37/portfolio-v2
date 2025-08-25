<?php

namespace App\Services;

use Error;
use Exception;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Exceptions\DecoderException;
use Intervention\Image\Laravel\Facades\Image;
use Illuminate\Support\Str;

class ImageService
{
    public function __construct()
    {

    }

    /**
    * Upload and resize an image
    * @return string relative path of image
    */
    public function upload(UploadedFile $file, string $directory = 'images', ?int $maxWidth = null, ?int $maxHeight = null): string | Error
    {
        try {
            $image = Image::read($file);
        } catch (DecoderException $de) {
            throw new Error("Le fichier est illisible ou corrompu : " . $de->getMessage());
        } catch (Exception $e) {
            throw new Error("Une erreur s'est produite lors de l'ajout de l'image : " . $e->getMessage());
        }

        // Resize with aspect ration
        if ($maxWidth || $maxHeight) {
            $image->resize($maxWidth, $maxHeight);
        }

        // Convert to PNG
        $encoded = $image->toPng(true, true);

        $filename = Str::uuid() . '.png';
        $path = "$directory/$filename";

        Storage::disk('public')->put($path, $encoded);

        return "/storage/{$path}";
    }

    public function delete(string $path) : bool
    {
        $path = Str::replace('/storage/', '', $path);
        return Storage::disk('public')->delete($path);
    }
}
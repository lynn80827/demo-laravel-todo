<?php

namespace App\Models;

class Image extends Model
{
    protected $primaryKey = 'imageId';

    public function getUrlAttribute(string $value)
    {
        return sprintf('https://%s/%s', config('image.host'), $value);
    }
}

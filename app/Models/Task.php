<?php

namespace App\Models;

class Task extends Model
{
    protected $primaryKey = 'taskId';

    public function images()
    {
        return $this->hasMany(Image::class, 'taskId', 'taskId');
    }
}

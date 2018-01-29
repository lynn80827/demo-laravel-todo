<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    const CREATED_AT = 'createdAt';
    const UPDATED_AT = 'updatedAt';

    protected $primaryKey = 'taskId';

    public function images()
    {
        return $this->hasMany(Image::class, 'taskId', 'taskId');
    }
}

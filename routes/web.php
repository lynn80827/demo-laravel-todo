<?php

use App\Models\Task;
use App\Models\Image;
use Aws\S3\S3Client;
use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    $tasks = Task::with('images')->orderBy('createdAt', 'asc')->get()->map(function ($task) {
        foreach ($task->images as $image) {
            $image->url = sprintf('https://%s/%s', env('IMAGE_DOMAIN'), $image->url);
        }
        return $task;
    });

    return view('tasks', [
        'tasks' => $tasks
    ]);
});

/**
 * Add A New Task
 */
Route::post('/task', function (Request $request) {
    $validator = Validator::make($request->all(), [
        'content' => 'required|max:255',
    ]);

    if ($validator->fails()) {
        return redirect('/')
            ->withInput()
            ->withErrors($validator);
    }

    $task = new Task;
    $task->content = $request->content;
    $task->save();

    return redirect('/');
});

/**
 * Delete An Existing Task
 */
Route::delete('/task/{taskId}', function ($taskId) {
    $task = Task::findOrFail($taskId);
    $images = $task->images;
    $files = [];
    foreach ($images as $image) {
        $files[] = ['Key' => pathinfo($image->url)['basename']];
    }
    if (!empty($files)) {
        $s3 = S3Client::factory([
            'region' => 'us-west-2',
            'version' => '2006-03-01',
        ]);
        $s3->deleteObjects([
            'Bucket' => env('IMAGE_S3_BUCKET'),
            'Delete' => [
                'Objects' => $files,
            ],
        ]);
        $task->images()->delete();
    }
    $task->delete();

    return redirect('/');
});


Route::post('/image', function (Request $request) {
    $validator = Validator::make($request->all(), [
        'image' => 'required',
        'taskId' => 'required|integer|min:1'
    ]);

    if ($validator->fails()) {
        return redirect('/')
            ->withInput()
            ->withErrors($validator);
    }
    $file = $request->file('image');
    $s3 = S3Client::factory([
        'region' => 'us-west-2',
        'version' => '2006-03-01',
    ]);
    $fileName = sprintf('%s.%s', time(), $file->extension());
    $result = $s3->putObject([
        'Bucket' => env('IMAGE_S3_BUCKET'),
        'Key' => $fileName,
        'SourceFile' => $file,
        'ACL' => 'public-read',
    ]);

    $image = new Image;
    $image->taskId = $request->get('taskId');
    $image->url = $fileName;
    $image->save();

    return redirect('/');
});

Route::delete('/image/{imageId}', function ($imageId, Request $request) {
    $image = Image::findOrFail($imageId);
    $s3 = S3Client::factory([
        'region' => 'us-west-2',
        'version' => '2006-03-01',
    ]);
    $s3->deleteObject([
        'Bucket' => env('IMAGE_S3_BUCKET'),
        'Key' => pathinfo($image->url)['basename'],
    ]);
    $image->delete();
    return redirect('/');
});

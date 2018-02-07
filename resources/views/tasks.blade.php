@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="col-sm-offset-2 col-sm-8">
            <div class="panel panel-default">
                <div class="panel-heading">
                    New Task
                </div>

                <div class="panel-body">
                    <!-- Display Validation Errors -->
                    @include('common.errors')

                    <!-- New Task Form -->
                    <form action="task" method="POST" class="form-horizontal">

                        <!-- Task Name -->
                        <div class="form-group">
                            <label for="task-name" class="col-sm-3 control-label">Task</label>

                            <div class="col-sm-6">
                                <input type="text" name="content" id="task-name" class="form-control" value="{{ old('task') }}">
                            </div>
                        </div>

                        <!-- Add Task Button -->
                        <div class="form-group">
                            <div class="col-sm-offset-3 col-sm-6">
                                <button type="submit" class="btn btn-default">
                                    <i class="fa fa-btn fa-plus"></i>Add Task
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <!-- Current Tasks -->
            @if (count($tasks) > 0)
                <div class="panel panel-default">
                    <div class="panel-heading">
                        Current Tasks
                    </div>

                    <div class="panel-body table-responsive">
                        <table class="table table-striped task-table">
                            <thead>
                                <th>Task</th>
                                <th>&nbsp;</th>
                            </thead>
                            <tbody>
                                @foreach ($tasks as $task)
                                    <tr>
                                        <td class="table-text"><div>{{ $task->content }}</div></td>
                                        <!-- Upload File Button -->
                                        <form action="image" method="POST" enctype="multipart/form-data">
                                            <td>
                                                <input name="image" type="file">
                                                <input name="taskId" type="text" class="hidden" value="{{$task->taskId}}">
                                            </td>
                                            <td>
                                                <button type="submit" class="btn btn-danger">
                                                    <i class="fa fa-btn fa-upload"></i>Upload
                                                </button>
                                            </td>
                                        <!-- Task Delete Button -->
                                        <td>
                                            <form action="{{ 'task/'.$task->taskId }}" method="POST">
                                                {{ method_field('DELETE') }}

                                                <button type="submit" class="btn btn-danger">
                                                    <i class="fa fa-btn fa-trash"></i>Delete
                                                </button>
                                            </form>
                                        </td>
                                        </form>
                                    </tr>
                                    <tr>
                                     @foreach ($task->images as $image)
                                         <td>
                                            <form action="{{ 'image/'.$image->imageId }}" method="POST">
                                                {{ method_field('DELETE') }}
                                                <img src="{{ $image->url }}" alt="" width="100">
                                                <button type="submit" class="btn btn-danger">X</button>
                                            </form>
                                         </td>
                                     @endforeach
                                    </tr>
                                @endforeach
                            </tbody>
                        </table>
                    </div>
                </div>
            @endif
        </div>
    </div>
@endsection

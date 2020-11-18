<?php

namespace App\Tests;


class TodoControllerTest extends BaseTest
{
    public function test_private_todo_create_success()
    {
        $data = [
            'title' => 'test'
        ];

        $response = $this->json('/api/todo/', 'POST', $data);

        $this->assertEquals(201, $response->statusCode);

    }

    public function test_private_todo_create_no_title_fail()
    {
        $data = [
        ];

        $response = $this->json('/api/todo/', 'POST', $data);

        $this->assertEquals(422, $response->statusCode);

    }
}

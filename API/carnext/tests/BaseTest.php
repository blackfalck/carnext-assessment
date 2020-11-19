<?php

namespace App\Tests;

use GuzzleHttp\Exception\GuzzleException;
use PHPUnit\Framework\TestCase;
use Psr\Http\Message\ResponseInterface;
use GuzzleHttp\Client;

class BaseTest extends TestCase
{
    protected $client;
    protected $authToken;

    public function setUp(): void
    {
        parent::setUp();

        $this->client = new Client([
            'base_uri' => 'docker.for.mac.localhost:8000',
        ]);

        $userResponseData = $this->login();

        if ($userResponseData) {
            $this->authToken = $userResponseData->data->token;
        }
    }

    private function login()
    {
        $data = [
            'username' => 'username',
            'password' => 'password',
        ];

        $options = [
            'json' => $data,
            'headers' => [
                'Accept' => 'application/json',
                'Authorization' => 'Bearer ' . $this->authToken
            ]
        ];

        try {
            $response = $this->client->request('POST', '/api/login_check', $options);
            return $this->processResponse($response);
        } catch (GuzzleException $e) {
            return $this->processErrorResponse($e);
        }
    }

    public function json(string $path, string $method, array $data = [], bool $authenticate = true): object
    {
        $options = [
            'form_params' => $data,
            'headers' => [
                'Accept' => 'application/json',
            ]
        ];

        if ($authenticate) {
            $options['headers']['Authorization'] = 'Bearer ' . $this->authToken;
        }

        try {
            $response = $this->client->request($method, $path, $options);
            return $this->processResponse($response);
        } catch (GuzzleException $e) {
            return $this->processErrorResponse($e);
        }
    }

    private function processErrorResponse(GuzzleException $error): object
    {
        $responseProcess = new \stdClass;
        $responseProcess->statusCode = $error->getCode();
        $responseProcess->message = $error->getMessage();

        return $responseProcess;
    }

    private function processResponse(ResponseInterface $response): object
    {
        $responseProcess = new \stdClass;
        $responseProcess->data = json_decode($response->getBody());
        $responseProcess->statusCode = $response->getStatusCode();

        return $responseProcess;
    }
}

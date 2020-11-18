<?php

namespace App\Controller;

use App\Repository\TodoRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class TodoController extends AbstractController
{
    private $todoRepository;

    public function __construct(TodoRepository $todoRepository)
    {
        $this->todoRepository = $todoRepository;
    }

    /**
     * @Route("/todo", name="todo", stateless=true)
     */
    public function index(SerializerInterface $serializer): Response
    {
        $todos = $this->todoRepository->findAllArray();
        return new Response($serializer->serialize($todos, 'json'));
    }

    /**
     * @Route("/todo/", name="add_todo", methods={"POST"}, stateless=true)
     */
    public function create(Request $request, ValidatorInterface $validator): JsonResponse
    {
        $todo = $this->todoRepository->create($request->get('title'));
        $errors = $validator->validate($todo);

        if ($errors->count() > 0) {

            return new JsonResponse($errors, Response::HTTP_UNPROCESSABLE_ENTITY);
        }
        $this->todoRepository->save($todo);

        return $this->json($todo->toArray(), Response::HTTP_CREATED);
    }

    /**
     * @Route("/todo/{id}", name="update_todo", methods={"PUT"}, stateless=true)
     */
    public function update($id, Request $request): JsonResponse
    {
        $todo = $this->todoRepository->findOneBy(['id' => $id]);
        $todo->setTitle($request->get('title'));
        $todo->setIsCompleted($request->get('is_completed'));

        $this->todoRepository->save($todo);

        return $this->json($todo->toArray(), Response::HTTP_OK);
    }
}

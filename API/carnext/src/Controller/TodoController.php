<?php

namespace App\Controller;

use App\Repository\TodoRepository;
use App\Services\UserService;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class TodoController extends AbstractController
{
    private $todoRepository;
    private $jwtManager;
    private $tokenStorageInterface;
    private $userService;

    public function __construct(
        TodoRepository $todoRepository,
        TokenStorageInterface $tokenStorageInterface,
        JWTTokenManagerInterface $jwtManager,
        UserService $userService
    )
    {
        $this->todoRepository = $todoRepository;
        $this->jwtManager = $jwtManager;
        $this->tokenStorageInterface = $tokenStorageInterface;
        $this->userService = $userService;
    }

    /**
     * @Route("/api/todo", methods={"GET"}, name="todo", stateless=true)
     */
    public function index(SerializerInterface $serializer): Response
    {
        $currentUser = $this->userService->getCurrentUser();

        $todos = $this->todoRepository->findAllFromUser($currentUser->getId());
        return new Response($serializer->serialize($todos, 'json'));
    }

    /**
     * @Route("/api/todo/", name="add_todo", methods={"POST"}, stateless=true)
     */
    public function create(Request $request, ValidatorInterface $validator): JsonResponse
    {
        $currentUser = $this->userService->getCurrentUser();
        $requestdata = json_decode($request->getContent(), true);
        $todo = $this->todoRepository->create(($requestdata['title']), $currentUser->getId());
        $errors = $validator->validate($todo);

        if ($errors->count() > 0) {
            return new JsonResponse($errors, Response::HTTP_UNPROCESSABLE_ENTITY);
        }
        $this->todoRepository->save($todo);

        return $this->json($todo->toArray(), Response::HTTP_CREATED);
    }

    /**
     * @Route("/api/todo/{id}", name="update_todo", methods={"PUT"}, stateless=true)
     */
    public function update($id, Request $request): JsonResponse
    {
        $todo = $this->todoRepository->findOneBy(['id' => $id]);
        if (!$todo) {
            throw new NotFoundHttpException('Todo not found');
        }
        $requestdata = json_decode($request->getContent(), true);

        $todo->setTitle($requestdata['title']);
        $todo->setIsCompleted($requestdata['is_completed']);
        $this->todoRepository->save($todo);

        return $this->json($todo->toArray(), Response::HTTP_OK);
    }

    /**
     * @Route("/api/todo/{id}", name="delete_todo", methods={"DELETE"}, stateless=true)
     */
    public function delete($id, Request $request): JsonResponse
    {
        $todo = $this->todoRepository->findOneBy(['id' => $id]);

        if (!$todo) {
            throw new NotFoundHttpException('Todo not found');
        }
        $this->todoRepository->remove($todo);

        return $this->json(['status' => 'todo deleted'], Response::HTTP_OK);
    }
}

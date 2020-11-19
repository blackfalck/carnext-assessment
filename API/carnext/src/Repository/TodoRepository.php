<?php

namespace App\Repository;

use App\Entity\Todo;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Todo|null find($id, $lockMode = null, $lockVersion = null)
 * @method Todo|null findOneBy(array $criteria, array $orderBy = null)
 * @method Todo[]    findAll()
 * @method Todo[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class TodoRepository extends ServiceEntityRepository
{
    private $manager;

    public function __construct(ManagerRegistry $registry, EntityManagerInterface $manager)
    {
        parent::__construct($registry, Todo::class);
        $this->manager = $manager;
    }

    public function create($title, $userId, $isCompleted = false): Todo
    {
        $todo = new Todo();

        if ($title) {
            $todo->setTitle($title);
        }

        $todo->setUserId($userId);
        $todo->setIsCompleted($isCompleted);

        return $todo;
    }

    public function save(Todo $todo)
    {
        $this->manager->persist($todo);
        $this->manager->flush();
    }

    public function remove(Todo $todo)
    {
        $this->manager->remove($todo);
        $this->manager->flush();
    }

    public function findAllFromUser($userId): array
    {
        $qb = $this->createQueryBuilder('u')
            ->where('u.user_id = :userId')
            ->setParameter('userId', $userId);

        $query = $qb->getQuery();

        return $query->execute();

    }
}

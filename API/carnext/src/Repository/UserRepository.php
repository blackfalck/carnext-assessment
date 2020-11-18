<?php

namespace App\Repository;

use App\Entity\Todo;
use App\Entity\User;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method User|null find($id, $lockMode = null, $lockVersion = null)
 * @method User|null findOneBy(array $criteria, array $orderBy = null)
 * @method User[]    findAll()
 * @method User[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class UserRepository extends ServiceEntityRepository
{
    private $manager;

    public function __construct(ManagerRegistry $registry, EntityManagerInterface $manager)
    {
        parent::__construct($registry, User::class);
        $this->manager = $manager;

    }

    /**
     * @param $username
     * @param $password
     * @param $email
     * @return User
     */
    public function create($username, $email): User
    {
        $user = new User();
        $user->setUsername($username);
        $user->setEmail($email);

        return $user;
    }

    /**
     * @param User $user
     * @param $password
     * @return User
     */
    public function setPassword(User $user, $password): User
    {
        $user->setPassword($password);

        return $user;
    }


    public function save(User $user)
    {
        $this->manager->persist($user);
        $this->manager->flush();
    }
}

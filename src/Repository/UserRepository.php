<?php

declare(strict_types=1);

namespace App\Repository;

use App\Entity\User;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<User>
 */
class UserRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, User::class);
    }

    public function findOneByProvider(string $provider, string $providerId): ?User
    {
        return $this->findOneBy([
            'provider' => $provider,
            'providerId' => $providerId,
        ]);
    }

    public function findOrCreateFromOAuth(
        string $provider,
        string $providerId,
        string $email,
        string $name,
        ?string $avatar = null,
    ): User {
        $user = $this->findOneByProvider($provider, $providerId);

        if (!$user) {
            $user = new User();
            $user
                ->setProvider($provider)
                ->setProviderId($providerId)
                ->setRoles(['ROLE_ADMIN']);
        }

        $user
            ->setEmail($email)
            ->setName($name);

        if ($avatar !== null && $avatar !== '') {
            $user->setAvatar($avatar);
        }

        $this->getEntityManager()->persist($user);
        $this->getEntityManager()->flush();

        return $user;
    }
}

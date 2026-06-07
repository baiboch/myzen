<?php

declare(strict_types=1);

namespace App\Security;

use App\Entity\User;
use App\Service\OAuthProfileExtractor;
use League\OAuth2\Client\Provider\AppleResourceOwner;
use League\OAuth2\Client\Provider\ResourceOwnerInterface;

final class AppleAuthenticator extends AbstractOAuthAuthenticator
{
    public function __construct(
        \KnpU\OAuth2ClientBundle\Client\ClientRegistry $clientRegistry,
        \App\Repository\UserRepository $userRepository,
        \Symfony\Component\Routing\RouterInterface $router,
        private readonly OAuthProfileExtractor $profileExtractor,
    ) {
        parent::__construct($clientRegistry, $userRepository, $router);
    }

    protected function getClientName(): string
    {
        return 'apple';
    }

    protected function getCheckRouteName(): string
    {
        return 'connect_apple_check';
    }

    protected function createUser(ResourceOwnerInterface $resourceOwner): User
    {
        /** @var AppleResourceOwner $resourceOwner */
        $email = (string) $resourceOwner->getEmail();

        return $this->userRepository->findOrCreateFromOAuth(
            User::PROVIDER_APPLE,
            (string) $resourceOwner->getId(),
            $email !== '' ? $email : sprintf('apple-%s@myzen.local', $resourceOwner->getId()),
            $this->profileExtractor->extractName($resourceOwner, User::PROVIDER_APPLE, 'Apple User'),
            $this->profileExtractor->extractAvatar($resourceOwner, User::PROVIDER_APPLE),
        );
    }
}

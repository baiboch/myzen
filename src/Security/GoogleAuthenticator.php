<?php

declare(strict_types=1);

namespace App\Security;

use App\Entity\User;
use App\Service\OAuthProfileExtractor;
use League\OAuth2\Client\Provider\GoogleUser;
use League\OAuth2\Client\Provider\ResourceOwnerInterface;

final class GoogleAuthenticator extends AbstractOAuthAuthenticator
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
        return 'google';
    }

    protected function getCheckRouteName(): string
    {
        return 'connect_google_check';
    }

    protected function createUser(ResourceOwnerInterface $resourceOwner): User
    {
        /** @var GoogleUser $resourceOwner */
        $email = (string) $resourceOwner->getEmail();

        return $this->userRepository->findOrCreateFromOAuth(
            User::PROVIDER_GOOGLE,
            (string) $resourceOwner->getId(),
            $email !== '' ? $email : sprintf('google-%s@myzen.local', $resourceOwner->getId()),
            $this->profileExtractor->extractName($resourceOwner, User::PROVIDER_GOOGLE, 'Google User'),
            $this->profileExtractor->extractAvatar($resourceOwner, User::PROVIDER_GOOGLE),
        );
    }
}

<?php

declare(strict_types=1);

namespace App\Security;

use App\Entity\User;
use League\OAuth2\Client\Provider\GoogleUser;
use League\OAuth2\Client\Provider\ResourceOwnerInterface;

final class GoogleAuthenticator extends AbstractOAuthAuthenticator
{
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
            (string) ($resourceOwner->getName() ?? $resourceOwner->getEmail() ?? 'Google User'),
            $resourceOwner->getAvatar(),
        );
    }
}

<?php

declare(strict_types=1);

namespace App\Security;

use App\Entity\User;
use League\OAuth2\Client\Provider\AppleResourceOwner;
use League\OAuth2\Client\Provider\ResourceOwnerInterface;

final class AppleAuthenticator extends AbstractOAuthAuthenticator
{
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
        $firstName = trim((string) $resourceOwner->getFirstName());
        $lastName = trim((string) $resourceOwner->getLastName());
        $fullName = trim($firstName.' '.$lastName);
        $email = (string) $resourceOwner->getEmail();

        return $this->userRepository->findOrCreateFromOAuth(
            User::PROVIDER_APPLE,
            (string) $resourceOwner->getId(),
            $email !== '' ? $email : sprintf('apple-%s@myzen.local', $resourceOwner->getId()),
            $fullName !== '' ? $fullName : 'Apple User',
            null,
        );
    }
}

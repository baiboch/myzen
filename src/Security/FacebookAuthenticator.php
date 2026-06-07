<?php

declare(strict_types=1);

namespace App\Security;

use App\Entity\User;
use League\OAuth2\Client\Provider\FacebookUser;
use League\OAuth2\Client\Provider\ResourceOwnerInterface;

final class FacebookAuthenticator extends AbstractOAuthAuthenticator
{
    protected function getClientName(): string
    {
        return 'facebook';
    }

    protected function getCheckRouteName(): string
    {
        return 'connect_facebook_check';
    }

    protected function createUser(ResourceOwnerInterface $resourceOwner): User
    {
        /** @var FacebookUser $resourceOwner */
        $email = (string) $resourceOwner->getEmail();

        return $this->userRepository->findOrCreateFromOAuth(
            User::PROVIDER_FACEBOOK,
            (string) $resourceOwner->getId(),
            $email !== '' ? $email : sprintf('facebook-%s@myzen.local', $resourceOwner->getId()),
            (string) ($resourceOwner->getName() ?? 'Facebook User'),
            $resourceOwner->getPictureUrl(),
        );
    }
}

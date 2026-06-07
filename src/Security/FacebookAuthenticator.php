<?php

declare(strict_types=1);

namespace App\Security;

use App\Entity\User;
use App\Service\OAuthProfileExtractor;
use League\OAuth2\Client\Provider\FacebookUser;
use League\OAuth2\Client\Provider\ResourceOwnerInterface;

final class FacebookAuthenticator extends AbstractOAuthAuthenticator
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
            $this->profileExtractor->extractName($resourceOwner, User::PROVIDER_FACEBOOK, 'Facebook User'),
            $this->profileExtractor->extractAvatar($resourceOwner, User::PROVIDER_FACEBOOK),
        );
    }
}

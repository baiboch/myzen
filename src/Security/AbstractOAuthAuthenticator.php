<?php

declare(strict_types=1);

namespace App\Security;

use App\Entity\User;
use App\Repository\UserRepository;
use KnpU\OAuth2ClientBundle\Client\ClientRegistry;
use KnpU\OAuth2ClientBundle\Security\Authenticator\OAuth2Authenticator;
use League\OAuth2\Client\Provider\ResourceOwnerInterface;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\RouterInterface;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Security\Http\Authenticator\Passport\Badge\UserBadge;
use Symfony\Component\Security\Http\Authenticator\Passport\SelfValidatingPassport;

abstract class AbstractOAuthAuthenticator extends OAuth2Authenticator
{
    public function __construct(
        protected readonly ClientRegistry $clientRegistry,
        protected readonly UserRepository $userRepository,
        protected readonly RouterInterface $router,
    ) {
    }

    abstract protected function getClientName(): string;

    abstract protected function getCheckRouteName(): string;

    abstract protected function createUser(ResourceOwnerInterface $resourceOwner): User;

    public function supports(Request $request): ?bool
    {
        return $request->attributes->get('_route') === $this->getCheckRouteName();
    }

    public function authenticate(Request $request): SelfValidatingPassport
    {
        $client = $this->clientRegistry->getClient($this->getClientName());
        $accessToken = $this->fetchAccessToken($client);

        return new SelfValidatingPassport(
            new UserBadge($accessToken->getToken(), fn (): User => $this->createUser(
                $client->fetchUserFromToken($accessToken),
            )),
        );
    }

    public function onAuthenticationSuccess(Request $request, TokenInterface $token, string $firewallName): RedirectResponse
    {
        return new RedirectResponse($this->router->generate('app_admin'));
    }

    public function onAuthenticationFailure(Request $request, AuthenticationException $exception): RedirectResponse
    {
        return new RedirectResponse($this->router->generate('app_login'));
    }
}

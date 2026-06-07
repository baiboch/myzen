<?php

declare(strict_types=1);

namespace App\Controller;

use KnpU\OAuth2ClientBundle\Client\ClientRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class SecurityController extends AbstractController
{
    #[Route('/connect/google', name: 'connect_google')]
    public function connectGoogle(ClientRegistry $clientRegistry): Response
    {
        return $clientRegistry
            ->getClient('google')
            ->redirect(['email', 'profile'], []);
    }

    #[Route('/connect/google/check', name: 'connect_google_check')]
    public function connectGoogleCheck(): never
    {
        throw new \LogicException('Google authenticator handles this route.');
    }

    #[Route('/connect/facebook', name: 'connect_facebook')]
    public function connectFacebook(ClientRegistry $clientRegistry): Response
    {
        return $clientRegistry
            ->getClient('facebook')
            ->redirect(['email', 'public_profile'], []);
    }

    #[Route('/connect/facebook/check', name: 'connect_facebook_check')]
    public function connectFacebookCheck(): never
    {
        throw new \LogicException('Facebook authenticator handles this route.');
    }

    #[Route('/connect/apple', name: 'connect_apple')]
    public function connectApple(ClientRegistry $clientRegistry): Response
    {
        return $clientRegistry
            ->getClient('apple')
            ->redirect(['name', 'email'], []);
    }

    #[Route('/connect/apple/check', name: 'connect_apple_check')]
    public function connectAppleCheck(): never
    {
        throw new \LogicException('Apple authenticator handles this route.');
    }

    #[Route('/logout', name: 'app_logout')]
    public function logout(): never
    {
        throw new \LogicException('Logout is handled by Symfony security.');
    }
}

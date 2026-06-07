<?php

declare(strict_types=1);

namespace App\Service;

use App\Entity\User;
use League\OAuth2\Client\Provider\AppleResourceOwner;
use League\OAuth2\Client\Provider\FacebookUser;
use League\OAuth2\Client\Provider\GoogleUser;
use League\OAuth2\Client\Provider\ResourceOwnerInterface;

final class OAuthProfileExtractor
{
    public function extractAvatar(ResourceOwnerInterface $resourceOwner, string $provider): ?string
    {
        $avatar = match ($provider) {
            User::PROVIDER_GOOGLE => $this->extractGoogleAvatar($resourceOwner),
            User::PROVIDER_FACEBOOK => $this->extractFacebookAvatar($resourceOwner),
            User::PROVIDER_APPLE => null,
            default => null,
        };

        if ($avatar === null || $avatar === '') {
            return null;
        }

        return $this->normalizeAvatarUrl($avatar, $provider);
    }

    private function extractGoogleAvatar(ResourceOwnerInterface $resourceOwner): ?string
    {
        if (!$resourceOwner instanceof GoogleUser) {
            return null;
        }

        return $resourceOwner->getAvatar();
    }

    private function extractFacebookAvatar(ResourceOwnerInterface $resourceOwner): ?string
    {
        if (!$resourceOwner instanceof FacebookUser) {
            return null;
        }

        return $resourceOwner->getPictureUrl();
    }

    private function normalizeAvatarUrl(string $url, string $provider): string
    {
        if ($provider === User::PROVIDER_GOOGLE && str_contains($url, 'googleusercontent.com')) {
            $parts = parse_url($url);

            if ($parts === false) {
                return $url;
            }

            parse_str($parts['query'] ?? '', $query);
            $query['sz'] = '128';

            $normalized = ($parts['scheme'] ?? 'https').'://'.($parts['host'] ?? '').($parts['path'] ?? '');

            return $normalized.'?'.http_build_query($query);
        }

        return $url;
    }

    public function extractName(ResourceOwnerInterface $resourceOwner, string $provider, string $fallback): string
    {
        return match ($provider) {
            User::PROVIDER_GOOGLE => (string) ($resourceOwner instanceof GoogleUser
                ? ($resourceOwner->getName() ?: $resourceOwner->getEmail() ?: $fallback)
                : $fallback),
            User::PROVIDER_FACEBOOK => (string) ($resourceOwner instanceof FacebookUser
                ? ($resourceOwner->getName() ?: $fallback)
                : $fallback),
            User::PROVIDER_APPLE => $this->extractAppleName($resourceOwner, $fallback),
            default => $fallback,
        };
    }

    private function extractAppleName(ResourceOwnerInterface $resourceOwner, string $fallback): string
    {
        if (!$resourceOwner instanceof AppleResourceOwner) {
            return $fallback;
        }

        $fullName = trim((string) $resourceOwner->getFirstName().' '.(string) $resourceOwner->getLastName());

        return $fullName !== '' ? $fullName : $fallback;
    }
}

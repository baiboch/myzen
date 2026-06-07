<?php

declare(strict_types=1);

namespace App\Controller\Api;

use App\Service\DesignGeneratorService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;

#[IsGranted('ROLE_USER')]
final class DesignController extends AbstractController
{
    public function __construct(
        private readonly DesignGeneratorService $designGenerator,
    ) {
    }

    #[Route('/api/design/generate', name: 'api_design_generate', methods: ['POST'])]
    public function generate(Request $request): JsonResponse
    {
        $payload = json_decode($request->getContent(), true);

        if (!is_array($payload)) {
            throw new BadRequestHttpException('Invalid JSON body');
        }

        $message = isset($payload['message']) ? trim((string) $payload['message']) : '';
        $history = is_array($payload['history'] ?? null) ? $payload['history'] : [];

        if ($message === '') {
            throw new BadRequestHttpException('Message is required');
        }

        try {
            $result = $this->designGenerator->generate($message, $history);
        } catch (\InvalidArgumentException $exception) {
            throw new BadRequestHttpException($exception->getMessage());
        } catch (\Throwable $exception) {
            return $this->json([
                'error' => 'Не удалось сгенерировать дизайн. Попробуйте ещё раз.',
            ], 502);
        }

        return $this->json($result);
    }
}

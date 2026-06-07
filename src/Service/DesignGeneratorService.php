<?php

declare(strict_types=1);

namespace App\Service;

use Symfony\Contracts\HttpClient\HttpClientInterface;

final class DesignGeneratorService
{
    private const SYSTEM_PROMPT = <<<'PROMPT'
You are a landing page designer for MyZEN, a no-code page builder.
The user describes the page they want. Reply ONLY with valid JSON (no markdown fences):
{
  "reply": "short friendly message in Russian",
  "html": "inner HTML for body content only, no html/head/body tags",
  "css": "standalone CSS styles for that HTML"
}
Use modern, clean design. Prefer flexbox/grid, good typography, generous spacing.
Accent color: #d9ff5f on dark #111 background when appropriate.
PROMPT;

    public function __construct(
        private readonly HttpClientInterface $httpClient,
        private readonly ?string $openAiApiKey = null,
        private readonly string $openAiModel = 'gpt-4o-mini',
    ) {
    }

    /**
     * @param list<array{role: string, content: string}> $history
     *
     * @return array{reply: string, html: string, css: string, demo: bool}
     */
    public function generate(string $userPrompt, array $history = []): array
    {
        $userPrompt = trim($userPrompt);

        if ($userPrompt === '') {
            throw new \InvalidArgumentException('Prompt cannot be empty');
        }

        if ($this->openAiApiKey === null || $this->openAiApiKey === '') {
            return $this->generateDemo($userPrompt);
        }

        $messages = [['role' => 'system', 'content' => self::SYSTEM_PROMPT]];

        foreach ($history as $item) {
            if (!isset($item['role'], $item['content'])) {
                continue;
            }

            $messages[] = [
                'role' => $item['role'],
                'content' => $item['content'],
            ];
        }

        $messages[] = ['role' => 'user', 'content' => $userPrompt];

        $response = $this->httpClient->request('POST', 'https://api.openai.com/v1/chat/completions', [
            'headers' => [
                'Authorization' => 'Bearer '.$this->openAiApiKey,
                'Content-Type' => 'application/json',
            ],
            'json' => [
                'model' => $this->openAiModel,
                'temperature' => 0.7,
                'response_format' => ['type' => 'json_object'],
                'messages' => $messages,
            ],
            'timeout' => 60,
        ]);

        $payload = $response->toArray(false);
        $content = $payload['choices'][0]['message']['content'] ?? null;

        if (!is_string($content) || $content === '') {
            throw new \RuntimeException('Empty response from AI provider');
        }

        $parsed = json_decode($content, true);

        if (!is_array($parsed)) {
            throw new \RuntimeException('Invalid JSON from AI provider');
        }

        return [
            'reply' => (string) ($parsed['reply'] ?? 'Готово! Посмотрите превью справа.'),
            'html' => (string) ($parsed['html'] ?? ''),
            'css' => (string) ($parsed['css'] ?? ''),
            'demo' => false,
        ];
    }

    /** @return array{reply: string, html: string, css: string, demo: bool} */
    private function generateDemo(string $userPrompt): array
    {
        $safePrompt = htmlspecialchars($userPrompt, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');

        return [
            'reply' => 'Демо-режим: добавьте OPENAI_API_KEY в .env для реальной генерации. Вот пример макета по вашему запросу.',
            'html' => <<<HTML
<section class="hero">
  <span class="badge">✦ MyZEN AI</span>
  <h1>{$safePrompt}</h1>
  <p>Страница собрана за минуту — без кода и дизайнера. Опишите правки в чате, и макет обновится.</p>
  <div class="actions">
    <a class="btn btn-primary" href="#">Создать бесплатно</a>
    <a class="btn btn-ghost" href="#">Смотреть примеры</a>
  </div>
</section>
<section class="features">
  <article><strong>01</strong><h3>Шаблон</h3><p>Выберите готовый блок под вашу задачу.</p></article>
  <article><strong>02</strong><h3>Контент</h3><p>Замените текст и фото на свои.</p></article>
  <article><strong>03</strong><h3>Публикация</h3><p>Поделитесь ссылкой yourname.myzen.ru</p></article>
</section>
HTML,
            'css' => <<<'CSS'
* { box-sizing: border-box; }
body {
  margin: 0;
  font-family: Manrope, system-ui, sans-serif;
  background: #000;
  color: #fff;
  padding: 2rem;
}
.hero { max-width: 640px; margin-bottom: 3rem; }
.badge {
  display: inline-block;
  padding: 0.35rem 0.85rem;
  border: 1px solid rgba(217, 255, 95, 0.35);
  border-radius: 999px;
  color: #d9ff5f;
  font-size: 0.85rem;
  margin-bottom: 1rem;
}
h1 {
  font-size: clamp(2rem, 5vw, 3rem);
  line-height: 1.05;
  margin: 0 0 1rem;
  letter-spacing: -0.02em;
}
p { color: #a0a0a0; line-height: 1.7; margin: 0 0 1.5rem; }
.actions { display: flex; gap: 1rem; flex-wrap: wrap; }
.btn {
  display: inline-flex;
  padding: 0.85rem 1.4rem;
  border-radius: 999px;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.95rem;
}
.btn-primary { background: #d9ff5f; color: #000; }
.btn-ghost { color: #d9ff5f; border: 1px solid #333; }
.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 1rem;
}
.features article {
  background: #111;
  border: 1px solid #222;
  border-radius: 1rem;
  padding: 1.25rem;
}
.features strong {
  color: #3d441e;
  font-size: 2rem;
  display: block;
  margin-bottom: 0.5rem;
}
.features h3 { margin: 0 0 0.35rem; font-size: 1rem; }
.features p { margin: 0; font-size: 0.9rem; }
CSS,
            'demo' => true,
        ];
    }
}

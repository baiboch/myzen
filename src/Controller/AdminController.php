<?php

declare(strict_types=1);

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;

#[IsGranted('ROLE_USER')]
final class AdminController extends AbstractController
{
    #[Route('/admin', name: 'app_admin')]
    public function index(): Response
    {
        return $this->render('admin/index.html.twig');
    }

    #[Route('/admin/pages', name: 'app_admin_pages')]
    public function pages(): Response
    {
        return $this->render('admin/index.html.twig');
    }

    #[Route('/admin/settings', name: 'app_admin_settings')]
    public function settings(): Response
    {
        return $this->render('admin/index.html.twig');
    }

    #[Route('/admin/designer', name: 'app_admin_designer')]
    public function designer(): Response
    {
        return $this->render('admin/designer.html.twig');
    }
}

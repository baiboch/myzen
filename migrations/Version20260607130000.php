<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20260607130000 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Replace google_id with provider and provider_id for multi OAuth login';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('ALTER TABLE "user" ADD provider VARCHAR(32) DEFAULT \'google\' NOT NULL');
        $this->addSql('ALTER TABLE "user" ADD provider_id VARCHAR(255)');
        $this->addSql('UPDATE "user" SET provider_id = google_id');
        $this->addSql('ALTER TABLE "user" ALTER provider_id SET NOT NULL');
        $this->addSql('ALTER TABLE "user" DROP google_id');
        $this->addSql('DROP INDEX IF EXISTS "UNIQ_USER_GOOGLE_ID"');
        $this->addSql('DROP INDEX IF EXISTS uniq_user_google_id');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_USER_PROVIDER ON "user" (provider, provider_id)');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('ALTER TABLE "user" ADD google_id VARCHAR(255)');
        $this->addSql('UPDATE "user" SET google_id = provider_id WHERE provider = \'google\'');
        $this->addSql('ALTER TABLE "user" ALTER google_id SET NOT NULL');
        $this->addSql('DROP INDEX uniq_user_provider');
        $this->addSql('CREATE UNIQUE INDEX uniq_user_google_id ON "user" (google_id)');
        $this->addSql('ALTER TABLE "user" DROP provider');
        $this->addSql('ALTER TABLE "user" DROP provider_id');
    }
}

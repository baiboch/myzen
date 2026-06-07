<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20260607120000 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Create user table for Google OAuth';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('CREATE TABLE "user" (id SERIAL NOT NULL, google_id VARCHAR(255) NOT NULL, email VARCHAR(180) NOT NULL, name VARCHAR(255) NOT NULL, avatar VARCHAR(500) DEFAULT NULL, roles JSON NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_USER_EMAIL ON "user" (email)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_USER_GOOGLE_ID ON "user" (google_id)');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('DROP TABLE "user"');
    }
}

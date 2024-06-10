import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUserTable1656789012345 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'User', // 'User' to avoid reserved keywords and match the entity name
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'uuid',
                        default: `uuid_generate_v4()`, // Ensure you have the 'uuid-ossp' extension enabled in PostgreSQL
                    },
                    {
                        name: 'firstName',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'lastName',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'age',
                        type: 'int',
                        isNullable: false,
                    },
                    {
                        name: 'gender',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'problem',
                        type: 'boolean',
                        isNullable: false,
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('User');
    }
}

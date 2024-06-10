import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
    const BATCH_SIZE = 1000; // Number of users per batch
    const TOTAL_USERS = 1000000; // Total users to create

    for (let i = 0; i < TOTAL_USERS; i += BATCH_SIZE) {
        const users = Array.from({ length: BATCH_SIZE }).map(() => ({
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            age: faker.number.int({ min: 18, max: 99 }),
            gender: faker.helpers.arrayElement(['male', 'female']),
            problem: faker.datatype.boolean(),
        }));

        try {
            await prisma.user.createMany({
                data: users,
                skipDuplicates: true,
            });
        } catch (error) {
            console.error(`Error inserting batch:`, error);
        }

        console.log(`Inserted ${i + BATCH_SIZE} users`);
    }

    console.log(`Successfully inserted ${TOTAL_USERS} users.`);
}

main()
    .catch((error) => {
        console.error('Error:', error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

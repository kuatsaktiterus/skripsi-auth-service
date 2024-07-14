import { PrismaClient } from "@prisma/client";
import bcryptjs from "bcryptjs";
const prisma = new PrismaClient();
async function main() {
  let password = "";
  bcryptjs.hash("12345678", 8, async (err, hash) => {
    password = hash;
  });
  const user1 = await prisma.user.upsert({
    where: { username: "ricky" },
    update: {},
    create: {
      username: "ricky",
      password: password,
      role: "USER",
    },
  });
  console.log(user1);
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

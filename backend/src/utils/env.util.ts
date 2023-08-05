import zod from "zod";

const envSchema = zod.object({
  MONGO_URI: zod.string(),
  FILE_PATH: zod.string().default(__dirname),
});

export const ENV = envSchema.parse(process.env);

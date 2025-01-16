type ExtractAsyncFnArgs<Args extends Array<any>> =
  Args extends Array<infer PotentialArgTypes> ? [PotentialArgTypes] : [];

type Result<ReturnType> = [ReturnType, null] | [null, Error];

export async function runAsyncFunction<Args extends Array<any>, ReturnType>(
  asyncFn: (...args: ExtractAsyncFnArgs<Args>) => Promise<ReturnType>,
  ...args: ExtractAsyncFnArgs<Args>
): Promise<Result<ReturnType>> {
  try {
    const result = await asyncFn(...args);
    return [result, null];
  } catch (error) {
    return [null, error instanceof Error ? error : new Error(String(error))];
  }
}

async function testFn() {
  const createPost = async () => {};

  // use case
  const [post, error] = await runAsyncFunction(createPost, {
    title: "Hello World",
    content: "This is a new post",
  });

  if (error) throw new Error("Failed to create a new post");
}

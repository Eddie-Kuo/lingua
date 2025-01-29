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

// Simpler version below
// ------------------------------------------------

type ResultType<T> = [T, null] | [null, Error];

export async function safeAsync<T>(
  asyncFn: (...args: any[]) => Promise<T>,
  ...args: any[]
): Promise<ResultType<T>> {
  try {
    // Call the async function with provided arguments
    const result = await asyncFn(...args);
    // Return successful result with null error
    return [result, null];
  } catch (error) {
    // Return null result with the error
    return [null, error instanceof Error ? error : new Error(String(error))];
  }
}

// Example usage:
async function example() {
  // Simple async function that might fail
  const fetchUserData = async (userId: number) => {
    if (userId < 0) throw new Error("Invalid user ID");
    return { id: userId, name: "John Doe" };
  };

  // Success case
  const [data, error] = await safeAsync(fetchUserData, 123);
  if (error) {
    console.error("Failed to fetch user:", error.message);
    return;
  }
  console.log("User data:", data);
}

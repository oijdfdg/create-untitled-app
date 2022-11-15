import inquirer from "inquirer";

export const promptName: () => Promise<string> = async () => {
  let prompt = await inquirer.prompt<{ name: string }>([
    {
      name: "name",
      type: "input",
      message: "What will you call your project? (default: 'my-app')",
    },
  ]);

  const { name } = prompt;

  // Return the default value (my-app) if the input contains
  // only whitespace (is empty)
  return name.trim().length != 0 ? name : "my-app";
};

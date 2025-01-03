module.exports = {
  apps: [
    {
      name: "rust-docs-bot",
      interpreter_args: "--env-file=.env",
      script: "./dist/index.js",
    },
  ],
};

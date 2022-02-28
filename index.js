const chalk = require("chalk");

const arrowLeft = "⟫ ";
const arrowRight = " ⟪";
const bracketLeft = "⟦ ";
const bracketRight = " ⟧";

/**
 *
 * @param {string} s The string to beatifully pad with dashes
 * @returns Padded string
 */
const title = (s) => {
  const dashes = "—".repeat(
    process.stdout.columns / 2 - (arrowLeft + s + arrowRight).length / 2 - 1
  );
  return `${chalk.green(dashes)} ${chalk.greenBright(
    arrowLeft
  )}${chalk.white.bold(s)}${chalk.greenBright(arrowRight)} ${chalk.green(
    dashes
  )}`;
};

/**
 *
 * @param {Object} options The options
 * @param {string} options.key The key of the field
 * @param {string} options.value The value of the field
 * @param {string} [options.category] The category of the field
 */
const field = ({ key, value, category }) => {
  if (!key || !value) {
    throw new Error("Key and value are required");
  }

  let finalString = "";

  if (category) {
    finalString += `${chalk.white(bracketLeft)}${chalk.green.bold(
      category
    )}${chalk.white(bracketRight)} `;
  }

  finalString += `${chalk.white.bold.underline(key)} ${chalk.dim(
    ":"
  )} ${chalk.white(value)}`;

  return finalString;
};

/**
 *
 * @param {Object} options
 * @param {string} options.title The title of the set
 * @param {Object[]} options.fields The fields of the set
 * @param {string} options.fields[].key The key of the field
 * @param {string} options.fields[].value The value of the field
 * @param {string} [options.fields[].category] The category of the field
 */
const fieldSet = ({ title: titleOfField, fields }) => {
  let finalString = "";
  finalString += title(titleOfField);
  finalString += "\n";

  fields.forEach((field1) => {
    finalString += `${field(field1)}\n`;
  });

  return finalString;
};

const _message = (msg, color, action) => {
  return console.log(
    `${chalk.white(bracketLeft)}${color(action)}${chalk.white(
      bracketRight
    )}${chalk.dim(":")} ${chalk.white(msg)}`
  );
};

const success = (msg) => {
  return _message(msg, chalk.greenBright.bold, "SUCCESS");
};

const error = (msg) => {
  return _message(msg, chalk.redBright.bold, "ERROR");
};

const info = (msg) => {
  return _message(msg, chalk.blueBright.bold, "INFO");
};

const warn = (msg) => {
  return _message(msg, chalk.yellowBright.bold, "WARN");
};

info("Hi");
success("Hi");
error("Hi");
warn("Hi");

console.log(
  fieldSet({
    title: "Field Set",
    fields: [
      {
        key: "key1",
        value: "value1",
        category: "category1",
      },
      {
        key: "key2",
        value: "value2",
        category: "category2",
      },
    ],
  })
);

module.exports = {
  title,
  field,
  fieldSet,
  success,
  error,
  info,
};

import * as core from '@actions/core';
import * as buildnoteCli from './libs/buildnote-cli';
import {getBooleanInput, getInput, getMultilineInput} from "actions-parsers";
import * as fs from "fs";

const main = async () => {
  runAction();
};

const runAction = async (): Promise<void> => {
  await buildnoteCli.installCli(getInput('version'))
  const verbose: boolean = getBooleanInput('verbose', {required: false}) || false
  const args = getMultilineInput('args')


  const fileName = '.buildnote-cli-args';
  try {
    const fullCommand = (verbose ? ["--verbose"] : []).concat(["report", ...args]);

    const fullCommandFileContent = fullCommand.join(" ").trim();
    core.info(`Running buildnote ${fullCommandFileContent}`);

    fs.writeFileSync(fileName, fullCommandFileContent);
    const buildnoteOutput = await buildnoteCli.run(`@${fileName}`);

    core.info(buildnoteOutput.stdout)
    core.error(buildnoteOutput.stderr)
  } catch (err) {
    core.error(err);
  } finally {
    fs.unlinkSync(fileName)
  }
};


(async () => {
  try {
    await main();
  } catch (err) {
    if (err.message.stderr) {
      core.setFailed(err.message.stderr);
    } else {
      core.setFailed(err.message);
    }
  }
})();

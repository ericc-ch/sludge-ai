import child from "node:child_process";
import util from "node:util";
import { PATH_AUDIO, PATH_SUB_VTT } from "../paths";

const exec = util.promisify(child.exec);

const VOICE = `en-US-AvaNeural`;

const sanitize = (str: string) => {
  return str.replace(/[\\"\r\n]/g, (match) => {
    switch (match) {
      case '"':
        return '\\"';
      case "\r":
      case "\n":
        return "\\n";
      default:
        return `\\${match}`;
    }
  });
};

export const textToSpeech = async (text: string) => {
  const SCRIPT = sanitize(text);

  return exec(
    `edge-tts -v ${VOICE} -t "${SCRIPT}" --write-media ${PATH_AUDIO} --write-subtitles ${PATH_SUB_VTT}`
  );
};

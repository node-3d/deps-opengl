import path from 'node:path';
import { exec as execCb } from 'node:child_process';
import fs from 'node:fs/promises';
import { promisify } from 'node:util';

const exec = promisify(execCb);

const {
	getPlatform, getBin, ensuredir, copy,
} = await import('@node-3d/addon-tools');


const bin = getBin();
const binPath = path.resolve(bin);
const platform = getPlatform();


const fail = (error) => {
	console.error(error);
	process.exit(-1);
};


const findLinuxLib = async (name) => {
	try {
		const { stdout } = await exec(`ldconfig -p | grep ${name}`);
		if (!stdout.includes(name)) {
			return;
		}
		const matched = stdout.match(/ => \/.*/u);
		if (!matched) {
			return;
		}
		const libPath = matched[0].replace(' => ', '');
		await copy(libPath, `${binPath}/${name}`);
	} catch (error) {
		fail(error);
	}
};


try {
	await ensuredir(binPath);
	
	if (['linux', 'aarch64'].includes(platform)) {
		await findLinuxLib('libGL.so');
		await findLinuxLib('libXrandr.so');
		await findLinuxLib('libXrender.so');
	}
	
	await fs.cp(path.resolve('src/build'), binPath, { recursive: true });
} catch (error) {
	fail(error);
}

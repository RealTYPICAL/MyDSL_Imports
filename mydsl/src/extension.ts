
'use strict';

import * as path from 'path';
import * as os from 'os';

import { Trace } from 'vscode-jsonrpc';
import { workspace, ExtensionContext } from 'vscode';
import { LanguageClient, LanguageClientOptions, ServerOptions } from 'vscode-languageclient';

export function activate(context: ExtensionContext) {
	const launcher = os.platform() === 'win32' ? 'MyDsl-Standalone.bat' : 'MyDsl-Standalone';
	const script = context.asAbsolutePath(path.join('server', 'mydsl', 'bin', launcher));

	let serverOptions: ServerOptions = {
		run: { command: script, args: [] },
		debug: {
			command: script, args: [], options: {
				env: {
					// 'JAVA_OPTS': `-Xdebug -Xrunjdwp:server=y,transport=dt_socket,address=8000,quiet=y,suspend=n`
				},
			}
		}
	};

	let clientOptions: LanguageClientOptions = {
		documentSelector: ['mydsl'],
		synchronize: {
			fileEvents: workspace.createFileSystemWatcher('**/*.*')
		},
	};

	const lc = new LanguageClient('mydsl', serverOptions, clientOptions, true);
	lc.trace = Trace.Messages;
	const dispoable = lc.start();
	context.subscriptions.push(dispoable);
}